import mongoose from "mongoose";
if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

// const url = ;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const PhoneBook = mongoose.model("PhoneBook", phonebookSchema);

const phoneBook = new PhoneBook({
	name: name,
	number: number,
});

// PhoneBook.save().then((result) => {
// 	console.log(`added ${name} ${number} to phonebook`);
// 	mongoose.connection.close();
// });

// PhoneBook.find({}).then((result) => {
// 	console.log("phonebook: ");
	
// 	result.map((phonebook) => {
// 		console.log(`${phonebook.name}: ${phonebook.number}`);
// 	});
// 	mongoose.connection.close();
// });
