import { identity } from 'lodash';
import React, { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { storeNewTask } from '../../../service/TaskService';

function TaskCreate(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();




    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const postBody = {
            name: title,
            description: description,
            project_id: props.project_id
        }
        const response = await storeNewTask(postBody);
        console.log(response);

        if (response.success) {
            setTitle('');
            setDescription('');
            setIsLoading(false);
            props.onCompleteTaskCreate(response.data);
            // history.push('/projects');
        } else {
            alert(`${response.errors.name || response.errors.description}`);
            setIsLoading(false);
        }
    }
    return (
        <Container>
            <div className="form-part bg-secondary p-4 mt-3">
                <h2>Create New Task</h2>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control name='title' type="text" placeholder="Enter Project Name" onChange={(e) => setTitle(e.target.value)} value={title} />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control name='description' as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Project Description" rows={2} />
                            </Form.Group>
                        </div>
                        {/* <Button type='submit' variant="warning">Save Project</Button> */}
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
                                <Button type='submit' variant="primary">Add Task</Button>
                            )
                        }
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default TaskCreate;