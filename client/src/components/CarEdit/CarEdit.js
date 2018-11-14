import React, { Component } from 'react';
import api from '../../api/cars';
import Selector from './Selector';
import { Link } from 'react-router-dom';

export default class CarEdit extends Component {
  constructor(props) {
    super(props);

    if (this.props.car) {
      this.state = this.props.car;
    } else {
      this.state = {
        _id: null,
        brand: '',
        model: '',
        category: 'A',
        numDoors: 4,
        price: 0
      };
    }
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">
            {this.state._id ? 'Edit car' : 'New car'}
          </h1>

          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text width-10-em">Brand:</span>
            </div>
            <input
              className="form-control"
              type="string"
              value={this.state.brand}
              onChange={event => this.setState({ brand: event.target.value })}
            />
          </div>

          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text width-10-em">Model:</span>
            </div>
            <input
              className="form-control"
              type="string"
              value={this.state.model}
              onChange={event => this.setState({ model: event.target.value })}
            />
          </div>

          <Selector
            caption="Category:"
            valor={this.state.category}
            valores={['A', 'B', 'C', 'D', 'E']}
            onChange={value => this.setState({ category: value })}
          />

          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text width-10-em">Doors:</span>
            </div>
            <input
              className="form-control"
              type="number"
              min={1}
              max={8}
              value={this.state.numDoors}
              onChange={event =>
                this.setState({ numDoors: parseInt(event.target.value, 10) })
              }
            />
          </div>

          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text width-10-em">Price:</span>
            </div>
            <input
              className="form-control"
              type="number"
              min={0}
              value={this.state.price}
              onChange={event =>
                this.setState({ price: parseInt(event.target.value, 10) })
              }
            />
          </div>

          <div className="btn-group float-right btn-group-sm m-1" role="group">
            <button
              type="button"
              className="btn btn-success ml-2"
              onClick={() => this.onAccept()}
            >
              Accept
            </button>

            <Link className="btn btn-cancel btn-outline-danger" to="/">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  onAccept() {
    if (this.state._id) {
      return api
        .editCar(this.state)
        .then(() => this.returnToMain())
        .catch(err => console.error(err));
    } else {
      return api
        .createCar(this.state)
        .then(() => this.returnToMain())
        .catch(err => console.error(err));
    }
  }
  returnToMain() {
    this.props.history.push('/');
  }
}
