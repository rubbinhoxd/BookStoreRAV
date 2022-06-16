import React from "react";
import { Button, Table, Form } from "react-bootstrap";

export default class Livros extends React.Component {
  constructor(props) {
    super(props);
    //useState
    this.state = {
      autores: [],
      titulo: "",
      numPaginas: 0,
      idioma: "",
      id: 0,
      livros: [],
    };
  }
  //json-server --watch db.json

  componentDidMount() {
    //PARECIDO COM O USEREFFECT
    this.handleSearchAuthor();
  }
  //BUSCA NA API
  handleSearchAuthor = () => {
    fetch("http://localhost:3000/livros/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ livros: data });
      });
  };
  //DELETE
  handleDeleteBook = (id) => {
    fetch("http://localhost:3000/livros/" + id, { method: "DELETE" }).then(
      (response) => {
        if (response.ok) {
          this.handleSearchAuthor();
        }
      }
    );
  };
  //POST (CRIANDO NOVO)
  handleNewBook = (livro) => {
    fetch("http://localhost:3000/livros/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livro),
    }).then((response) => {
      if (response.ok) {
        this.handleSearchAuthor();
      } else {
        alert("Não foi possível adicionar o Autor");
      }
    });
  };
  //atualizar dado da editora que ja existe no banco
  handleBookExisting = (livro) => {
    //debugger;
    fetch("http://localhost:3000/livros/" + livro.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livro),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        this.handleSearchAuthor();
      } else {
        alert("Não foi possível atualizar os dados do Autor");
      }
    });
  };

  //get (UPTADE DO QUE JA EXISTE)
  handleUpdateBook = (id) => {
    fetch("http://localhost:3000/livros/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((livro) => {
        this.setState({
          autores: livro.autores,
          titulo: livro.titulo,
          numPaginas: livro.numPaginas,
          idioma: livro.idioma,
          id: livro.id,
        });
      });
  };

  //atualiza autores
  handleAtualizationAuthor = (e) => {
    this.setState({
      autores: e.target.value,
    });
  };
  //atualiza titulo livro
  handleAtualizationTitle = (e) => {
    this.setState({
      titulo: e.target.value,
    });
  };

  handleAtualizationNumPages = (e) => {
    this.setState({
      numPaginas: e.target.value,
    });
  };

  handleAtualizationLanguage = (e) => {
    this.setState({
      idioma: e.target.value,
    });
  };
  //Salva de fato as alteraçoes no botão submit
  handleSubmitNewBook = () => {
    if (this.state.id === 0) {
      // console.log("if1");
      const livro = {
        autores: this.state.autores,
        titulo: this.state.titulo,
        numPaginas: this.state.numPaginas,
        idioma: this.state.idioma,
      };
      this.handleNewBook(livro); //adiciona um autor
    } else {
      // console.log("if2");
      const livro = {
        autores: this.state.autores,
        titulo: this.state.titulo,
        numPaginas: this.state.numPaginas,
        idioma: this.state.idioma,
        id: this.state.id,
      };
      this.handleBookExisting(livro); //uptade das info de uma editora ja criada
    }
  };
  reset = () => {
    this.setState({
      autores: [],
      titulo: "",
      numPaginas: 0,
      idioma: "",
      id: 0,
    });
  };

  renderTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Título Livros(s)</th>
            <th>Nome Autor</th>
            <th>Nº de páginas</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.livros.map((livro) => (
            <tr>
              <td>{livro.autores}</td>
              <td>{livro.titulo}</td>
              <td>{livro.numPaginas}</td>
              <td>{livro.idioma}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => this.handleUpdateBook(livro.id)} //atualiza
                >
                  Atualizar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.handleDeleteBook(livro.id)} //deleta
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome do(s) Autor(es)</Form.Label>
            <Form.Control
              type="input"
              placeholder="Nome Autor"
              value={this.state.autores}
              onChange={this.handleAtualizationAuthor}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título do Livro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título"
              value={this.state.titulo}
              onChange={this.handleAtualizationTitle}
            />
            <Form.Text className="text-muted">
              Entre com um nome válido.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdress">
            <Form.Label>Número de Páginas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nº de páginas"
              value={this.state.numPaginas}
              onChange={this.handleAtualizationNumPages}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdress">
            <Form.Label>Idioma</Form.Label>
            <Form.Control
              type="text"
              placeholder="Idioma"
              value={this.state.idioma}
              onChange={this.handleAtualizationLanguage}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmitNewBook}
          >
            Salvar
          </Button>
          <Button variant="warning" type="submit" onClick={this.reset}>
            Novo
          </Button>
        </Form>

        {this.renderTable()}
      </div>
    );
  }
}
