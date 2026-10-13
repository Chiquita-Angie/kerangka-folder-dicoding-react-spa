import { useState } from 'react';

function NoteInput({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function handleBodyInput(event) {
    setBody(event.currentTarget.innerHTML);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const plainTextBody = body.replace(/<[^>]*>/g, '').trim();

    if (!trimmedTitle || (!plainTextBody && !body.trim())) {
      return;
    }

    onSubmit({
      title: trimmedTitle,
      body: body.trim(),
    });

    setTitle('');
    setBody('');
  }

  return (
    <form className="add-new-page__input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-new-page__input__title"
        placeholder="Judul catatan..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <div
        className="add-new-page__input__body"
        data-placeholder="Tuliskan isi catatan..."
        contentEditable
        onInput={handleBodyInput}
        aria-label="Isi catatan"
      />
      <div className="add-new-page__action">
        <button type="submit" className="add-new-page__submit-btn">
          Simpan Catatan
        </button>
      </div>
    </form>
  );
}

export default NoteInput;
