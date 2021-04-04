import axios from 'axios';
import { randomShuffle } from './DbLogic';

export const saveButton = (setButtonId, buttonName, content) => {
    axios.post('/button', {
        buttonName: buttonName,
        contentArray: content
    })
    .then(response => {
        console.log(response.data);
        setButtonId(response.data._id);
      }, (error) => {
        console.log(error);
      });
}

export const updateButton = (buttonId, buttonName, content) => {
    axios.patch(`/button/${buttonId}`, {
        buttonName: buttonName,
        contentArray: content
    }).then(response => {
        console.log(response.data);
    })
}

// Load the buttons, but also shuffle the content.
export const loadButtons = async (setData) => {
    await axios.get('/button').then(response => {
        response.data.forEach((button) => {
            randomShuffle(button.contentArray);
        })
        setData(response.data);
    });
}

// Load an individual button
export const loadSingleButton = (buttonId) => {
    return axios.get(`/button/${buttonId}`).then(response => {
        return response.data;
    }).catch(err => console.log(err.message));
}

// Delete a button
export const deleteButton = async (id, setData) => {
    await axios.delete(`/button/${id}`).then(response => 
        console.log(response)
    ).then(() => loadButtons(setData));
}