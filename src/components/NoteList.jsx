import NoteItem from './NoteItem';

function NoteList({
  notes = [],
  onDelete,
  onArchive,
  emptyMessage = 'Tidak ada catatan',
}) {
  if (notes.length === 0) {
    return <p className="notes-list__empty-message">{emptyMessage}</p>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

export default NoteList;
