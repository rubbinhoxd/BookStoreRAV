import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Livros from "./components/Livros/index";
import Editora from "./components/Editora/index";
import Autores from "./components/Autores/index";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="App">
      <h1>BookStore RAV</h1>
      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">
            Livros
          </Nav.Link>
          <Nav.Link as={Link} to="/autores">
            Autores
          </Nav.Link>
          <Nav.Link as={Link} to="/editora">
            Editoras
          </Nav.Link>
        </Nav>

        <Routes>
          <Route path="/" index element={<Livros />}></Route>
          <Route path="/autores" index element={<Autores />}></Route>
          <Route path="/editora" index element={<Editora />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
