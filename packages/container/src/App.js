import React, {lazy, Suspense, useState, useEffect} from 'react';
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));

const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
// import { Switch, Route} from 'react-router-dom';
import { Switch, Route,BrowserRouter, Redirect, Router} from 'react-router-dom'

import {createBrowserHistory} from 'history';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});
const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard');
        } 
    }, [isSignedIn])
    return (
        <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                <Suspense fallback = {<Progress />} >

                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                        </Route>
                        <Route path= "/dashboard" >
                            {!isSignedIn && <Redirect to="/" />}
                            <DashboardLazy />
                        </Route>
                        <Route path="/" component={MarketingLazy} />
                    </Switch>
               </Suspense>
            </div>
        </StylesProvider>
        </Router>
    ) 
};