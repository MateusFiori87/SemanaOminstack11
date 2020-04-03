import axios from 'axios'

const api = axios.create({
    baseURL: 'https://bethehero-example.herokuapp.com',
})

export default api;