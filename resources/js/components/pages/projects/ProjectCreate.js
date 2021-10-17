import { identity } from 'lodash';
import React, { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { storeNewProject } from '../../../service/ProjectService';

function ProjectCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [errors, seterrors] = useState({});
    // const [status, setStatus] = useState(true);
    let history = useHistory();
    // const [res, setRes] = useState({});
    console.log('errors >>', description);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const postBody = {
            name: title,
            description: description,
        }
        const response = await storeNewProject(postBody);
        // console.log(response);

        if (response.success) {
            setTitle('');
            setDescription('');
            setIsLoading(false);
            history.push('/projects');
        } else {
            alert(`${response.errors.name || response.errors.description}`);
            setIsLoading(false);
            seterrors(response.errors);
            setStatus(response.success);
        }
    }

    return (
        <Container>
            <div className="header-part pt-4">
                <div className="float-left">
                    <h2 >Create A New Project</h2>
                </div>
                <div className="float-right">
                    <Link to='/projects' className='btn btn-info'>See All Projects</Link>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="form-part bg-secondary p-4 mt-3">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control name='title' type="text" placeholder="Enter Project Name" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control name='description' as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Project Description" rows={5} />
                    </Form.Group>
                    {isLoading && (
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span className='pl-3'>Saving...</span>
                        </Button>
                    )}
                    {
                        !isLoading && (
                            <Button type='submit' variant="primary">Save Project</Button>
                        )
                    }
                </Form>
            </div>
        </Container>
    )
}

export default ProjectCreate;