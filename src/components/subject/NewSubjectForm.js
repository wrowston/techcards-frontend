import React, {Component} from 'react';
import axios from 'axios'

class NewSubjectForm extends Component {

    state = {
        subject: {
            name: '',
            imageUrl: ''
        }
    }

    handleChange = (evt) => {
        const newState = {...this.state}
        newState.subject[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('https://protected-temple-87139.herokuapp.com/api/v1/subject/newSubject', this.state.subject)
            console.log("created a new subject")
        } catch (e) {
            console.log("failed to create a new subject")
            console.error(e)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <label className="form-label">Subject Name</label>
                    <input
                        type='text'
                        name='name'
                        className="form-input"
                        onChange={this.handleChange}
                        value={this.state.subject.name}
                    />
                    <label className="form-label">Image URL</label>
                    <input
                        type='text'
                        name='imageUrl'
                        className="form-input"
                        onChange={this.handleChange}
                        value={this.state.subject.imageUrl}
                    />
                    <input type="submit" value="Add Subject"/>
                </form>
            </div>
        );
    }
}

export default NewSubjectForm;