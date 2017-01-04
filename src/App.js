import React, { Component } from 'react';
import './App.css';
import base from './config.js';
class App extends Component {


  constructor() {
    super();
    this.state ={
      userName: '',
      Chat: []
    }
    this.auth = base.auth()
  }

  componentDidMount() {
    base.onAuth(this.authStateChanged.bind(this))
  }
  authStateChanged (user) {
     if (user) {
       this.setState({
         userName: user.displayName
       })
       this.sync = base.syncState('Chat', {
         state: 'Chat',
         context: this,
       })
     } else {
       if (this.sync) {
         base.removeBinding(this.sync)
         delete this.sync
       }
       this.setState({
         Chat: [],
         userName: '',
         asArray: true
       })
     }
   }

  signIn(){
        base.authWithOAuthPopup('google', this.authStateChanged.bind(this))
  }
  signOut () {
    base.unauth();
  }
  addMessage () {
    let text = this.input.value
    let newMessage = { text: text, name: this.state.userName }
    let newMessageArray = this.state.Chat.concat(newMessage)
    this.setState({
      Chat: newMessageArray
    })
  }
  render() {
    return (
      <div className="App">
      <h2>Welcome {this.state.userName}</h2>
      <button
        onClick={this.signIn.bind(this)}
        hidden={this.state.userName}>
        Sign In</button>
      <button
        onClick={this.signOut.bind(this)}
        hidden={!this.state.userName}>
        Sign Out</button>
      <div>
        {this.state.Chat.map((chat, index) => {
          return <p>{chat.name}: {chat.text}</p>
          })
        }
      </div>
      <div><h3>Add a message</h3>
            <input ref={element => this.input = element} />
            <button onClick={this.addMessage.bind(this)}>Save</button>
          </div>
      </div>
    );
  }
}

export default App;
