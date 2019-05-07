import React, { Component } from "react"
import UserManager from "../user/UserManager"
import './login.css'


export default class Login extends Component {
        // setting intial state
    state = {
        userName: "",
        password: ""
    }
        //  handleFieldChange update state when the input field is editied
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // handleLogin gets all users takes that and checks to see if it matches
    // if it does match it sets session storage then calls onLogin which gets all data
    // then got to the clients page
    handleLogin = (e) => {
        e.preventDefault()
        UserManager.getAll()
        .then(userList => {
            let tempUserName = userList.find(element => element.userName.toLowerCase() ===
            this.state.userName.toLowerCase() && element.password.toLowerCase() ===
            this.state.password.toLowerCase())
            if (tempUserName) {
                sessionStorage.setItem("userId", tempUserName.id)
                this.props.onLogin()
                this.props.history.push("/clients") 
            } else {
                window.alert("Not Found!")
        }})

    }
        // renders the login form 
    render() {
        return (
            <React.Fragment>
            <div className="div">
            <h2 className="content welcome">Welcome to GrassApp</h2>
            <form onSubmit={this.handleLogin} className="content">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div className="form-group">
                <label htmlFor="userName">
                    User Name
                </label>
                <input onChange={this.handleFieldChange} type="userName"
                    id="userName"
                    placeholder="user Name"
                    required="" autoFocus="" />
                    </div>
                <div className="form-group">
                <label htmlFor="password">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="password"
                    required="" />
                    </div>
                <button type="submit" className="btn btn-primary"
                onClick={() => this.handleLogin}>
                    Sign in
                </button>
            </form>
            </div>
            </React.Fragment>
        )
    }
}
