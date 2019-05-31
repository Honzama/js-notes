import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { getNotesByUsername } from "../api";

class NotesPage extends React.Component {

    loadNotes() {
        let notes = getNotesByUsername(this.props.main.state.username);
        console.log("Username: "+this.props.main.state.username);
        console.log("Notes for this username is ");
        console.log(notes);

        if(notes.length > 0) {
            let notesList = new Array();
            for(let i = 0; i < notes.length; i++) {
                notesList.push(<Link to={'/note?id='+notes[i].id}>{notes[i].title}</Link>);
            }

            return(notesList);
        }

        return(
            <bold>You haven´t created any notes yet.</bold>
        );
    }

    render() {
        console.log("---Rendering notes page---");

        if(!this.props.main.state.logged) {
            return <Redirect push to="/" />;
        }

        return (
            <div>
                <h1>Notes</h1>

                <div id={"notes"}>
                    {this.loadNotes()}
                </div>
            </div>
        )
    }
}

export default NotesPage