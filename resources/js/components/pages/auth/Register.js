import { identity } from 'lodash';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../../service/AuthService';

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [errors, seterrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    // const [status, setStatus] = useState(true);
    // let history = useHistory();
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
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
            }
            setIsLoading(true);
            const response = await registerUser(postBody);
            console.log(response);

            if (response.success) {
                setName('');
                setEmail('');
                setPassword('');
                setPassword_confirmation('');
                seterrors({});
                setValidated(false);
                setIsLoading(false);
                localStorage.setItem('loginData', JSON.stringify(response));
            } else {
                setIsLoading(false);
                seterrors(response.errors);
            }
        }
    }

    return (
        <Container>
            <div className="header-part pt-4">
                <h2 >Sing Up</h2>
            </div>
            <Card style={{ marginTop: '30px' }}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please give your name.
                                </Form.Control.Feedback>
                                {
                                    errors && errors.name && (
                                        <p className="text-danger m-0">
                                            {errors.name[0]}
                                        </p>
                                    )
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                                {
                                    errors && errors.email && (
                                        <p className="text-danger m-0">
                                            {errors.email[0]}
                                        </p>
                                    )
                                }
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
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
                                {
                                    errors && errors.password && (
                                        <p className="text-danger m-0">
                                            {errors.password[0]}
                                        </p>
                                    )
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Confirm Password"
                                    name="password_confirmation"
                                    required
                                    onChange={(e) => setPassword_confirmation(e.target.value)}
                                    value={password_confirmation}
                                    minLength={8}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please give correct password.
                                </Form.Control.Feedback>
                                {
                                    errors && errors.password_confirmation && (
                                        <p className="text-danger m-0">
                                            {errors.password_confirmation[0]}
                                        </p>
                                    )
                                }
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
                                <span className='pl-3'>Signing Up...</span>
                            </Button>
                        )}
                        {
                            !isLoading && (
                                <Button type='submit' variant="success">Sign Up</Button>
                            )
                        }
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Register;