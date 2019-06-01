import uuid from 'uuid/v4'
import Sha1 from "./sha1"

export function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("notes", JSON.stringify(notes));
}

export function loadFromLocalStorage() {
    if(!(localStorage.getItem("users") === null) && !(localStorage.getItem("notes") === null)) {
        users = JSON.parse(localStorage.getItem("users"));
        notes = JSON.parse(localStorage.getItem("notes"));
    }
}

export function getNotesByID(id) {
    for(let i =  0; i < notes.length; i++) {
        if(notes[i].id === id) {
            return notes[i];
        }
    }
    return null;
}

export function getNotesByUsername(username) {
    let notesList = new Array();
    let user = getUserByUsername(username);

    if(!(user === null)) {
        for(let i =  0; i < notes.length; i++) {
            if(notes[i].user_id === user.id) {
                notesList.push(notes[i]);
            }
        }
    }

    return notesList;
}

export function getUserByID(id) {
    for(let i =  0; i < users.length; i++) {
        if(users[i].id === id) {
            return users[i];
        }
    }
    return null;
}

export function getUserByUsername(username) {
    for(let i =  0; i < users.length; i++) {
        if(users[i].username === username) {
            return users[i];
        }
    }
    return null;
}

export function checkLogin(username, password) {
    for(let i =  0; i < users.length; i++) {
        if(users[i].username === username) {
            if(users[i].password === Sha1.hash(users[i].email+password)) return true;
        }
    }
    return false;
}

export function deleteNode(id) {
    for(let i =  0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
            saveToLocalStorage();
            return;
        }
    }
}

export function editNode(id, title, text) {
    for(let i =  0; i < notes.length; i++) {
        if(notes[i].id === id) {
            notes[i].title = title;
            notes[i].text = text;
            saveToLocalStorage();
            return;
        }
    }
}

export function addNode(title, text, username) {
    notes.push(
        {
            id: uuid(),
            user_id: getUserByUsername(username).id,
            title: title,
            text: text,
        }
    );
    saveToLocalStorage();
}

export function addUser(username, password, email) {
    users.push(
        {
            id: users.length,
            username: username,
            password: Sha1.hash(email+password),
            email: email
        }
    );
    saveToLocalStorage();
    return true;
}

export let users = [
    {
        id: 0,
        username: "user1",
        password: Sha1.hash("user1@email.com"+"pass"),
        email: "user1@email.com"
    },
    {
        id: 1,
        username: "user2",
        password: Sha1.hash("user2@email.com"+"pass"),
        email: "user2@email.com"
    }
];

export let notes = [
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 title",
        text: "Node1 text",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node2 title",
        text: "Node2 text",
    },
    {
        id: uuid(),
        user_id: users[1].id,
        title: "Node1 title",
        text: "Node1 text",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    },
    {
        id: uuid(),
        user_id: users[0].id,
        title: "Node1 test",
        text: "Node1 test",
    }
];

export const motos = [
    "Ink-less notes yaaay!",
    "Digital notes for everyone.",
    "Pain-less and pen-less notes.",
    "Notes with no sacrificed or harmed trees :)"
];
