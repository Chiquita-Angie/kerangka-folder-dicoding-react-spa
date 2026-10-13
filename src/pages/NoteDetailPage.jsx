import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import parser from 'html-react-parser';
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  showFormattedDate,
} from '../utils/local-data';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(() => getNote(id));

  useEffect(() => {
    setNote(getNote(id));
  }, [id]);

  function handleDelete() {
    deleteNote(id);
    navigate('/');
  }

  function handleToggleArchive() {
    if (!note) return;
    if (note.archived) {
      unarchiveNote(id);
      navigate('/archives');
    } else {
      archiveNote(id);
      navigate('/');
    }
  }

  if (!note) {
    return (
      <section className="detail-page">
        <h2>Catatan tidak ditemukan</h2>
        <p>Catatan dengan ID &ldquo;{id}&rdquo; tidak ditemukan atau telah dihapus.</p>
        <Link to="/" className="detail-page__back-link">
          &larr; Kembali ke daftar catatan
        </Link>
      </section>
    );
  }

  const renderedBody =
    typeof note.body === 'string' && note.body.includes('<')
      ? parser(note.body)
      : note.body;

  return (
    <article className="detail-page">
      <Link
        to={note.archived ? '/archives' : '/'}
        className="detail-page__back-link"
      >
        &larr; Kembali ke daftar catatan
      </Link>
      <div className="detail-page__header">
        <h2 className="detail-page__title">{note.title}</h2>
      </div>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <div className="detail-page__body">{renderedBody}</div>
      <div className="detail-page__action">
        <button
          type="button"
          className="detail-page__button detail-page__button--archive"
          onClick={handleToggleArchive}
        >
          {note.archived ? 'Batal Arsip' : 'Arsipkan'}
        </button>
        <button
          type="button"
          className="detail-page__button detail-page__button--delete"
          onClick={handleDelete}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}

export default NoteDetailPage;
