import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NewFlashcard from "./NewFlashcard";
import EditFlashcard from "./EditFlashcard";
import addButton from "../icons/add-button-with-plus-symbol-in-a-black-circle.png"
import edit from '../icons/edit-button.png'


class AllFlashcardsByDeckId extends Component {

    state = {
        flashcards: [],
        showAnswer: false,
        showNewCardForm: false,
        editCard: false
    }

    componentDidMount() {
        this.getFlashcardsByDeckId()
    }

    getFlashcardsByDeckId = async () => {
        try {
            const deckId = this.props.deckId
            const res = await axios.get(`https://protected-temple-87139.herokuapp.com/api/v1/flashcards/deck/${deckId}`)
            const newState = { ...this.state }
            newState.flashcards = res.data
            this.setState(newState)
        } catch (e) {
            console.log("failed to get flashcards by deck id")
            console.error(e)
        }
    }

    toggleAnswer = () => {
        const showAnswer = !this.state.showAnswer
        this.setState({ showAnswer })
    }

    toggleNewCardForm = () => {
        const showNewCardForm = !this.state.showNewCardForm
        this.setState({ showNewCardForm })
    }


    toggleEditCard = () => {
        const editCard = !this.state.editCard
        this.setState({ editCard })
    }

    render() {

        return (
            <div>
                <div>
                    {this.state.flashcards.map((card, index) => {
                        return (
                            <div key={`t4j30q8on - ${index}`}>
                                {this.state.showAnswer
                                    ?
                                    <div>
                                        <Card style={{ width: '26rem' }}>
                                            <Card.Body>
                                                <Card.Text>
                                                    {card.answer}
                                                </Card.Text>
                                                <Button variant="primary" onClick={this.toggleAnswer}>Show the
                                                    Clue</Button>
                                                <Link to={`/flashcards/editFlashcard/${card.id}`}>
                                                    <Button variant="outline-dark">Edit Card</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    :
                                    <div>
                                        <Card style={{ width: '26rem' }}>
                                            <Card.Body>
                                                <Card.Text>
                                                    {card.clue}
                                                </Card.Text>
                                                <Button variant="primary" onClick={this.toggleAnswer}>Show the Answer</Button>
                                                {/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                                                <Link to={`/flashcards/editFlashcard/${card.id}`} >
                                                    <img src={edit} alt="Edit Button" className="edit-btn" />
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div>
                        {this.state.showNewCardForm
                            ?
                            <div className="new-card-form">
                                <NewFlashcard deckId={this.props.deckId} />
                                <div className="hide-form-btn">
                                    <Button variant="outline-dark" onClick={this.toggleNewCardForm}>Hide Form</Button>
                                </div>
                            </div>
                            :
                            <div className="add-btn-wrapper">
                                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                                <Link onClick={this.toggleNewCardForm}>
                                    <img src={addButton} className="add-btn" />
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AllFlashcardsByDeckId;