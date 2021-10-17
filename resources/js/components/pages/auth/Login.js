import { identity } from 'lodash';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { loginUser, registerUser } from '../../../service/AuthService';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    // const [show, setShow] = useState(true);
    // const [status, setStatus] = useState(true);
    let history = useHistory();
    // const [res, setRes] = useState({});
    // console.log('errors >>', description);


    const handleSubmit = async (e) => {

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() !== false) {
            e.preventDefault();
            setIsLoading(true);
            const postBody = {
                email: email,
                password: password,
            }
            setIsLoading(true);
            const response = await loginUser(postBody);
            // console.log(response);
            // console.log(response.message);

            if (response.success) {
                setEmail('');
                setPassword('');
                seterrorMessage('');
                setValidated(false);
                setIsLoading(false);
                localStorage.setItem('loginData', JSON.stringify(response));
                // history.push('projects')
                window.location.href = '/'; //projects
            } else {
                setIsLoading(false);
                seterrorMessage(response.message);
            }
        }
    }

    return (
        <Container>
            <div className="header-part pt-4">
                <h2 >Sing In</h2>
            </div>
            <Card style={{ marginTop: '30px' }}>
                <Card.Body>
                    {
                        errorMessage.length > 0 && (
                            <Alert
                                variant="danger"
                            >
                                {errorMessage}
                            </Alert>
                        )
                    }
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please give your valid email address.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your Password"
                                    name="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    minLength={8}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please give correct password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        {isLoading && (
                            <Button variant="success" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className='pl-3'>Signing In...</span>
                            </Button>
                        )}
                        {
                            !isLoading && (
                                <Button type='submit' variant="success">Sign In</Button>
                            )
                        }
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;