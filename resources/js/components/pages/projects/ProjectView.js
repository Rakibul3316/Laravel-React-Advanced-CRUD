import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Badge, Spinner, InputGroup, FormControl, Alert } from 'react-bootstrap';
import TaskCreate from '../tasks/TaskCreate';
import ProjectEdit from './ProjectEdit';
import { deleteTask, updateTask } from '../../../service/TaskService';

function ProjectView(props) {
    const [project, setProject] = useState({});
    const [taksList, setTaskList] = useState([]);
    const [searchTaskList, setSearchTaskList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggleAddTaskBtn, setToggleAddTaskBtn] = useState(false);
    const [toggleEditProjectBtn, setToggleEditProjectBtn] = useState(false);

    // const [projectLists, setProjectLists] = useState([]);
    // console.log("console from state", projectLists);

    // console.log(props.match.params.id);

    useEffect(() => {
        handleGetProjectsDetails();
    }, []);

    const handleGetProjectsDetails = () => {
        setLoading(true);
        Axios.get(`http://127.0.0.1:8000/api/projects/${props.match.params.id}`)
            .then((res) => {
                // const taksList = res.data.data;
                // console.log(projectLists);
                // setTaskList(taksList);
                // console.log(res.data.data);
                setProject(res.data.data);
                setTaskList(res.data.data.tasks)
                setSearchTaskList(res.data.data.tasks)
                setLoading(false);
            });
    }

    const toggleAddTask = () => {
        setToggleAddTaskBtn(!toggleAddTaskBtn);
        setToggleEditProjectBtn(false);
    }

    const toggleEditProject = () => {
        setToggleEditProjectBtn(!toggleEditProjectBtn);
        setToggleAddTaskBtn(false);
    }

    const onCompleteTaskCreate = (task) => {
        toggleAddTask();
        let tasks = [...taksList];
        tasks.unshift(task);
        setTaskList(tasks);
    }

    const onCompleteProjectEdit = () => {
        // setToggleAddTaskBtn(false);
        handleGetProjectsDetails();
        toggleEditProject();
    }

    const onEditTask = () => {
        handleGetProjectsDetails();
    }

    const toggleCompleteStatus = async (task) => {
        // console.log('task :>> ', task);
        if (task.status == 0) {
            task.status = 1;
        } else {
            task.status = 0;
        }
        await updateTask(task.id, task);
        onEditTask();
    }

    const deleteOneTask = async (id) => {
        const response = await deleteTask(id);
        if (response.success) {
            alert("Are you sure ?")
            handleGetProjectsDetails();
        } else {
            alert("Something went wrong !!")
        }
    }

    const handleSerchTask = (e) => {
        const searchText = e.target.value;
        setLoading(true);
        // console.log('searchText :>> ', searchText);
        if (searchText.length > 0) {
            const searchData = taksList.filter(item => {
                const itemData = item.name + '' + item.description;
                const textData = searchText.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(textData) !== -1;
            });
            // console.log('searchData :>> ', searchData);
            setSearchTaskList(searchData);
            setLoading(false);
        } else {
            handleGetProjectsDetails();
            setLoading(false);
        }
    }

    return (
        <Container>
            <div className="header-part pt-4">
                <div className="row">
                    <div className="col-md-3">
                        {
                            !toggleEditProjectBtn && (
                                <>
                                    <h2 >{project.name} <Badge bg="primary">{searchTaskList.length}</Badge></h2>
                                </>
                            )
                        }
                        {
                            toggleEditProjectBtn && (
                                <ProjectEdit project={project} onCompleteProjectEdit={onCompleteProjectEdit} />
                            )
                        }
                    </div>
                    <div className="col-md-5">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Type project's to search....."
                                aria-label="Type project's to search....."
                                aria-describedby="basic-addon2"
                                onChange={(e) => handleSerchTask(e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="col-md-4">
                        <Button variant={`outline-${project.status == 1 ? "success" : "danger"} mr-2 `}>
                            {
                                project.status == 1 && (
                                    <span>Completed</span>
                                )
                            }
                            {
                                project.status == 0 && (
                                    <span>Pending</span>
                                )
                            }
                        </Button>
                        <Button className="btn btn-success mr-2" onClick={toggleEditProject}>
                            {!toggleEditProjectBtn && <span>Edit</span>}
                            {toggleEditProjectBtn && <span>Cancel Editing</span>}
                        </Button>
                        <Button className="btn btn-primary mr-2" onClick={toggleAddTask}>
                            {!toggleAddTaskBtn && <span>+ Add Task</span>}
                            {toggleAddTaskBtn && <span>Cancel Adding</span>}
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div>{project.description}</div>

                        {
                            searchTaskList.length == 0 && (
                                <Alert variant='warning' className='mt-5'>
                                    No task found !! Please create one...
                                </Alert>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                toggleAddTaskBtn && (
                    <Card className='mt-4'>
                        <TaskCreate project_id={props.match.params.id} onCompleteTaskCreate={onCompleteTaskCreate} />
                    </Card>
                )
            }

            {
                loading && (
                    <div className='text-center'>
                        <Spinner animation="border" />
                    </div>
                )
            }
            {
                searchTaskList.map((task, index) => (
                    <Card className='mt-4' key={index}>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-9">
                                    <Card.Text>
                                        {
                                            task.status == 1 && (
                                                <del className='text-success'>
                                                    {task.name}{" "}
                                                    <Badge bg="info">{task.tasks_count}</Badge>
                                                </del>
                                            )
                                        }

                                        {
                                            task.status == 0 && (
                                                <span>
                                                    {task.name}{" "}
                                                    <Badge bg="info">{task.tasks_count}</Badge>
                                                </span>
                                            )
                                        }
                                    </Card.Text>
                                </div>
                                <div className="col-md-3">
                                    <button className={`btn btn-sm btn-outline-${task.status == 0 ? 'warning' : 'success'} mr-2`} onClick={() => toggleCompleteStatus(task)}>
                                        {task.status == 0 && (<span>Pending Task</span>)}
                                        {task.status == 1 && (<span>Completed Task</span>)}
                                    </button>
                                    <button className='btn btn-sm btn-danger' onClick={() => deleteOneTask(task.id)}>Delete</button>
                                </div>
                            </div>
                            {task.description}
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    );
}

export default ProjectView;