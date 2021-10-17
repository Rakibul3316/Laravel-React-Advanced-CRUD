import ReactDOM from 'react-dom';

import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
/* Layouts */
import Header from './layouts/Header';
import Footer from './layouts/Footer';
/* Pages */
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectsList from './pages/projects/ProjectsList';
import ProjectCreate from './pages/projects/ProjectCreate';
import ProjectView from './pages/projects/ProjectView';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { checkIfAuthenticated } from '../service/AuthService';
import PrivateRoute from './PrivateRoute';

function App() {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (checkIfAuthenticated()) {
            // console.log('checkIfAuthenticated user data :>> ', checkIfAuthenticated());
            setUser(checkIfAuthenticated());
            setIsLoggedIn(true);
        }
    }, [])

    return (
        <Router>
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/about" exact={true} component={About} />
                <Route path="/contact" exact={true} component={Contact} />

                {/* Private Authenticated Route */}
                <PrivateRoute
                    authed={isLoggedIn}
                    path='/projects'
                    component={ProjectsList}
                />

                <PrivateRoute
                    authed={isLoggedIn}
                    path='/projects/create'
                    component={ProjectCreate}
                />

                <PrivateRoute
                    authed={isLoggedIn}
                    path='/projects/view/:id'
                    component={ProjectView}
                />
                {/* Private Authenticated Route */}

                {/* <Route path="/projects" exact={true} component={ProjectsList} /> */}
                {/* <Route path="/projects/create" exact={true} component={ProjectCreate} />
                <Route path="/projects/view/:id" exact={true} component={ProjectView} /> */}
                <Route path="/signup" exact={true} component={Register} />
                <Route path="/signin" exact={true} component={Login} />
            </Switch>
            <Footer />
        </Router>
    );
} Register

export default App;



if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
