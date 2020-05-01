import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            age: '',
            sport: '',
            users: [],
            _id: ''
            
        };
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    addUser(e) {    
        if(this.state._id){
            fetch(`/user/${this.state._id}`,{        
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: "User Uploded"})
                this.setState({name: '', lastName: '', age: '', sport: '', _id: ''})
                this.fetchUsers();
                
            })
            

        } else {
            fetch('/user', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'User Saved'})
                this.setState({name: '', lastName: '', age: '', sport: ''})
                this.fetchUsers();
            })
            .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers(sort){
        
        if(sort){
            fetch(`/user?${sort}`)
            .then(res => res.json())
            .then(data => {
                this.setState({users: data.usuarios});
                console.log(this.state.users);
            })
        } else {
        fetch('/user')
            .then(res => res.json())
            .then(data => {
                this.setState({users: data.usuarios});
                console.log(this.state.users);
            })
        }
    }

    deleteUser(id){
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/user/${id}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'User Deleted'});
                this.fetchUsers();
            });
        }
    }

    editUser(id){
        fetch(`/user/${id}`)
            .then(res => res.json())
            .then(data => {
                let users = data.usuarioDB
                console.log(users)
                this.setState({
                    name: users.name,
                    lastName: users.lastName,
                    age: users.age,
                    sport: users.sport,
                    _id: users._id

                })
            })
    }
    handleChange(e){
       const { name, value} = e.target;
        this.setState({
            [name]: value
        }) 
    }

   

    render() {
        return(
            <div>
                {/* Navigation */}
                <nav className="#26a69a teal lighten-1">
                    <div className="container">
                        <a className="brand-logo" href="/"> Comono </a>
                    </div>
                </nav>
                <div className="container">
                    <div className= "row">
                        <div className="col s3">
                            <div className="card">
                                <div className= "card-content">
                                    <form onSubmit= {this.addUser}>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="name"  onChange={this.handleChange} type="text" placeholder="Name" value={this.state.name}/> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="lastName" onChange={this.handleChange} type="text" placeholder="Last Name" value={this.state.lastName}/> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="age" onChange={this.handleChange} type="number" placeholder="Age" value={this.state.age}/> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="sport" onChange={this.handleChange} type="text" placeholder="Sport" value={this.state.sport}/> 
                                            </div>
                                        </div>
                                        <button type="submit" className="#004d40 btn teal darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table className="striped" >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Sport</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map( user => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.age}</td>
                                                    <td>{user.sport}</td>
                                                    <td>
                                                        <button className="#004d40 btn teal darken-4" onClick={() => this.editUser(user._id)} style={{margin: '4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="#e53935 btn red darken-1" onClick={() => this.deleteUser(user._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } 
                                </tbody>
                            </table>
                            <div>
                            <a className="waves-effect waves-light btn" style={{margin: '4px'}} onClick={() => this.fetchUsers('sort=name')} >Sort By Name</a>
                            <a className="waves-effect waves-light btn" style={{margin: '4px'}} onClick={() => this.fetchUsers('sort=age')}>Sort By Age</a>
                            <a className="waves-effect waves-light btn" style={{margin: '4px'}} onClick={() => this.fetchUsers('sort=sport')}>Sort by Sport</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;