import React, { Component } from 'react';
import axios from "axios";

class EditFlashcard extends Component {
    state = {
        flashcard: {
            id: '',
            clue: '',
            answer: '',
            deckId: ''
        }
    }

    componentDidMount() {
        this.getFlashcardById()
    }

    getFlashcardById = async () => {
        try {
            const flashcardId = this.props.match.params.flashcardId
            const res = await axios.get(`https://protected-temple-87139.herokuapp.com/api/v1/flashcards/${flashcardId}`)
            const newState = { ...this.state }
            newState.flashcard = res.data
            this.setState(newState)
        } catch (e) {
            console.log("failed to get single card")
            console.error(e)
        }
    }

    handleChange = (evt) => {
        const newState = { ...this.state }
        newState.flashcard[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const flashcardId = this.props.match.params.flashcardId
            await axios.put(`https://protected-temple-87139.herokuapp.com/api/v1/flashcards/editFlashcard/`, this.state.flashcard);
            console.log("edited flashcard")
        } catch (e) {
            console.log("failed to edit flashcard")
            console.error(e)
        }
    }


    render() {
        const { flashcardId } = this.props;
        const { flashcard } = this.state;
        const { clue, answer } = flashcard;
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit} className="form">
                        <input
                            type="hidden"
                            name="id"
                            className="form-input"
                            value={this.props.match.params.flashcardId}
                            onChange={this.handleChange}
                        />
                        <label className="form-label">Clue</label>
                        <textarea
                            type='text'
                            name='clue'
                            className="form-input"
                            onChange={this.handleChange}
                            value={this.state.flashcard.clue}
                        />
                        <label className="form-label">Answer</label>
                        <textarea
                            type='text'
                            name='answer'
                            className="form-input"
                            onChange={this.handleChange}
                            value={this.state.flashcard.answer}
                        />
                        <input
                            type="hidden"
                            name="deckId"
                            className="form-input"
                            value={this.props.deckId}
                            onChange={this.handleChange}
                        />
                        <input type="submit" value="Save" />
                    </form>
                </div>
            </div>
        );
    }
}

export default EditFlashcard;