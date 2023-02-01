const express = require("express");
const app = express();

app.use(express.json());

let phonebook = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const generateId = () => {
	return Math.floor(Math.random() * (500 - 5) + 5);
};

// Return phonebook
app.get("/api/persons", (request, response) => {
	response.json(phonebook);
});

// Return info of a single person
app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = phonebook.find((person) => person.id === id);

	person ? response.json(person) : response.status(404).end();
});

// Add a person to phonebook
app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "Name is missing",
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: "Number is missing",
		});
	}

	const exists = phonebook.some((person) => person.name.includes(body.name));

	if (exists) {
		return response.status(400).json({
			error: "Name already exists in phonebook",
		});
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	phonebook = phonebook.concat(person);
	response.json(person);
});

// Delete a person from phonebook
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	phonebook = phonebook.filter((person) => person.id === id);
	response.status(204).end();
});

// Return info about phonebook
app.get("/api/persons/info", (request, response) => {
	response.send(`
        <p>Phonebook has ${phonebook.length} entries</p>
        <p>${new Date()}</p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
