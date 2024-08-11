import axios from "axios";

const baseUrl = "http://localhost:3000/persons";

const getAllPersons = async () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};
const createPerson = async (user) => {
	const request = axios.post(baseUrl, user);
	return request.then((response) => response.data);
};
const deletePerson = async (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};
const updatePerson = async (id, user) => {
	const request = axios.put(`${baseUrl}/${id}`,user);
	return request.then((response) => response.data);
};

export default {getAllPersons, createPerson, deletePerson, updatePerson};
