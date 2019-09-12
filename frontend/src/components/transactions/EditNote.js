import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import 'bulma'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const customStyles = {
  content: {
    width: '25%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class EditNote extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        transactions: []
      },
      error: '',
      modalIsOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }


  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData })
    console.log(e.target.value)
  }



  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/counterparties/${this.props.match.params.id}/`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({
        counterparty: res.data, formData: { content: '' }}))
    toast.warning('Your note has been changed!')
      .catch(err => this.setState({ errors: err.response.data }))
  }

  componentDidMount() {
    axios.get(`/api/counterparties/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))

  }


  render() {
    console.log(this.state)

    return (
      <section className="section showcounterparty">
        {Auth.isAuthenticated() && <div className="media-right" onClick={this.openModal}>
          <button className="delete"></button>
        </div>}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
        >


          <button className="closeModal is-warning" onClick={this.closeModal}>☓</button>
          <div className="container">

            <form onSubmit={this.handleSubmit}>



              <div className="field note-field">
                <label className="label">Edit Note</label>
                <textarea
                  className="textarea"
                  name="note"
                  placeholder="eg: This company pays on time."
                  value={(this.state.formData.note)}
                  onChange={this.handleChange}
                />
              </div>


              <button className="button is-danger">Submit</button>
            </form>

          </div>



        </Modal>

      </section>
    )
  }
}

export default withRouter(EditNote)
