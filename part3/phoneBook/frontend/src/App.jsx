import {useEffect, useState} from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [search, setSearch] = useState("");
	const [message, setMessage] = useState(null);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		personService
			.getAllPersons()
			.then((data) => {
				setPersons(data);
			})
			.catch((err) =>
				console.error("Error occured in getting all people", err)
			);
	}, []);

	const handleSearch = (e) => setSearch(e.target.value);
	const handleName = (e) => setNewName(e.target.value);
	const handlePhone = (e) => setNewPhone(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = persons.find((person) => person.name === newName)?.id;
		if (id) {
			const confirm = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			if (confirm) {
				personService
					.updatePerson(id, {
						name: newName,
						number: newPhone,
					})
					.then(() => {
						setMessage(`Updated ${newName}`);
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					})
					.catch((err) => {
						setMessage(`Error occured in updating the person ${err}`);
						setHasError(true);
						setTimeout(() => {
							setMessage(null);
							setHasError(false);
						}, 5000);
						console.error("Error occured in updating the person", err);
					});
				setNewName("");
				setNewPhone("");
			} else {
				return;
			}
		} else {
			personService
				.createPerson({
					name: newName,
					number: newPhone,
				})
				.then((persons) => {
					setPersons(persons);
					setMessage(`Added ${newName}`);
					setTimeout(() => {
						setMessage(null);
					}, 5000);
				})
				.catch((err) => {
					setMessage(`Error occured in creating person ${err}`);
					setHasError(true);
					setTimeout(() => {
						setMessage(null);
						setHasError(false);
					}, 5000);
					console.error("Error occured in creating the person", err);
				});
			setNewName("");
			setNewPhone("");
		}
	};

	const handleDelete = (id, name) => {
		window.confirm(`Delete ${name}?`);
		personService
			.deletePerson(id)
			.then(() => {
				const updatedPersons = persons.filter((person)=>person.id!==id);
				setPersons(updatedPersons);
				setMessage(`Deleted ${name}`);
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			})
			.catch((err) => {
				setMessage(`Error occured in deleting person, ${err}`);
				setHasError(true);
				setTimeout(() => {
					setMessage(null);
					setHasError(false);
				}, 5000);
				console.error("Error occured in deleting the person", err);
			});
	};

	const filteredPersons =
		search.length > 0
			? persons.filter((person) =>
					person.name.toLowerCase().includes(search.toLowerCase())
			  )
			: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} hasError={hasError} />
			<Filter state={search} handleSearch={handleSearch} />
			<h2>Add New</h2>
			<PersonForm
				name={newName}
				phone={newPhone}
				handleSubmit={handleSubmit}
				handleName={handleName}
				handlePhone={handlePhone}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPersons} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
