import React from "react";
import { Button, Table, Form } from "react-bootstrap";

export default class Editora extends React.Component {
  constructor(props) {
    super(props);
    //useState
    this.state = {
      nome: "",
      endereco: "",
      id: 0,
      editoras: [],
    };
  }

  componentDidMount() {
    //PARECIDO COM O USEREFFECT
    this.handleSearchPublish();
  }
  //GET
  handleSearchPublish = () => {
    fetch("http://localhost:3000/editora/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ editoras: data });
      });
  };
  //DELETE
  handleDeletePublish = (id) => {
    fetch("http://localhost:3000/editora/" + id, { method: "DELETE" }).then(
      (response) => {
        if (response.ok) {
          this.handleSearchPublish();
        }
      }
    );
  };
  //POST (CRIANDO NOVO)
  handleNewPublish = (editora) => {
    fetch("http://localhost:3000/editora/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editora),
    }).then((response) => {
      if (response.ok) {
        this.handleSearchPublish();
      } else {
        alert("Não foi possível adicionar a Editora");
      }
    });
  };
  //atualizar dado da editora que ja existe no banco
  handlePublishExisting = (editora) => {
    debugger;
    fetch("http://localhost:3000/editora/" + editora.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editora),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        this.handleSearchPublish();
      } else {
        alert("Não foi possível atualizar os dados da  Editora");
      }
    });
  };

  //get (UPTADE DO QUE JA EXISTE)
  handleUpdatePublish = (id) => {
    fetch("http://localhost:3000/editora/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((editora) => {
        this.setState({
          nome: editora.nome,
          endereco: editora.endereco,
          id: editora.id,
        });
      });
  };

  //atualiza nome
  handleAtualizationName = (e) => {
    this.setState({
      nome: e.target.value,
    });
  };
  //atualiza endereco
  handleAtualizationAdress = (e) => {
    this.setState({
      endereco: e.target.value,
    });
  };
  //Salva de fato as alteraçoes no botão submit
  handleSubmitNewPublish = () => {
    if (this.state.id === 0) {
      console.log("if1");
      const editora = {
        nome: this.state.nome,
        endereco: this.state.endereco,
      };
      this.handleNewPublish(editora); //adiciona uma editora
    } else {
      console.log("if2");
      const editora = {
        nome: this.state.nome,
        endereco: this.state.endereco,
        id: this.state.id,
      };
      this.handlePublishExisting(editora); //uptade das info de uma editora ja criada
    }
  };
  reset = () => {
    this.setState({
      nome: "",
      endereco: "",
      id: 0,
    });
  };

  renderTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.editoras.map((editora) => (
            <tr>
              <td>{editora.nome}</td>
              <td>{editora.endereco}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => this.handleUpdatePublish(editora.id)} //atualiza
                >
                  Atualizar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.handleDeletePublish(editora.id)} //deleta
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
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="input"
              placeholder="Nome da editora"
              value={this.state.nome}
              onChange={this.handleAtualizationName}
            />
            <Form.Text className="text-muted">
              Entre com um nome válido.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdress">
            <Form.Label>Endereço da Editora</Form.Label>
            <Form.Control
              type="input"
              placeholder="Endereço"
              value={this.state.endereco}
              onChange={this.handleAtualizationAdress}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmitNewPublish}
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
