import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/local-data';

function AddNotePage() {
  const navigate = useNavigate();

  function handleAddNote(noteData) {
    addNote(noteData);
    navigate('/');
  }

  return (
    <section className="add-new-page">
      <h2>Tambah Catatan</h2>
      <NoteInput onSubmit={handleAddNote} />
    </section>
  );
}

export default AddNotePage;
