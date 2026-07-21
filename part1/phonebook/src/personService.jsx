import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () =>
  axios.get(baseUrl).then(response => response.data)

const create = (personObject) =>
  axios.post(baseUrl, personObject).then(response => response.data)

const update = (id, personObject) =>
  axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data)

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }