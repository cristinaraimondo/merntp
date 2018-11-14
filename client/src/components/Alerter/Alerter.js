import React, { Component } from 'react'
import { Alert } from 'reactstrap'


class Alerter extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: this.props.alerts.errors || [],
      oks: this.props.alerts.oks || [],
    }
  }

  componentWillReceiveProps(nextProps) {
    let newState = {}
    if (nextProps.alerts && nextProps.alerts.errors) {
      newState.errors = nextProps.alerts.errors
    }
    if (nextProps.alerts && nextProps.alerts.oks) {
      newState.oks = nextProps.alerts.oks
    }
    this.setState(newState)
  }

  render() {
    return (
      <div>
        { this.renderItemsIfNotEmpty('danger', this.state.errors, () => this.props.alerts.delErrors()) }
        { this.renderItemsIfNotEmpty('success', this.state.oks, () => this.props.alerts.delOks()) }
      </div>
    )
  }
  
  renderItemsIfNotEmpty(cls, items, onCloseFn) {
    return (
      (items.length)
      ? this.renderItems(cls, items, onCloseFn)
      : null
    )
  }

  renderItems(cls, items, onCloseFn) {
    return (
      <Alert color={cls}
        toggle={() => {
          onCloseFn()
          this.props.mainComp.refreshAlerts()
        }}
      >
        <ul>
        {
          items.map((item, idx) => {
            return (
              <li key={idx}>
                {item}
              </li>
            )
          })
        }
        </ul>
      </Alert>
    )
  }

}


export default Alerter