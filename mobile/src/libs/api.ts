import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.150.200:3333'
})