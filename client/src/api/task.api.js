import axios from 'axios';

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/base/api/v1/tasks/'
});

export const getAllTasks = async () => {
    try {
        return taskApi.get('/');
    } catch (error) {
        console.log(error);
    }
}

export const createTask = async (task) => {
    try {
        return taskApi.post('/', task);
    } catch (error) {
        console.log(error);
    }
}