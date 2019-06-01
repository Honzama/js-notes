import React from 'react'
import uuid from 'uuid/v4'

import {Header, Main, Footer} from "./components"

class App extends React.Component {

    render() {
        return (
            [
                <Header key={uuid()}/>,
                <Main key={uuid()}/>,
                <Footer key={uuid()}/>
            ]
        )
    }
}

export default App