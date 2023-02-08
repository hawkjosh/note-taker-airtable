import React, { Fragment, useEffect, useState } from 'react'

import './App.css'

import CustomInput from './components/CustomInput.jsx'
import CustomTextarea from './components/CustomTextarea.jsx'

import PencilIcon from './components/page-icons/PencilIcon.jsx'
import SaveIcon from './components/page-icons/SaveIcon.jsx'
import PlusIcon from './components/page-icons/PlusIcon.jsx'
import TrashIcon from './components/page-icons/TrashIcon.jsx'

export default () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	// const [data, setData] = useState([])
	const [selectedNote, setSelectedNote] = useState({})

	const [notes, setNotes] = useState([])

	const loadNotes = async () => {
		try {
			const res = await fetch('/.netlify/functions/notes')
			const notes = await res.json()
			setNotes(notes)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		loadNotes()
	}, [])

	// useEffect(() => {
	// 	const getNotes = async () => {
	// 		const response = await fetch('/api/notes/get')
	// 		const newData = await response.json()
	// 		setData(newData)
	// 	}
	// 	getNotes()
	// }, [])

	const handleNoteClick = (note) => {
		setSelectedNote(note)
	}

	const resetNote = () => {
		setSelectedNote({})
		setTitle('')
		setText('')
	}

	const saveNote = async () => {
		try {
			await fetch('/.netlify/functions/notes', {
				method: 'POST',
				body: JSON.stringify({
					title,
					text
				})
			})
			resetNote()
			loadNotes()
		} catch (err) {
			console.error(err)
		}
	}

	// const saveNote = (newNote) =>
	// 	fetch(`/api/notes/post`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(newNote),
	// 	}).then(async () => {
	// 		const response = await fetch('/api/notes/get')
	// 		const updatedData = await response.json()
	// 		setData(updatedData)
	// 	})

	// const handleSaveNote = () => {
	// 	const newNote = {
	// 		title: title,
	// 		text: text,
	// 	}
	// 	saveNote(newNote)
	// 	setSelectedNote({})
	// 	setTitle('')
	// 	setText('')
	// }

	const deleteNote = async () => {
		try {
			await fetch('/.netlify/functions/notes', {
				method: 'DELETE',
				body: JSON.stringify({ id: notes.id })
			})
			loadNotes()
		} catch (err) {
			console.error(err)
		}
	}

	// const deleteNote = (noteId) =>
	// 	fetch(`/api/notes/delete/${noteId}`, {
	// 		method: 'DELETE',
	// 	}).then(async () => {
	// 		const response = await fetch('/api/notes/get')
	// 		const updatedData = await response.json()
	// 		setData(updatedData)
	// 	}, setSelectedNote({}))

	return (
		<>
			<div className='navbar'>
				<div className='navbar-title-container'>
					<PencilIcon iconSize='clamp(2.5rem, 1.721rem + 2.913vw, 4.75rem)' />
					<div className='navbar-title'>Note Taker</div>
					<div className='navbar-subtitle'>Take notes with Airtable</div>
				</div>

				<div className='navbar-icons'>
					<SaveIcon
						className={
							!title.trim() || !text.trim()
								? 'save-note-hide'
								: 'save-note-show'
						}
						iconSize='clamp(1.5rem, 0.894rem + 2.265vw, 3.25rem)'
						iconColor='white'
						onClick={saveNote}
					/>
					<PlusIcon
						className='new-note'
						iconSize='clamp(1.5rem, 0.894rem + 2.265vw, 3.25rem)'
						iconColor='white'
						onClick={resetNote}
					/>
				</div>
			</div>

			<div className='notes-page-wrapper'>
				<div className='notes-list-container'>
					{notes.map((note, index) => (
						<Fragment key={index}>
							<div className='notes-list-item'>
								<div
									className='notes-list-item-title'
									data-status={note === selectedNote ? 'active' : 'inactive'}
									onClick={() => {
										handleNoteClick(note)
									}}>
									{note.title}
								</div>
								<TrashIcon
									iconSize='clamp(1.25rem, 1.077rem + 0.647vw, 1.75rem)'
									iconColor='slategray'
									onClick={() => {
										deleteNote(note.id)
									}}
								/>
							</div>
						</Fragment>
					))}
				</div>

				<div className='new-note-container'>
					<CustomInput
						className='new-note-title'
						type='text'
						value={selectedNote.title ? selectedNote.title : title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Note Title'
					/>
					<CustomTextarea
						className='new-note-text'
						value={selectedNote.title ? selectedNote.text : text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Note Text'
					/>
				</div>
			</div>
		</>
	)
}
