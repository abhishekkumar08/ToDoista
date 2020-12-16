import React, { Component } from 'react';
import axios from 'axios';
import CustomForm from './form.component';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      ddate: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          ddate: new Date(response.data.ddate)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeDueDate(date) {
    this.setState({
      ddate: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      ddate: this.state.ddate
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data))
      .then(() => window.location = '/');
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <CustomForm
        onSubmit={this.onSubmit}
        onChangeUsername={this.onChangeUsername}
        onChangeDescription={this.onChangeDescription}
        onChangeDate={this.onChangeDate}
        onChangeDueDate={this.onChangeDueDate}
        onChangeDuration={this.onChangeUsername}
        state={{
          users: this.state.users,
          username: this.state.username,
          date: this.state.date,
          ddate: this.state.ddate,
          duration: this.state.duration,
          description: this.state.description
        }}
        submitMessage={'Edit Exercise Log'}
        />
    </div>
    )
  }
}
