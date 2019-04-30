import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import GrassApp from "./components/GrassApp"


ReactDOM.render(
    <Router>
        <GrassApp />
    </Router>,
    document.getElementById('root')
)

