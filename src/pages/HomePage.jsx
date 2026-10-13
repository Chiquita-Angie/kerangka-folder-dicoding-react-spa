import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteSearch from '../components/NoteSearch';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [notes, setNotes] = useState(() => getActiveNotes());

  function handleKeywordChange(newKeyword) {
    const nextParams = new URLSearchParams(searchParams);
    if (newKeyword.trim()) {
      nextParams.set('keyword', newKeyword);
    } else {
      nextParams.delete('keyword');
    }
    setSearchParams(nextParams);
  }

  function handleDelete(id) {
    deleteNote(id);
    setNotes(getActiveNotes());
  }

  function handleArchive(id) {
    archiveNote(id);
    setNotes(getActiveNotes());
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      <NoteSearch
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
      />
      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleArchive}
        emptyMessage="Tidak ada catatan"
      />
    </section>
  );
}

export default HomePage;
