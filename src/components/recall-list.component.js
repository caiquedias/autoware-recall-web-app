import React, { Component } from "react";
import RecallDataService from "../services/recall.service";
import Alert from 'react-bootstrap/Alert';
import { format } from "date-fns";
export default class RecallList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveRecalls = this.retrieveRecalls.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecall = this.setActiveRecall.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.setShow = this.setShow.bind(this);

    this.state = {
      recalls: [],
      currentRecall: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveRecalls();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveRecalls() {
    RecallDataService.getAll()
      .then(response => {
        this.setState({
            recalls: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRecalls();
    this.setState({
      currentRecall: null,
      currentIndex: -1
    });
  }

  setShow(_show) {
    this.setState({
      show: _show,
      searchTitle: ''
    });
    this.refreshList();
  }

  setActiveRecall(recall, index) {
    this.setState({
      currentRecall: recall,
      currentIndex: index
    });
  }

  searchTitle() {
    RecallDataService.findByChassi(this.state.searchTitle)
      .then(response => {
        this.setState({
          recalls: response.data
        });
        if(response.data.length === 0){
          this.setShow(true);
        }
        this.setActiveRecall(null);
      })
      .catch(e => {
        console.log(e);
      });
  }

  clearSearch() {
    this.setState({
      show: false,
      searchTitle: ''
    });
    this.refreshList();
  }

  render() {
    const { searchTitle, recalls, currentRecall, currentIndex, show} = this.state;

    if (show) {
      return (
        <Alert variant="info" onClose={() => this.setShow(false) } dismissible>
          <Alert.Heading>Não há Recalls para este chassi!</Alert.Heading>
        </Alert>
      );
    }else{
      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquise por Chassi"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append buttons">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Pesquisar
                </button>
              </div>
              <div className="input-group-append buttons">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.clearSearch}
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h4>Recalls</h4>

            <ul className="list-group">
              {recalls &&
                recalls.map((recall, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveRecall(recall, index)}
                    key={index}
                  >
                    {recall.chassi.codigoChassi} - {recall.recall.titulo}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-4">
            {
            currentRecall ? (
              <div>
                <h4>Recall Detalhe</h4>
                <div>
                  <label>
                    <strong>Chassi:</strong>
                  </label>{" "}
                  {currentRecall.chassi.codigoChassi}
                </div>
                <div>
                  <label>
                    <strong>Recall:</strong>
                  </label>{" "}
                  {currentRecall.recall.titulo}
                </div>
                <div>
                  <label>
                    <strong>Data de Publicação:</strong>
                  </label>{" "}
                  {format(currentRecall.recall.dataPublicacao, "dd/MM/yyyy")}
                </div>

                <div>
                  <label>
                    <strong>Descrição Recall:</strong>
                  </label>{" "}
                  {currentRecall.recall.descricao}
                </div>
                {
                  currentRecall.dataExecucao ?
                  (
                    <div>
                      <label>
                        <strong>Data de Execução:</strong>
                      </label>{" "}
                      {format(currentRecall.dataExecucao, "dd/MM/yyyy")}
                    </div>
                  ) : null
                }
                {
                  currentRecall.concessionaria ?
                  (
                    <div>
                      <label>
                        <strong>Concessionária: </strong>
                      </label>{" "}
                      {currentRecall.concessionaria}
                    </div>
                  ) : null
                }
              </div>
            ) : (
              <div>
                <br />
                <p>Clique para acessar os detalhes...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}