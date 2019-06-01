import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom'

import App from './app'

const render = Component => {
    ReactDOM.render(
        <HashRouter>
            <App/>
        </HashRouter>
        , document.getElementById('root')
    )
};

render();
