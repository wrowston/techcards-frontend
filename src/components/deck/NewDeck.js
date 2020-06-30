import React, { Component } from 'react';
import axios from "axios";

class NewDeck extends Component {
    state = {
        deck: {
            name: '',
            creatorId: '',
            creatorName: '',
            subjectId: ''
        }
    }

    handleChange = (evt) => {
        const newState = { ...this.state }
        newState.deck[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('https://protected-temple-87139.herokuapp.com/api/v1/deck/newDeck', this.state.deck)
            console.log("created a new deck")
        } catch (e) {
            console.log("failed to create a new deck")
            console.error(e)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <label className="form-label">Deck Name</label>
                    <input
                        type='text'
                        name='name'
                        className="form-input"
                        onChange={this.handleChange}
                        value={this.state.deck.name}
                    />
                    <label className="form-label">Current User</label>
                    <input
                        type='text'
                        name='creatorName'
                        className="form-input"
                        onChange={this.handleChange}
                        value={this.props.userName}
                    />
                    <input
                        type='hidden'
                        name='creatorId'
                        className="form-input"
                        onChange={this.handleChange}
                        value={this.props.userId}
                    />
                    <input
                        type='hidden'
                        name='subjectId'
                        className="form-input"
                        onChange={this.handleChange}
                        value={this.props.subjectId}
                    />
                    <input type="submit" value="Add Deck" />
                </form>
            </div>
        );
    }
}

export default NewDeck;