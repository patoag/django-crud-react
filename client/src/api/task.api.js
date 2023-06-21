import axios from 'axios';

export const getAllTasks = async () => {
    try {
        return axios.get('http://localhost:8000/base/api/v1/tasks/');
    } catch (error) {
        console.log(error);
    }
}