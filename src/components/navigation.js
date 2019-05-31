import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {

    isLoggedStatus() {
        console.log("Logged status: "+this.props.main.state.logged);
        if(this.props.main.state.logged) {
            return <div> Logged as <b>{this.props.main.state.username}</b> <button onClick={this.clickLogout}>Log Off</button></div>;
        }
        return <div> Login to start</div>;
    }

    clickLogout = () => {
        localStorage.removeItem("username");
        this.props.main.state.username = "";
        this.props.main.state.logged = false;
        this.props.main.forceUpdate();
    };

    loggedMenu() {
        if(this.props.main.state.logged) {
            return (
                [
                    <li><Link to='/account'>Account</Link></li>,
                    <li><Link to='/notes'>Notes</Link></li>,
                    <li><Link to='/noteform'>Add Note</Link></li>
                ]
            );
        } else {
            return (
                [
                    <li><Link to='/'>Login</Link></li>,
                    <li><Link to='/registration'>Registration</Link></li>
                ]
            );
        }
    }

    render() {
        let nav = (
            <nav>
                <b>Menu</b>
                <ul>
                    {this.loggedMenu()}
                </ul>
                {this.isLoggedStatus()}
            </nav>
        );
        return nav
    }
}

export default Navigation