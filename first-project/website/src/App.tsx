import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import './App.css';
import { PlusIcon } from '@heroicons/react/24/solid';
import Form from './components/Form';
import { deleteNote, fetchNotes } from './Fetch';
import Modal from './components/Modal';

const App = () => {
  const { data, error, isLoading, isError }: any = useQuery(['notes'], fetchNotes);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation: any = useMutation(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries(['notes'])
  })

  const addNewNote = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-red-400 flex flex-col justify-center items-center">
      <div className='bg-white w-full md:w-1/2 p-5 text-center rounded shadow-md text-gray-800 prose'>
        <h1>Notes</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <span className='text-red'>{error.message ? error.message : error}</span>}
        {!isLoading && !isError && data && !data.length && <span className='text-red-400'>You have no notes</span>}
        {data && data.length > 0 && data.map((note: any, index: number) => (
          <div key={note.id} className={`text-left ${index !== data.length - 1 ? 'border-b pb-2' : ''}`}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <span>
              <button className='link text-gray-400' onClick={() => mutation.mutate(note)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
      <button className="mt-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white p-3" onClick={addNewNote}>
        <PlusIcon className='w-5 h-5'></PlusIcon>
      </button>
      <Modal open={isOpen} >
        <Form setIsOpen={handleClose}/>
      </Modal>
    </div>
  );
}

export default App;
