const { table } = require('./airtable')
const formattedReturn = require('./formattedReturn')

module.exports = async (event) => {
	try {
		const notes = await table.select().firstPage()
		const formattedNotes = notes.map((note) => ({
			id: note.id,
			...note.fields,
		}))
		return formattedReturn(200, formattedNotes)
	} catch (err) {
		console.error(err)
		return formattedReturn(500, {})
	}
}
