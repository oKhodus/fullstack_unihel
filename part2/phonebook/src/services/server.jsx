import axios from 'axios'

const URL = 'http://localhost:3001/persons'

const getall = () => axios.get(URL).then(response => response.data)

const create = newObj => axios.post(URL, newObj).then(response => response.data)

const update = (id, Obj) => axios.put(`${URL}/${id}`, Obj).then(response => response.data)

const del = id => axios.delete(`${URL}/${id}`)

export default {getall, create, update, del}