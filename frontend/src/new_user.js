import { Component } from 'react'
import './new_user.css';
import {  initializeApp } from "firebase/app";
import axios from 'axios';
import {getAuth } from "firebase/auth";
import {firebaseConfig} from "./config.js";

class NewUser extends Component {
    constructor(props) {
        super(props);
        initializeApp(firebaseConfig);
        this.state = {
            first_name: '',
            last_name: '',
            bio: '',
            redirect: false,
        }
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setBio = this.setBio.bind(this);
        this.setImage = this.setImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setFirstName(val) {
        this.setState({
            first_name: val.currentTarget.value
        });
    }
    setLastName(val) {
        this.setState({
            last_name: val.currentTarget.value
        });
    }
    setBio(val) {
        this.setState({
            bio: val.currentTarget.value
        });
    }
    setImage(val) { 
        this.setState({
            image: val.currentTarget.src
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const auth = getAuth();
        let user = {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            //photo_uri: e.target.img.src.value,
            is_online: true,
            created_at:  Date.now(),
            updated_at: Date.now()
        }

        axios.post('http://127.0.0.1:5000/api/auth/create-user', {
            uid: user.uid,
            email: user.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            photo_uri: this.state.image,
            bio: this.state.bio,
            is_online: user.is_online,
            created_at: user.created_at,
            updated_at: user.updated_at
        });
    }

    render() {
        return (
            <div>
                <h1> Welcome! </h1>
                <p> Please enter your details below to finish creating your profile. </p>
                <form onSubmit={this.handleSubmit} className='form'>
                    <img onChange={this.setImage} src="https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png" name="img" alt="user" />
                    <label>Click To Edit</label>
                    <input onChange={this.setFirstName.bind(this)} value={this.state.first_name} type="text" name="first_name" placeholder="First Name" />
                    <input onChange={this.setLastName.bind(this)} value={this.state.last_name}  type="text" name="last_name" placeholder="Last Name" />
                    <textarea onChange={this.setBio.bind(this)} value={this.state.bio} maxLength="100px" type="text" name="bio" placeholder="Biography" />
                    <button type="submit"> Next </button>
                </form>

            </div>
        )
    }
}


export default NewUser;
