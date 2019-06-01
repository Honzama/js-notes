import React from 'react'
import { Redirect } from 'react-router';
import { getUserByUsername } from "../db";

class AccountPage extends React.Component {

    accountInfo() {
        const user = getUserByUsername(this.props.main.state.username);
        if(!(user === null)) {
            return(
                <ul>
                    <li>Username: {user.username}</li>
                    <li>Email: {user.email}</li>
                </ul>
            );
        }
    }

    render() {
        console.log("---Rendering account page---");

        if(!this.props.main.state.logged) {
            return <Redirect push to="/" />;
        }

        return (
            <div>
                <h1>Account Details</h1>
                {this.accountInfo()}
            </div>
        )
    }
}

export default AccountPage