import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './CarBrowse.css';
import api from '../../api/api';
import FilaCar from './FilaCar';
import EditionCar from './EditionCar';
import { Link } from 'react-router-dom';

class CarBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      cars: [],
      brand: '',
      model: '',
      category: '',
      price: 0,
      numDoors: 0,
      agregarCar: false,
      modificarCar: null, //Lo dejamos preparado para modificaciones
      borrarCar: null
    };
  }
  componentDidMount() {
    this.updateCantCars();
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div>
            <Table dark>
              <thead>
                <tr>
                  <th scope="col">Brand</th>
                  <th scope="col">Model</th>
                  <th scope="col">Category</th>
                  <th scope="col">Number doors</th>
                  <th scope="col">&nbsp;&nbsp;Price </th>
                  <th scope="col"> &nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cars.map((car, idx) => (
                  <FilaCar
                    key={idx}
                    car={car}
                    onBorrar={() => this.onBorrar(car)}
                    onModificar={() => this.onModificar(car)}
                    onAgregar={() => this.onAgregar()}
                  />
                ))}
              </tbody>
            </Table>
            <Link to="/NewCar" className="link">
              New Car
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          {this.state.modificarCar ? (
            <EditionCar
              _id={this.state.modificarCar._id}
              brand={this.state.modificarCar.brand}
              model={this.state.modificarCar.model}
              category={this.state.modificarCar.category}
              price={this.state.modificarCar.price}
              numDoors={this.state.modificarCar.numDoors}
              onAceptarModificar={car => this.onAceptarModificar(car)}
            />
          ) : this.state.agregarCar ? (
            <EditionCar
              brand={this.state.brand}
              model={this.state.model}
              category={this.state.category}
              price={this.state.price}
              numDoors={this.state.numDoors}
              onAceptarAgregar={car => this.onAceptarAgregar(car)}
              // onAceptarModificar={car => this.onAceptarModificar(car)}
            />
          ) : null}
        </div>
      </div>
    );
  }

  //llamadas a la api

  onBorrar(car) {
    api
      .deleteCar(car._id)
      .then(() => {
        this.updateCantCars();
      })
      .catch(err => console.log(err));
  }

  onModificar(car) {
    this.state.modificarCar
      ? this.setState({ modificarCar: null })
      : this.setState({ modificarCar: car });
  }

  updateCantCars() {
    api
      .getCars()
      .then(cars => this.setState({ cars }))
      .catch(err => console.log(err));
  }

  onAceptarModificar(car) {
    this.setState({
      modificarCar: null
    });
    return api
      .modifyCar(car._id, car)
      .then(() => {
        this.updateCantCars();
        api.addCar(car._id, car);
      })
      .catch(err => {
        console.log(err);
      });
  }

  onAgregar() {
    this.state.agregarCar
      ? this.setState({ agregarCar: null })
      : this.setState({ agregarCar: true });
  }
  onAceptarAgregar(car) {
    api
      .addCar(car)
      .then(res => {
        this.updateCantCars();
      })
      .catch(err => this.alertarError(err));
    this.setState({ agregarCar: null });
  }
}

export default CarBrowse;
