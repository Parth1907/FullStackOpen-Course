import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
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

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});
const Person = mongoose.model("Person", personSchema);
export default Person;
