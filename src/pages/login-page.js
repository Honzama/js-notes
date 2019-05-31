import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router';
import {checkLogin} from "../api";

class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        error: false,
        error_msg: ''
    };

    handleInputChange = (event) =>
        this.state[event.target.name] = event.target.value;

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.username && this.state.password) {
            if(checkLogin(this.state.username, this.state.password)) {
                this.props.main.state.username = this.state.username;
                this.props.main.state.logged = true;
                this.props.main.forceUpdate();
            } else {
                this.state.error = true;
                this.state.error_msg = "Invalid username of password, please try again.";
                this.forceUpdate();
            }
        } else {
            this.state.error = true;
            this.state.error_msg = "Type username and password to login.";
            this.forceUpdate();
        }
    };

    errorMsg() {
        if(this.state.error) {
            return (<div className={"error-msg"}>{this.state.error_msg}</div>);
        }
    }

    render() {
        console.log("---Rendering login page---");

        if(this.props.main.state.logged) {
            return <Redirect push to="/notes" />;
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment>
                        <h1>Login</h1>
                        <Form.Input
                            fluid
                            type="text"
                            icon="user"
                            iconPosition="left"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleInputChange}
                        />
                        <Form.Input
                            fluid
                            type="password"
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                        />
                        <Button type="submit">Login</Button>
                        {this.errorMsg()}
                    </Segment>
                </Form>
            </div>
        )
    }
}

export default LoginPage