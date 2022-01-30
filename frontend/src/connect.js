import { Component } from 'react'
import './new_user.css';
import {  initializeApp } from "firebase/app";
import axios from 'axios';
import {getAuth } from "firebase/auth";
import {firebaseConfig} from "./config.js";

class Connect extends Component {
    constructor(){
        super();
        initializeApp(firebaseConfig);
        this.state = {
            first_name: '',
            last_name: '',
            bio: '',
            video_uri: '',
            uid: ''
        }
        this.onSkipClick = this.onSkipClick.bind(this);
        this.onConnectClick = this.onConnectClick.bind(this);
    }
    async componentDidMount() {
        const res = await axios.post('http://localhost:5000/api/auth/get-random-uid');
        this.setState({ uid: res.data[0].uid });
        
        const userRes = await axios.post('http://localhost:5000/api/auth/get-user', {uid: this.state.uid});
        console.log(userRes);
        this.setState({
            first_name: userRes.data[0].first_name,
            last_name: userRes.data[0].last_name,
            bio: userRes.data[0].bio,
            video_uri: userRes.data[0].video_uri
        });
    }

    async onSkipClick(){
        /*  Insert Database Access to change to Next User   */ 
        const res = await axios.post('http://localhost:5000/api/auth/get-random-uid');
        this.setState({ uid: res.data[0].uid });
        
        const userRes = await axios.post('http://localhost:5000/api/auth/get-user', {uid: this.state.uid});
        console.log(userRes);
        this.setState({
            first_name: userRes.data[0].first_name,
            last_name: userRes.data[0].last_name,
            bio: userRes.data[0].bio,
            video_uri: userRes.data[0].video_uri
        });
    }
        
    async onConnectClick() {
    /* InsertDatabase Access to change to Messenger Page in Connection with Connected User */
        const auth = getAuth();
        const res = await axios.post('http://localhost:5000/api/auth/make-connection', {
            connect_uid: this.state.uid,
            uid: auth.currentUser.uid
        });
        console.log(res);
    }

    render() {
        return(
            <div className="page">
                <h1>{this.state.first_name} {this.state.last_name}</h1>
                <p>{this.state.bio}</p>
                {this.state.uid ? 
                <video width="50%" height="37.5%" controls autoPlay>
                    <source src={ 'http://localhost:3000' + __dirname + 'src/videos/' + this.state.uid + '.webm'}></source>
                </video> : <p>null</p>
                }
                <button className="connectButton"onClick={this.onConnectClick}>Connect</button> 

                <button className="skipButton" onClick={this.onSkipClick} >Skip</button>
            </div>
        );
    
    }
}

export default Connect;
