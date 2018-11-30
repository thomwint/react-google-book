import axios from "axios";

export default {

  getBooks: function () {
    return axios.get("/api/books");
  },

  getBook: function (id) {
    return axios.get(`/api/books/${id}`);
  },

  deleteBook: function (id) {
    return axios.delete(`/api/books/${id}`);
  },

  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },

  bookSaved: function (id, savedData) {
    return axios.put(`/api/books/${id}`, savedData);
  },

  deleteSaved: function (id) {
    return axios.delete(`/api/saved/${id}`);
  }
};
