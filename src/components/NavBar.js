import React, { Component } from 'react';
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Home from "./Home";
import AllSubjects from "./subject/AllSubjects";
import SingleSubject from "./subject/SingleSubject";
import SingleDeck from "./deck/SingleDeck";
import NewUser from "./user/NewUser";
import AllUsers from "./user/AllUsers";
import SingleUser from "./user/SingleUser";
import EditFlashcard from "./flashcard/EditFlashcard";

class NavBar extends Component {

    state = {
        allUsers: [],
        currentUserId: ''
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        try {
            const res = await axios.get('https://protected-temple-87139.herokuapp.com/api/v1/user/all')
            const newState = { ...this.state }
            newState.allUsers = res.data
            this.setState(newState)
        } catch (e) {
            console.log("Failed to get all users")
            console.error(e)
        }
    }


    render() {
        return (
            <div>
                <Router>
                    <nav className="nav-bar">

                        {/*TODO: pass current id to links with state*/}
                        <Link to={"/browse/subjects"} className="nav-link">
                            <div>Browse</div>
                        </Link>
                        <div className="nav-link">Create</div>

                        <Link to={"/"} className="logo">
                            <div>TECHCARDS</div>
                        </Link>

                        <Link to={"/users"} className="nav-link">
                            <div>Users</div>
                        </Link>

                        <DropdownButton id="dropdown-basic-button" title="Select User">
                            {this.state.allUsers.map((user, index) => {
                                return (
                                    <div key={`fw755wf34 - ${index}`}>
                                        <Dropdown.Item onClick={() => {
                                            const newState = { ...this.state }
                                            newState.currentUserId = user.id
                                            this.setState(newState)
                                        }}>{user.name}</Dropdown.Item>
                                    </div>
                                )
                            })}
                        </DropdownButton>
                    </nav>
                    <div className="wrapper">
                        <Switch>
                            <Route exact path="/" render={(props) => <Home {...props} userId={this.state.currentUserId} />} />
                            <Route exact path="/browse/subjects" render={(props) => <AllSubjects {...props} userId={this.state.currentUserId} />} />
                            <Route exact path="/subject/:subjectId" render={(props) => <SingleSubject {...props} userId={this.state.currentUserId} />} />
                            <Route exact path="/deck/:deckId" component={SingleDeck} />
                            <Route exact path="/user/newUser" component={NewUser} />
                            <Route exact path="/users" component={AllUsers} />
                            <Route exact path="/user/:userId" component={SingleUser} />
                            <Route exact path="/flashcards/editFlashcard/:flashcardId" component={EditFlashcard} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default NavBar;