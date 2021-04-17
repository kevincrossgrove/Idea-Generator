import { useEffect } from 'react';
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

// Save content to a user's ID
export const saveContent = (setTitle, setErrorMessage, userId, contentId ) => {
    if (!userId) return console.log('No one is logged in.');

    setTitle('Saving');
    axios.patch(`/ideas/save/content`, {userId, contentId}).then((response) => {
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

// Load a user's saved content
export const LoadUserSavedContent = (setSavedContent, setCurrentContent) => {
    const url = '/ideas/saved/content';

    useEffect(() => {
        let source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const response = await axios.get(url, { cancelToken: source.token});
                setCurrentContent(response.data);
                setSavedContent(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Caught Cancel');
                } else {
                    throw err;
                }
            }
        }
        fetchData(); 

        // Clean up function which cancels the Axios request if necessary. 
        return () => source.cancel();
    }, []);
}

// Unsave a user's content
export const unsaveIdea = (id, setSavedContent, setUpdate, update) => {
    axios.delete(`/ideas/saved/content/${id}`).then(response => {
        console.log("Unsaved idea.");
        setSavedContent(response.data);
        setUpdate(!update);
    });
}

// Load all the idea categories
export const loadCategoryList = (setCategories) => {
    axios.get('/ideas/get/categories').then(response => {
        setCategories(response.data);
    });
}

