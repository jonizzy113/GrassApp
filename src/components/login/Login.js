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
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
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
                sessionStorage.setItem("employeeId", tempUserName.id)
                this.props.onLogin()
                this.props.history.push("/clients") 
            } else {
                window.alert("Not Found!")
        }}).then(() => this.props.userData())

    }
        // renders the login form 
    render() {
        return (
            <React.Fragment>
            <h2 className="content welcome">Welcome to GrassApp</h2>
            <form onSubmit={this.handleLogin} className="content">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="userName">
                    User Name
                </label>
                <input onChange={this.handleFieldChange} type="userName"
                    id="userName"
                    placeholder="user Name"
                    required="" autoFocus="" />
                <label htmlFor="password">
                    password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="password"
                    required="" />
                <button type="submit"
                onClick={() => this.handleLogin}>
                    Sign in
                </button>
            </form>
            </React.Fragment>
        )
    }
}
