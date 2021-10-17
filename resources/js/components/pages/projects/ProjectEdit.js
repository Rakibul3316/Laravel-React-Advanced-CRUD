import { identity } from 'lodash';
import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { storeNewProject, updateProject } from '../../../service/ProjectService';

function ProjectEdit(props) {
    const [projectId, setProjectId] = useState(props.project.id)
    const [title, setTitle] = useState(props.project.name);
    const [description, setDescription] = useState(props.project.description);
    const [status, setStatus] = useState(props.project.status);
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const postBody = {
            name: title,
            description: description,
            status: status,
        }
        const response = await updateProject(projectId, postBody);
        // console.log(response);
        // return false;

        if (response.success) {
            setTitle('');
            setDescription('');
            setIsLoading(false);
            props.onCompleteProjectEdit();
        } else {
            alert(`${response.errors.name || response.errors.description}`);
            setIsLoading(false);
            seterrors(response.errors);
            setStatus(response.success);
        }
    }

    return (
        <>
            <h2>Edit Project</h2>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select defaultValue={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                            <option value='0'>Pending</option>
                            <option value='1'>Completed</option>
                        </Form.Select>
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
        </>
    )
}

export default ProjectEdit;