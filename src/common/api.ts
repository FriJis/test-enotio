import axios from 'axios'
import { Post } from '../types/main'

export const API = {
    getPosts: () => {
        return axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    },
}
