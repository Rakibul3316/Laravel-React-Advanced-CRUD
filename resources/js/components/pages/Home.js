import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Container>
                <h1>Hello from Home</h1>
                <Link className="btn btn-success" to="/projects"> Go to the Projects </Link>
            </Container>
        </div>
    );
}

export default Home;