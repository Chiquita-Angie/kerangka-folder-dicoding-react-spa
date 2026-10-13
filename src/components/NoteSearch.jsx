import { useSearchParams } from 'react-router-dom';

function NoteSearch({ keyword: propKeyword, onKeywordChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKeyword =
    propKeyword !== undefined
      ? propKeyword
      : searchParams.get('keyword') || '';

  function handleChange(event) {
    const nextKeyword = event.target.value;
    if (onKeywordChange) {
      onKeywordChange(nextKeyword);
    } else {
      const nextParams = new URLSearchParams(searchParams);
      if (nextKeyword) {
        nextParams.set('keyword', nextKeyword);
      } else {
        nextParams.delete('keyword');
      }
      setSearchParams(nextParams);
    }
  }

  return (
    <div className="note-search">
      <input
        type="text"
        placeholder="Cari berdasarkan judul..."
        value={currentKeyword}
        onChange={handleChange}
        aria-label="Cari catatan berdasarkan judul"
      />
    </div>
  );
}

export default NoteSearch;
