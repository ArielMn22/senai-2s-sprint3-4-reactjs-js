import React, { Component } from "react";
import Rodape from "../../components/Rodape";
import logo from "../../assets/img/icon-login.png";

class TiposEventos extends Component {
  constructor() {
    super();

    this.state = {
      lista: [],
      nome: ""
    };

    this.atualizaEstadoNome = this.atualizaEstadoNome.bind(this);
    this.cadastrarTipoEvento = this.cadastrarTipoEvento.bind(this);
  }

  buscarTiposEventos(event) {
    fetch("http://192.168.4.112:5000/api/tiposeventos")
      .then(resposta => resposta.json())
      .then(data => this.setState({ lista: data }))
      .catch(erro => console.log(erro));
  }

  componentDidMount() {
    this.buscarTiposEventos();
  }

  atualizaEstadoNome(event) {
    this.setState({ nome: event.target.value });
  }

  cadastrarTipoEvento(event) {
    event.preventDefault();

    fetch("http://192.168.4.112:5000/api/tiposeventos", {
      method: "POST",
      body: JSON.stringify({ nome: this.state.nome }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response)
      .then(this.buscarTiposEventos())
      .catch(erro => console.log(erro));
  }

  render() {
    return (
      <div>
        <header className="cabecalhoPrincipal">
          <div className="container">
            <img src={logo} />

            <nav className="cabecalhoPrincipal-nav">Administrador</nav>
          </div>
        </header>

        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
            <h1 className="conteudoPrincipal-cadastro-titulo">
              Tipos de Eventos
            </h1>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                  </tr>
                </thead>

                <tbody id="tabela-lista-corpo">
                  {this.state.lista.map(function(tipoevento) {
                    return (
                      <tr key={tipoevento.id}>
                        <td key={tipoevento.id.toString()}>{tipoevento.id}</td>
                        <td>{tipoevento.nome}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Tipo de Evento
              </h2>
              <form onSubmit={this.cadastrarTipoEvento}>
                <div className="container">
                  <input
                    type="text"
                    value={this.state.nome}
                    onChange={this.atualizaEstadoNome}
                    id="nome-tipo-evento"
                    placeholder="tipo do evento"
                  />
                  <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>

        <Rodape />
      </div>
    );
  }
}

export default TiposEventos;