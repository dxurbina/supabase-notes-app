"use client";
import { getNotes, addNote, updateNote, deleteNote } from '../utils/request';
import { useEffect, useState } from 'react'

export default function NoteList({ session }: { session: any }) {
  const [Notes, setNotes] = useState<any[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [errorText, setErrorText] = useState('')
 const user = session;
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes(user.id)
      setNotes(notes)
    }

    fetchNotes()
  }, [])

  const addTodo = async (taskText: string) => {
    let note = taskText.trim()
    if (note.length) {
      const result = await addNote(user.id, note);

      if (!result.length) {
        setNotes([...Notes, result])
        setNewTaskText('')
      } 
    }
  }

  const deleteTodo = async (id: number) => {
    await deleteNote(id);
    setNotes(Notes.filter((x) => x.id != id))
  }

  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(newTaskText)
        }}
        className="flex gap-2 my-2"
      >
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setErrorText('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black bg-slate-500" type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-gray shadow overflow-hidden rounded-md">
        <ul>
          {Notes.map((todo) => (
            <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Todo = ({ todo, onDelete }: { todo: any; onDelete: () => void }) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete)

  const toggle = async () => {
    const upd = await updateNote(todo)
  }

  return (
    <li className="w-full bg-slate-500 block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">{todo.note}</div>
        </div>
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            //checked={isCompleted ? true : false}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)