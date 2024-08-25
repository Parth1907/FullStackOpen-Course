import mongoose from "mongoose";
if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

const url = `mongodb+srv://kalraparth5682:${password}@cluster0.stg5tfs.mongodb.net/PhoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
// 	name: name,
// 	number: number,
// });

// person.save().then((result) => {
// 	console.log(`added ${result.name} ${result.number} to phonebook`);
// 	mongoose.connection.close();
// });

Person.find({}).then((result) => {
	console.log("phonebook: ");
	
	result.map((person) => {
		console.log(`${person.name}: ${person.number}`);
	});
	mongoose.connection.close();
});
