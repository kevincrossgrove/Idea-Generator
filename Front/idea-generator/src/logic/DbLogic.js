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

const randomShuffle = (arr) => {
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