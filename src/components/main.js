import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {AccountPage, LoginPage, NoteFormPage, NotePage, NotesPage, RegistrationPage} from "../pages/index";
import {Navigation} from "../components/index";
import {loadFromLocalStorage, users} from "../db";

class Main extends React.Component {
    state = {
        logged: false,
        username: "",
        empty: false
    };

    isLogged() {
        if(this.state.username === "") {
            if(localStorage.getItem("username") === null && !this.state.empty) {
                this.state.empty = true;
            } else if(!this.state.empty)  {
                this.state.username = localStorage.getItem("username");
                this.state.logged = true;
            }
        } else{
            if(localStorage.getItem("username") === null) {
                localStorage.setItem("username", this.state.username);
            }
        }
    }

    render() {
        {
            loadFromLocalStorage();
            this.isLogged();
        }
        //console.log(users);

        return (
            <main>
                <aside>
                    <Navigation main={this}/>
                </aside>
                <article id="window">
                    <Switch>
                        <Route exact path='/' render={() => <LoginPage main={this} />} />
                        <Route path='/registration' render={() => <RegistrationPage main={this} />} />
                        <Route path='/account' render={() => <AccountPage main={this} />} />
                        <Route path='/note' render={() => <NotePage main={this} />} />
                        <Route path='/noteform' render={() => <NoteFormPage main={this} />} />
                        <Route path='/notes' render={() => <NotesPage main={this} />} />
                    </Switch>
                </article>
            </main>
        )
    }
}

export default Main