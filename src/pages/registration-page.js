import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router';
import {addUser} from "../db";

class RegistrationPage extends React.Component {

    state = {
        username: '',
        password: '',
        email: '',
        error: false,
        error_msg: '',
        registrated: false
    };

    handleInputChange = (event) =>
        this.state[event.target.name] = event.target.value;

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.username && this.state.password && this.state.email) {
            if(addUser(this.state.username, this.state.password, this.state.email)) {
                this.state.registrated = true;
                this.props.main.forceUpdate();
            } else {
                this.state.error = true;
                this.state.error_msg = "Invalid username, password or email, please try again.";
                this.forceUpdate();
            }
        } else {
            this.state.error = true;
            this.state.error_msg = "Type username, password and email to registrate.";
            this.forceUpdate();
        }
    };

    errorMsg() {
        if(this.state.error) {
            return (<div className={"error-msg"}>{this.state.error_msg}</div>);
        }
    }

    render() {
        console.log("---Rendering registration page---");

        if(this.props.main.state.logged) {
            return <Redirect push to="/notes" />;
        }

        if(this.state.registrated) {
            return <Redirect push to="/" />;
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment>
                        <h1>Registration</h1>
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
                        <Form.Input
                            fluid
                            type="email"
                            icon="user"
                            iconPosition="left"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleInputChange}
                        />
                        <Button type="submit">Registrate</Button>
                        {this.errorMsg()}
                    </Segment>
                </Form>
            </div>
        )
    }
}

export default RegistrationPage