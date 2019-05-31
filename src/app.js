import React from 'react'

import {Header, Main, Footer} from "./components"

class App extends React.Component {

    render() {
        return (
            [
                <Header/>,
                <Main/>,
                <Footer/>
            ]
        )
    }
}

export default App