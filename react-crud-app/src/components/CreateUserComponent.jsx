import React, { Component } from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            id: this.props.match.params.id,
            firstName: '',
            description: '',
            email: '',
            password: '',
            errorMessage: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount() {
       
        if (this.state.id === '_add') {
            return
        } else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({
                    firstName: user.firstName,
                    description: user.description,
                    email: user.email,
                    password: user.password
                });
            });
        }
    }
    
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        
        let user = { firstName: this.state.firstName, 
            description: this.state.description, email: this.state.email, password: this.state.password};
        console.log('user => ' + JSON.stringify(user));
     
        if (this.state.id === '_add') {
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            },err => this.setState({errorMessage: err.message}));
        } else {
            UserService.updateUser(user, this.state.id).then(res => {
                this.props.history.push('/users');
            },err => this.setState({errorMessage: err.message}));
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changedescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    changePasswordHandler(event) {  // New handler for password input
        this.setState({ password: event.target.value });
    }

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add User</h3>
        } else {
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> description: </label>
                                        <input placeholder="description" name="description" className="form-control"
                                            value={this.state.description} onChange={this.changedescriptionHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <div>
                                        <label> Password: </label>
                                        <input type="password" placeholder="Password" name="password" className="form-control"
                                            value={this.state.password} onChange={this.changePasswordHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    
                                    { this.state.errorMessage &&
                                    <h5 className="alert alert-danger"> 
                                    { this.state.errorMessage } </h5> }
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateUserComponent
