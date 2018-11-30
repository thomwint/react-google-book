import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { FormBtn } from "../components/Form"
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {},
    comment: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSavedSubmit = event => {
    event.preventDefault();
    if (this.state.comment) {
      API.bookSaved(
        this.state.book._id,
        {
          body: this.state.comment,
          book: this.state.book._id
        })
        .then(res => this.loadBookdata())
        .catch(err => console.log(err));
    }
  };

  deleteSaved = id => {
    API.deleteSaved(id)
      .then(res => this.loadBookdata())
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadBookdata()
  }

  loadBookdata() {
    this.setState({ comment: "" })
    API.getBook(this.props.match.params.id)
    .then(res => this.setState({ book: res.data }))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
            <Link to="/books">← Back to all books</Link>
            <Jumbotron>
                  <img src={this.state.book.image} alt={this.state.book.title}></img>
                  <h1>
                    {this.state.book.title}
                  </h1>
                  <h2>
                    by {this.state.book.authors}
                  </h2>
            </Jumbotron>
            <article>
              <h3>Synopsis</h3>
              <p>
                {this.state.book.synopsis}
              </p>
            </article>
          <div>
          {this.state.book.saved ? (
            <div>
              {this.state.book.saved.map(save => (
                <div className="navbar" key={save._id}>
                  <a className="navabar-brand">
                    {save.body}
                  </a>
                  <button 
                  className="form-inline btn btn-danger"
                  onClick={() => this.deleteSaved(save._id)}
                  >X</button>
                </div>
              ))}
              </div>
          ) : (
              <div>
                <h3>No comments on this book!</h3>
              </div>
            )}
            </div>
              <FormBtn
                disabled={!(this.state.comment)}
                onClick={this.handleSavedSubmit}
              >Submit Comment
            </FormBtn>
            </div>
    )
  }
}

export default Detail;
