const formattedReturn = require('./helpers/formattedReturn')
const getNotes = require('./helpers/getNotes')
const newNote = require('./helpers/newNote')
const deleteNote = require('./helpers/deleteNote')

exports.handler = async (event) => {
	if (event.httpMethod === 'GET') {
		return await getNotes(event)
	} else if (event.httpMethod === 'POST') {
		return await newNote(event)
	} else if (event.httpMethod === 'DELETE') {
		return await deleteNote(event)
	} else {
		return formattedReturn(405, {})
	}
}
