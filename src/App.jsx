import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">Aplikasi Catatan</Link>
          </h1>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/archives" element={<ArchivedNotesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
