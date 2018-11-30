import React, { Component } from "react";
import { ViewBtn, DeleteBtn } from "../components/Buttons"
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

class Books extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data, title: "", author: "", synopsis: "" })
            )
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(() => this.loadBooks())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div>
            <Jumbotron>
                <h1>Google Book Search</h1>
            </Jumbotron>
            <div>
                {this.state.books.length ? (
                    <List>
                        {this.state.books.map(book => (
                            <ListItem key={book._id}>
                                <img src={book.image} alt={book.title}></img>
                                    <a href={book.link} target="_blank">
                                        {book.title}
                                    </a>
                                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                        <Link to={"/books/" + book._id}>
                                        <ViewBtn />
                                        </Link>
                                            <p>by {book.authors}</p>
                                            <p>{book.synopsis}</p>
                            </ListItem>
                                ))}
                        </List>
                        ) : (
                                    <h1>No Saved books to Display</h1>
                            )
                
                }
            </div>
            </div>
        )
    }
}

export default Books;
