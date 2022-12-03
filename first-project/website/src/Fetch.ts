const fetchNotes = () => {
    return fetch('http://localhost:3001/notes')
        .then((response: any) => response.json())
        .then(({ success, data }: any) => {
            if (!success) {
                throw new Error('An error occurred while fetching notes');
            }
            return data;
        })
}

const deleteNote = (note: any) => {
    return fetch(`http://localhost:3001/notes/${note.id}`, {
        method: 'DELETE'
    }).then((response) => response.json())
        .then(({ success, message }: any) => {
            if (!success) {
                throw new Error(message);
            }

            alert(message);
        })
}

export { fetchNotes, deleteNote };
