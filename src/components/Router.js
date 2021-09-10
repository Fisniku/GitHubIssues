import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import Comments from '../components/Comments';
import NotFound from '../components/NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path = "/" component = {App} exact />
            <Route path = "/comments/:id" component = {Comments} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;