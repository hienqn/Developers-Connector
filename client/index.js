import { render } from 'react-dom';
import React from 'react';
import App from './components/App.js';
import css from './style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

render(<App />, document.getElementById('root'));
