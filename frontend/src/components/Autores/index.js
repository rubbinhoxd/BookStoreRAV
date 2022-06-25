import React from "react";
import { Button, Table, Form } from "react-bootstrap";

export default class Autores extends React.Component {
  constructor(props) {
    super(props);
    //useState
    this.state = {
      id: 0,
      dataNasc: "",
      nome: "",
      livros: [],
      autores: [],
    };
  }

  componentDidMount() {
    //PARECIDO COM O USEREFFECT
    this.handleSearchAuthor();
  }
  //BUSCA NA API
  handleSearchAuthor = () => {
    fetch("http://localhost:8080/autor/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ autores: data });
      });
  };
  //DELETE
  handleDeleteAuthor = (id) => {
    fetch("http://localhost:8080/autor/" + id, { method: "DELETE" }).then(
      (response) => {
        if (response.ok) {
          this.handleSearchAuthor();
        }
      }
    );
  };
  //POST (CRIANDO NOVO)
  handleNewAuthor = (autor) => {
    fetch("http://localhost:8080/autor/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(autor),
    }).then((response) => {
      if (response.ok) {
        this.handleSearchAuthor();
      } else {
        alert("Não foi possível adicionar o Autor");
      }
    });
  };
  //atualizar dado da editora que ja existe no banco
  handleAuthorExisting = (autor) => {
    //debugger;
    fetch("http://localhost:8080/autor/" + autor.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(autor),
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
  handleUpdateAuthor = (id) => {
    fetch("http://localhost:8080/autor/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((autor) => {
        this.setState({
          id: autor.id,
          dataNasc: autor.dataNasc,
          nome: autor.nome,
          livros: autor.livros,
        });
      });
  };

  //atualiza nome
  handleAtualizationBook = (e) => {
    this.setState({
      livros: e.target.value,
    });
  };
  //atualiza livro
  handleAtualizationName = (e) => {
    this.setState({
      nome: e.target.value,
    });
  };

  handleAtualizationDate = (e) => {
    this.setState({
      dataNasc: e.target.value,
    });
  };
  //Salva de fato as alteraçoes no botão submit
  handleSubmitNewAuthor = () => {
    if (this.state.id === 0) {
      // console.log("if1");
      const autor = {
        dataNasc: this.state.dataNasc,
        nome: this.state.nome,
        livros: this.state.livros,
      };
      this.handleNewAuthor(autor); //adiciona um autor
    } else {
      // console.log("if2");
      const autor = {
        id: this.state.id,
        dataNasc: this.state.dataNasc,
        nome: this.state.nome,
        livros: this.state.livros,
      };
      this.handleAuthorExisting(autor); //uptade das info de uma editora ja criada
    }
  };

  reset = () => {
    this.setState({
      id: 0,
      dataNasc: "",
      nome: "",
      livros: [],
    });
  };

  renderTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Título Livros(s)</th>
            <th>Nome Autor</th>
            <th>Data de Nascimento</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.autores.map((autor) => (
            <tr>
              <td>{autor.livros}</td>
              <td>{autor.nome}</td>
              <td>{autor.dataNasc}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => this.handleUpdateAuthor(autor.id)} //atualiza
                >
                  Atualizar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.handleDeleteAuthor(autor.id)} //deleta
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
            <Form.Label>Nome do(s) Livro(s)</Form.Label>
            <Form.Control
              type="input"
              placeholder="Nome do(s) livro(s)"
              value={this.state.livros}
              onChange={this.handleAtualizationBook}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do autor"
              value={this.state.nome}
              onChange={this.handleAtualizationName}
            />
            <Form.Text className="text-muted">
              Entre com um nome válido.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdress">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Data de Nascimento"
              value={this.state.dataNasc}
              onChange={this.handleAtualizationDate}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmitNewAuthor}
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
