import ReactDOM from 'react-dom';

import React, { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
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
        <BrowserRouter>
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Private Authenticated Route */}
                <PrivateRoute
                    authed={isLoggedIn}
                    path='/projects'
                    element={<ProjectsList />}
                />

                <PrivateRoute
                    authed={isLoggedIn}
                    path='/project/create'
                    element={<ProjectCreate />}
                />

                <PrivateRoute
                    authed={isLoggedIn}
                    path='/projects/view/:id'
                    element={<ProjectView />}
                />
                {/* <Route path="/projects/create" element={<ProjectCreate />} />
                <Route path="/projects/view/:id" element={<ProjectView />} /> */}
                {/* Private Authenticated Route */}

                {/* <Route path="/projects" component={ProjectsList} /> */}
                {/* <Route path="/projects/create" component={ProjectCreate} />
                <Route path="/projects/view/:id" component={ProjectView} /> */}
                <Route path="/signup" element={<Register />} />
                <Route path="/signin" element={<Login />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
} Register

export default App;



if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
