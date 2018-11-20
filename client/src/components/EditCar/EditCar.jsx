import React, { Component } from 'react';

import { Button } from 'reactstrap';

const bootbox = require("bootbox");
const axios = require('axios');

class EditCar extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state

  }

  // componentDidMount(auto){
  //   axios
  //   .get("/api/cars/" + auto._id)
  //     .then(function(response) {
  //        this.setState({
  //        brand: response.data.brand,
  //        model: response.data.model,
  //        category: response.data.category,
  //        nroDoors: response.data.nroDoors,
  //        price: response.data.price

  //     })
  //     .catch(function(error) {
  //       console.log("Error, no se encontro : ", error);
  //     });
  //   })  
  // }


  modificaAuto(auto) {

    //   // let self = this;
    this.setState = {
      brand: this.state.brand,
      model: this.state.model,
      category: this.state.category,
      nroDoors: this.state.nroDoors,
      price: this.state.price
    };

    let self = this;

    return axios
      .put('/api/cars/' + auto.state._id, {
        brand: this.state.brand,
        model: this.state.model,
        category: this.state.category,
        nroDoors: this.state.nroDoors,
        price: this.state.price
      })
      .then(function (response) {
        console.log("Se modifico el Auto");
        self.props.history.push("/CarBrowse");
      })
      .catch(Error)
    // console.log("Error no se pudo agregar");

  }

  render() {
    return (
      <div className="container">
        <div className="card border=2 card border=2 shadow p-4 mb-4 bg-dark">
          <div className="card bg-dark text-white">
            <h3 className="card-title">
              Modificar Auto
            </h3>
          </div>
          <div className="container recuadroPantalla card bg-dark text-white">
            <React.Fragment>
              <div className="form-group">
                <label htmlFor="marca"> Marca </label>
                <input type="text" className="form-control" id="marca"
                  placeholder="ingrese la Marca del Auto"
                  value={this.state.brand}
                  onChange={(event) => this.setState({ brand: event.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modelo"> Modelo </label>
                <input type="text" className="form-control" id="modelo"
                  placeholder="ingrese el modelo"
                  value={this.state.model}
                  onChange={(event) => this.setState({ model: event.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoria"> Categoria </label>
                <input type="text" className="form-control" id="categoria"
                  placeholder="ingrese la categoría"
                  value={this.state.category}
                  onChange={(event) => this.setState({ category: event.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ctdadPtas"> Ctdad Puertas </label>
                <input type="text" className="form-control" id="ctdadPtas"
                  placeholder="ingrese la ctdad de puertas"
                  value={this.state.nroDoors}
                  onChange={(event) => this.setState({ nroDoors: event.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price"> Precio </label>
                <input type="text" className="form-control" id="price"
                  placeholder="ingrese el precio"
                  value={this.state.price}
                  onChange={(event) => this.setState({ price: event.target.value })}
                />
              </div>
            </React.Fragment>
          </div>
          <div className="Action-Buttons bg-dark ">
            <Button className="btn btn-danger"
              style={{ marginRight: "12px", marginTop: "8px", marginBottom: "10px" }}
              onClick={ () => this.props.history.push("/CarBrowse")}
            >
              <span className="fa fa-close"> Cancelar </span>
            </Button>
            <Button className="btn btn-success"
              style={{ marginRight: "12px", marginTop: "8px", marginBottom: "10px" }}
              onClick={() => this.confirmar()}
            >
              <span className="fa fa-check-circle"> Aceptar </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  confirmar() {
    let self = this;
    bootbox.dialog({
      message: "confirma los datos ",
      buttons: {
        cancel: {
          label: 'No',
          className: 'btn-danger',
          callback: result => { }
        },
        confirm: {
          label: 'Si',
          className: 'btn-success',
          callback: result => self.modificaAuto(self)
        }
      }
    });
  }

  limpiar() {
    this.setState({
      brand: '',
      model: '',
      category: '',
      nroDoors: '',
      price: ''
    });
  }
}

export default EditCar;