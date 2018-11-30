import axios from "axios";

export default {
    searchBook: (id) => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${id}`);
    }

};
