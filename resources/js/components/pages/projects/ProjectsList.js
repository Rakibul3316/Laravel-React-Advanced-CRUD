import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Badge, Spinner, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../../service/ProjectService';

function ProjectsList() {

    const [projectLists, setProjectLists] = useState([]);
    const [searchProjectLists, setSearchProjectLists] = useState([]);
    // console.log("console from state", projectLists);
    const [loading, setLoading] = useState(false);

    // console.log('projectLists :>> ', projectLists);
    // console.log('searchProjectLists :>> ', searchProjectLists);

    useEffect(() => {
        handleGetProjects();
    }, []);

    const handleGetProjects = () => {
        setLoading(true);
        Axios.get('http://127.0.0.1:8000/api/projects')
            .then((res) => {
                const projectList = res.data.data;
                // console.log(projectLists);
                setProjectLists(projectList);
                setSearchProjectLists(projectList);
                setLoading(false);
            });
    }

    const deleteOneProject = async (id) => {
        const response = await deleteProject(id);
        if (response.success) {
            alert("Are you sure ?")
            handleGetProjects();
        } else {
            alert("Something went wrong !!")
        }
    }

    const handleSerchProject = (e) => {
        const searchText = e.target.value;
        setLoading(true);
        // console.log('searchText :>> ', searchText);
        if (searchText.length > 0) {
            const searchData = projectLists.filter(item => {
                const itemData = item.name + '' + item.description;
                const textData = searchText.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(textData) !== -1;
            });
            // console.log('searchData :>> ', searchData);
            setSearchProjectLists(searchData);
            setLoading(false);
        } else {
            handleGetProjects();
            setLoading(false);
        }
    }

    return (
        <Container>
            <div className="header-part pt-4">
                <div className="row">
                    <div className="col-md-4">
                        <h2 >Project Lists Page <Badge bg="primary">{searchProjectLists.length}</Badge></h2>
                    </div>
                    <div className="col-md-6">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Type project's to search....."
                                aria-label="Type project's to search....."
                                aria-describedby="basic-addon2"
                                onChange={(e) => handleSerchProject(e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="col-md-2">
                        <Link to='/project/create' className='btn btn-info'> + Create Project</Link>
                    </div>
                </div>
            </div>
            {
                loading && (
                    <div className='text-center'>
                        <Spinner animation="border" />
                    </div>
                )
            }
            {
                searchProjectLists.length === 0 && (
                    <Alert varient='warning'>
                        No project found !! Please create one...
                    </Alert>
                )
            }
            {
                searchProjectLists.map((project, index) => (
                    <Card className='mt-4' key={index}>
                        <Card.Header>
                            <h5>{project.name} <Badge bg="info">{project.tasks_count}</Badge></h5>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {project.description}
                            </Card.Text>
                            <Link to={`/projects/view/${project.id}`}>
                                <Button variant="primary" className='mr-2'>View & Edit</Button>
                            </Link>
                            <Button variant="danger" className='mr-2' onClick={() => deleteOneProject(project.id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    );
}

export default ProjectsList;