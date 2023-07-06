import React, {lazy, Suspense, useState} from 'react';
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));

const AuthLazy = lazy(() => import('./components/AuthApp'));

import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
// import { Switch, Route} from 'react-router-dom';
import { Switch, Route,BrowserRouter} from 'react-router-dom'

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                <Suspense fallback = {<Progress />} >

                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                        </Route>
                        <Route path="/" component={MarketingLazy} />
                    </Switch>
               </Suspense>
            </div>
        </StylesProvider>
        </BrowserRouter>
    ) 
};