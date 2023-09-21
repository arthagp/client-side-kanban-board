const { instance } = require('../api/axios')

const login = async (username, password) => {
    try {
        const response = await instance.post('/login', { username, password })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const register = async (username, password) => {
    try {
        const response = await instance.post('/register', { username, password })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}
// Board
const createBoard = async (boardName) => {
    try {
        const response = await instance.post('/board', { boardName })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const getAllBoard = async () => {
    try {
        const response = await instance.get(`/boards`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const editBoard = async (boardId, boardName) => {
    try {
        const response = await instance.put(`/board/${boardId}`, { boardName })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const deleteBoard = async (boardId) => {
    try {
        const response = await instance.delete(`/board/${boardId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}
// 

// Task
const createTask = async (taskName, boardId) => {
    try {
        const response = await instance.post('/task', { taskName, boardId })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const editTask = async (taskId, taskName, taskDescription, taskStatus, taskPriotiry) => {
    try {
        const response = await instance.put(`/task/${taskId}`, { taskName, taskDescription, taskStatus, taskPriotiry })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const getAllTask = async (boardId) => {
    try {
        const response = await instance.get(`/tasks/${boardId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const moveTask = async () => {
    try {
        const response = await instance.put('/tasks/move')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}

const deleteTask = async (taskId) => {
    try {
        const response = await instance.delete(`/task/${taskId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something Went Wrong')
    }
}
// 

module.exports = { login, register, createBoard, editBoard, deleteBoard, getAllBoard, createTask, editTask, getAllTask, moveTask, deleteTask }