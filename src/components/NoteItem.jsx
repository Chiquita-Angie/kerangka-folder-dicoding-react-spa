import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils/local-data';

function NoteItem({
  id,
  title,
  createdAt,
  body,
  archived,
  note,
  onDelete,
  onArchive,
  showArchiveAction = true,
}) {
  const noteId = id || note?.id;
  const noteTitle = title !== undefined ? title : note?.title;
  const noteCreatedAt = createdAt || note?.createdAt;
  const noteBody = body !== undefined ? body : note?.body;
  const noteArchived = archived !== undefined ? archived : note?.archived;

  const renderedBody =
    typeof noteBody === 'string' && noteBody.includes('<')
      ? parser(noteBody)
      : noteBody;

  return (
    <article className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">
          <Link to={`/notes/${noteId}`}>{noteTitle}</Link>
        </h3>
        <p className="note-item__createdAt">
          {showFormattedDate(noteCreatedAt)}
        </p>
        <div className="note-item__body">{renderedBody}</div>
      </div>
      {(onDelete || onArchive) && (
        <div className="note-item__action">
          {onArchive && showArchiveAction && (
            <button
              type="button"
              className="note-item__archive-button"
              onClick={(e) => {
                e.stopPropagation();
                onArchive(noteId);
              }}
            >
              {noteArchived ? 'Batal Arsip' : 'Arsipkan'}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="note-item__delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(noteId);
              }}
            >
              Hapus
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default NoteItem;
