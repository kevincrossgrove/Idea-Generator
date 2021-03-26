import axios from 'axios';
import { randomShuffle } from './DbLogic';

export const saveButton = async (buttonName, content, color, setButtonName, setButtonContent) => {
    await axios.post('/button', {
        buttonName: buttonName,
        contentArray: content,
        color: color
    })
    .then((response) => {
        console.log(response);
        setButtonName('New Button');
        setButtonContent([]);
      }, (error) => {
        console.log(error);
      });
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

// Delete a button
export const deleteButton = async (id, setData) => {
    await axios.delete(`/button/${id}`).then(response => 
        console.log(response)
    ).then(() => loadButtons(setData));
}