import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation" aria-label="Navigasi utama">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            Catatan Aktif
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/archives"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Arsip
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes/new"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Tambah Catatan
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
