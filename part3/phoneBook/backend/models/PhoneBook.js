import mongoose from "mongoose";

const phonebookSchema = new mongoose.Schema({
	name: {type: String, minLength: 3, required: true},
	number: {
		type: String,
		minLength: 10,
		// validate: {
		// 	validator: function (v) {
		// 		return /\d{2}-\d+/.test(v);
		// 	},
		// 	message: (props) => `${props.value} is not a valid phone number`,
		// },
		required: true,
	},
});

phonebookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});
const PhoneBook = mongoose.model("PhoneBook", phonebookSchema);
export default PhoneBook;
