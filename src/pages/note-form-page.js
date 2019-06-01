import React from "react";
import { Button, Form, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router';
import { addNode, editNode } from "../db";
import queryString from 'query-string';
import {getNotesByID, getUserByID} from "../db";
import uuid from "uuid/v4";

class NoteFormPage extends React.Component {

    state = {
        id: "",
        exist: false,
        title: '',
        text: '',
        added: false,
        error: false,
        error_msg: ''
    };

    getTitle() {
        if((this.state.id === undefined) || (this.state.id === null) || (this.state.id === "") || !this.state.exist) {
            return "Add Note";
        }
        return "Edit Note";
    }

    getSubmitText() {
        if((this.state.id === undefined) || (this.state.id === null) || (this.state.id === "") || !this.state.exist) {
            return "Add";
        }
        return "Edit";
    }

    loadId() {
        this.state.id = "";
        //console.log(location.search);

        const parsed = queryString.parse(location.search);

        //console.log(parsed);
        console.log("id: "+parsed.id);

        if(!(parsed.id === undefined)) {
            this.state.id = parsed.id;
        }
    }

    loadNote() {
        const note = getNotesByID(this.state.id);

        if(!(note === null) && !(note === undefined)) {
            const user = getUserByID(note.user_id);
            if(this.props.main.state.username === user.username) {
                this.state.exist = true;
                this.state.title = note.title;
                this.state.text = this.elementToText(note.text);
            }
        } else {
            this.state.exist = false;
            this.state.title = "";
            this.state.text = "";
        }
    }

    handleDrop = (event) => {
        console.log('File(s) dropped');
        event.preventDefault();

        if(event.dataTransfer.items) {
            if(event.dataTransfer.items.length === 1) {
                if(event.dataTransfer.items[0].kind === 'file') {
                    let file = event.dataTransfer.items[0].getAsFile();

                    if(file.type === "text/plain") {
                        this.state.title = file.name.split(".txt")[0];

                        let reader = new FileReader();
                        reader.onload = (event) => {
                            this.state.text = event.target.result;
                            this.forceUpdate();
                        };

                        reader.readAsText(file, "UTF8");
                    }
                }
            }
        } else {
            if(event.dataTransfer.files.length === 1) {
                let file = event.dataTransfer.files[0];

                if(file.type === "text/plain") {
                    this.state.title = file.name.split(".txt")[0];

                    let reader = new FileReader();
                    reader.onload = (event) => {
                        this.state.text = event.target.result;
                        this.forceUpdate();
                    };

                    reader.readAsText(file, "UTF8");
                }
            }
        }
    };

    textToElements = (text) => {
        let elements = new Array();
        let textLines = text.split("\n");

        for(let i = 0; i < textLines.length; i++) {
            elements.push(textLines[i]);
            if(i+1 < textLines.length)
                elements.push(<br/>);
        }
        return elements;
    };

    elementToText = (elements) => {
        let text = "";

        for(let i = 0; i < elements.length; i++) {
            if(elements[i].type === <br/>.type) {
                text += "\n";
            } else {
                text += elements[i];
            }
        }

        return text;
    };

    handleDragOverHandler = (event) => {
        event.preventDefault();
    };

    handleInputChange = (event) => {
        this.state[event.target.name] = event.target.value;
        this.forceUpdate();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.title && this.state.text) {
            if((this.state.id === undefined) || (this.state.id === null) || (this.state.id === "") || !this.state.exist) {
                addNode(this.state.title, this.textToElements(this.state.text), this.props.main.state.username);
                this.state.added = true;
                this.forceUpdate();
            } else {
                editNode(this.state.id, this.state.title, this.state.text);
                this.state.added = true;
                this.forceUpdate();
            }
        } else {
            this.state.error = true;
            this.state.error_msg = "Type title and text to login.";
            this.forceUpdate();
        }
    };

    errorMsg() {
        if(this.state.error) {
            return (<div className={"error-msg"}>{this.state.error_msg}</div>);
        }
    }

    render() {
        console.log("---Rendering note form page---");

        if(!this.props.main.state.logged) {
            return <Redirect push to="/" />;
        }

        if(this.state.added) {
            return <Redirect push to="/notes" />;
        }

        this.loadId();
        if((this.state.id === undefined) || (this.state.id === null) || (this.state.id === "")) {
            console.log("ID error!");
        } else {
            console.log("ID is ok.");
            if(!this.state.exist) {
                console.log("Loading node by id.");
                this.loadNote();
            }
        }

        console.log(this.state);

        if((!this.state.exist && !(this.state.id === "" || this.state.id === undefined || this.state.id === null))) {
            this.state.id = "";
            console.log("Redirecting to /noteform");
            return <Redirect push to="/noteform" />;
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment>
                        <h1>{this.getTitle()}</h1>
                        <Form.Input
                            fluid
                            type="text"
                            icon="user"
                            iconPosition="left"
                            name="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                        />
                        <textarea
                            key={uuid()}
                            name="text"
                            placeholder="Text"
                            value={this.state.text}
                            onChange={this.handleInputChange}
                            rows={10}
                        />
                        <Button type="submit">{this.getSubmitText()}</Button>
                        {this.errorMsg()}

                        <div id={"drop_zone"} onDrop={this.handleDrop} onDragOver={this.handleDragOverHandler}>
                            <p><b>Drag .txt files to this Drop Zone ...</b></p>
                        </div>
                    </Segment>
                </Form>
            </div>
        )
    }
}

export default NoteFormPage