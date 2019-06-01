import React from 'react'
import { Redirect } from 'react-router';
import queryString from 'query-string';
import {getNotesByID, getUserByID, deleteNode} from "../db";
import uuid from "uuid/v4";

class NotePage extends React.Component {
    state = {
        id: "",
        exist: true,
        back: false,
        edit: false
    };

    loadId() {
        console.log(location.search);

        const parsed = queryString.parse(location.search);

        console.log(parsed);
        console.log("id: "+parsed.id);

        this.state.id = parsed.id;
    }

    getNote() {
        const note = getNotesByID(this.state.id);

        if(!(note === null) && !(note === undefined)) {
            const user = getUserByID(note.user_id);
            if(this.props.main.state.username === user.username) {
                let elements = new Array([<b id={"title"} key={uuid()}>{note.title}</b>]);
                let textLines = note.text.split(/\r?\n/);

                for(let i = 0; i < textLines.length; i++) {
                    elements.push(textLines[i]);
                    if(i+1 < textLines.length)
                        elements.push(<br key={uuid()}/>);
                }
                return(elements);
            }
        }
        this.state.exist = false;
        this.forceUpdate();
    }

    clickBack = () => {
        this.state.back = true;
        this.forceUpdate();
    };

    clickEdit = () => {
        this.state.edit = true;
        this.forceUpdate();
    };

    clickDelete = () => {
        deleteNode(this.state.id);
        this.state.back = true;
        this.forceUpdate();
    };

    render() {
        console.log("---Rendering note page---");

        if(!this.props.main.state.logged) {
            return <Redirect push to="/" />;
        }

        this.loadId();

        if((this.state.id === undefined) || (this.state.id === null) || (this.state.id === "") || !this.state.exist) {
            return <Redirect push to="/notes" />;
        }

        if(this.state.back) {
            return <Redirect push to="/notes" />;
        }

        if(this.state.edit) {
            return <Redirect push to={"/noteform?id="+this.state.id} />;
        }

        return (
            <div>
                <div id={"buttons"}>
                    <button onClick={this.clickBack}>Back</button>
                    <button onClick={this.clickEdit}>Edit</button>
                </div>

                {this.getNote()}

                <div id={"buttons"}>
                    <button id={"invisible"} disabled>""</button>
                    <button id={"delete"} onClick={this.clickDelete}>Delete</button>
                </div>
            </div>
        )
    }
}

export default NotePage