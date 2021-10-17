import Axios from "axios";

export const getProjectList = () => {

}

export const storeNewProject = async (data) => {
    data.user_id = 1;
    return await Axios.post('http://127.0.0.1:8000/api/projects', data)
        .then((res) => {
            return res.data;
        });
}


export const updateProject = async (id, data) => {
    data.user_id = 1;
    return await Axios.put(`http://127.0.0.1:8000/api/projects/${id}`, data)
        .then((res) => {
            return res.data;
        });
}

export const deleteProject = async (id) => {
    return await Axios.delete(`http://127.0.0.1:8000/api/projects/${id}`)
        .then((res) => {
            return res.data;
        });
}