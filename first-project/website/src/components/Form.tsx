import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const Form = ({ setIsOpen }: any) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const insertNote = () => {
    return fetch(`http://localhost:3001/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content
      })
    })
    .then((response) => response.json())
    .then(({ success, data }) => {
      if (!success) {
        throw new Error("An error occured")
      }
      
      setIsOpen(false)
      queryClient.setQueriesData(['notes'], (old: any) => [...old, data])
    })
  }

  const mutation: any = useMutation(insertNote, {
    onSuccess: () => {
      setTitle("")
      setContent("")
    }
  })

  const closeForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsOpen(false)
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div className={`absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center}`}>
      <div className='bg-black opacity-50 absolute w-full h-full top-0 left-0' onClick={closeForm}></div>
      <form className='my-auto bg-white w-full h-3/6 items-center md:w-1/2 p-5 rounded shadow-md text-gray-800 prose relative' 
        onSubmit={handleSubmit}>
        <h2 className='text-center'>Add Note</h2>
        {mutation.isError && <span className='block mb-2 text-red-400'>{mutation.error.message ? mutation.error.message : mutation.error}</span>}
        <input type="text" placeholder='Title' className='rounded-sm w-full border px-2' 
          value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea onChange={(e) => setContent(e.target.value)} 
          className="rounded-sm w-full border px-2 mt-2" placeholder='Content' value={content}></textarea>
        <div>
          <button type="submit" className='mt-2 bg-red-400 hover:bg-red-600 text-white p-3 rounded mr-2 disabled:pointer-events-none' 
            disabled={mutation.isLoading}>
            Add</button>
          <button className='mt-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded'
            onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Form;