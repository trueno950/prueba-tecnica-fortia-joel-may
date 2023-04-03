import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Favorites from "./components/Favorites";

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4 mb-8">
          <ul className="flex justify-between">
            <li>
              <Link to="/" className="text-white font-bold">
                Buscar
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-white font-bold">
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
