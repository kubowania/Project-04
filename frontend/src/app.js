import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  componentDidMount() {
    axios.get('api/transactions/')
      .then(res => console.log(res.data))
  }
  render() {
    return (
      <h2>Hello!</h2>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
