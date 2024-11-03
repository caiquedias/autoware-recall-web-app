import React, { Component } from "react";
import RecallDataService from "../services/recall.service";
import { withRouter } from '../common/with-router';

class Recall extends Component {
  constructor(props) {
    super(props);
    this.getRecall = this.getRecall.bind(this);

    this.state = {
      currentRecall: {
        id: null,
        recallId: null,
        chassiId: null,
        dataExecucao: null,
        concessionaria: '',
        chassi: {
          id: null,
          codigoChassi: ''
        },
        recall: {
          id: null,
          titulo: '',
          descricao: '',
          dataPublicacao: null
        }
      }
    };
  }

  componentDidMount() {
    this.getRecall(this.props.router.params.id);
  }

  getRecall(id) {
    RecallDataService.get(id)
      .then(response => {
        this.setState({
          currentRecall: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentRecall } = this.state;

    return (
      <div>
        {currentRecall ? (
          <div className="edit-form">
            <h4>Recall</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Chassi</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentRecall.chassi.codigoChassi}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Recall</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentRecall.recall.titulo}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Dasta da Publicação:</strong>
                </label>
                {currentRecall.dataPublicacao}
              </div>
            </form>
            <p>{currentRecall.recall.descricao}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Pòr favor, clique para ver mais detalhes...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Recall);