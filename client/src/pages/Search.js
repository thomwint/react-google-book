import React, { Component } from "react";
import { ViewBtn, SaveBtn } from "../components/Buttons";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import googleAPI from "../utils/googleAPI";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";


class Books extends Component {
    state = {
        books: [],
        priorSearch: "",
        title: ""
    };

    formatGoogleSearch = data => {
        const bookStateArray = [];

        data.items.forEach(item => {
            console.log(item);
            const info = item.volumeInfo;
            let thumnailImage = "//via.placeholder.com/128x160"
            if (info.imageLinks) {
                thumnailImage = info.imageLinks.thumbnail;
            };

            const dummyBookArray = {
                googleID: item.id,
                title: info.title,
                authors: info.authors,
                synopsis: info.description,
                image: thumnailImage,
                link: info.infoLink,
                date: info.publishedDate
            };

            bookStateArray.push(dummyBookArray);
        })

        this.setState({ books: bookStateArray, title: "" })
    }


    saveBook = id => {
        API.saveBook(id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    searchBookButton = event => {
        event.preventDefault();
        this.searchBook();
    }

    searchBook = event => {
        event.preventDefault();

        googleAPI.searchBook(this.state.title)
            .then(res => this.formatGoogleSearch(res.data))
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div>
            <Jumbotron>
                <h1>(React) Google Books Search</h1>
            </Jumbotron>
                <form>
                    <Input
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Title (required)"
                    />
                    <FormBtn
                        disabled={!(this.state.title)}
                        onClick={this.searchBook}
                    >Search
                    </FormBtn>
                </form>
                <div>
                    {this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => (
                                <ListItem key={book.googleID}>
                                    <img src={book.image} alt={book.title}></img>
                                        <a href={book.link} target="_blank">
                                            {book.title}
                                        </a>
                                            <SaveBtn onClick={() => this.saveBook(book)} />
                                                <a href={book.link} target="_blank">
                                                    <ViewBtn />
                                                </a>
                                                    <p>by {book.authors}</p>
                                                    <p>{book.synopsis}</p>
                                </ListItem>
                                ))}
                        </List>
                        ) : (
                                    <h1>Search for a book</h1>
                            )
                
                }
        
            </div>
            </div>
        )
    }
}

export default Books;
