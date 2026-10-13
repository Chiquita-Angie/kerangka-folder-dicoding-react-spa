import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteSearch from '../components/NoteSearch';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';

function ArchivedNotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [notes, setNotes] = useState(() => getArchivedNotes());

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
    setNotes(getArchivedNotes());
  }

  function handleUnarchive(id) {
    unarchiveNote(id);
    setNotes(getArchivedNotes());
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <section className="archives-page">
      <h2>Catatan Arsip</h2>
      <NoteSearch
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
      />
      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleUnarchive}
        emptyMessage="Arsip kosong"
      />
    </section>
  );
}

export default ArchivedNotesPage;
