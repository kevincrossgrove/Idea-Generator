import axios from 'axios';

export const loadCategory = (category, setIdeas, setListData, setLoading) => {
    setListData({ position: -1, length: 0});

    axios.get(`/ideas/${category}`).then(response => {
        randomShuffle(response.data);
        setIdeas(response.data);
        setListData({ position: -1, length: response.data.length});
        setLoading(false);
    });
}

export const randomShuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export const loadCategoryToManage = (category, setIdeas) => {
    axios.get(`/ideas/${category}`).then(response => {
        setIdeas(response.data);
    });
}

export const deleteIdea = (id, setIdeas, category) => {
    axios.delete(`/ideas/${id}`).then(response => {
        console.log(response);
    }).then(() => loadCategoryToManage(category, setIdeas));
}

export const saveButton = (buttonTitle, content) => {
    
}

export const saveContent = (setTitle, setErrorMessage, userId, contentId ) => {
    if (!userId) return console.log('No one is logged in.');

    setTitle('Saving');
    axios.patch(`/ideas/save/content`, {userId, contentId}).then((response) => {
        console.log(response.status, response.message);
        setTitle('');
    }).catch(err => {
        if (err.response.data.error === 'User already saved this') {
            setTitle('');
            setErrorMessage('You have already saved this.');
        }   
        else {
            console.error(err.message);
        }
    });
}