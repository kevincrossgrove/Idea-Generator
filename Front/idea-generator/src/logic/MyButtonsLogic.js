import axios from 'axios';

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

export const loadButtons = async (setData) => {
    await axios.get('/button').then(response => {
        setData(response.data);
    });
}