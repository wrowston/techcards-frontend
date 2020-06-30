import React, { Component } from 'react';
import axios from "axios";
import AllFlashcardsByDeckId from "../flashcard/AllFlashcardsByDeckId";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import edit from '../icons/edit-button.png'


class SingleDeck extends Component {

    state = {
        deck: {
            name: '',
            flashcards: []
        },
        showEditForm: false,
    }

    componentDidMount() {
        this.getDeckById()
    }

    getDeckById = async () => {
        try {
            const deckId = this.props.match.params.deckId
            const res = await axios.get(`https://protected-temple-87139.herokuapp.com/api/v1/deck/${deckId}`)
            const newState = { ...this.state }
            newState.deck = res.data
            this.setState(newState)
        } catch (e) {
            console.log("failed to get single deck")
            console.error(e)
        }
    }

    toggleEditForm = () => {
        const showEditForm = !this.state.showEditForm
        this.setState({ showEditForm })
    }

    render() {
        return (
            <div>
                {this.state.showEditForm
                    ?
                    <div>
                        <form onSubmit={this.onSubmit} className="form">
                            <label className="form-label">Deck Name</label>
                            <input
                                type='text'
                                name='name'
                                className="form-input"
                                onChange={this.handleChange}
                                value={this.state.deck.name}
                                required
                            />
                            <input type="submit" value="Save" />
                        </form>
                        <Button variant="outline-dark" className="back-button" onClick={this.toggleEditForm} >
                            Back
                        </Button>
                    </div>
                    :
                    <div>
                        <div className="deck-header">
                            <div className="title">{this.state.deck.name}</div>
                            <div className="deck-edit-btn">
                                {/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                                <Link onClick={this.toggleEditForm} >
                                    <img src={edit} alt="Edit Button" className="edit-btn" />
                                </Link>
                            </div>
                        </div>
                        <AllFlashcardsByDeckId
                            deckId={this.props.match.params.deckId}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default SingleDeck;