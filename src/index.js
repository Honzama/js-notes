import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'

import App from './app'

const render = Component => {
    ReactDOM.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        , document.getElementById('root')
    )
};

render();
