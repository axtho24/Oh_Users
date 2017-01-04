import Rebase from 're-base'

var config = {
  apiKey: "AIzaSyCJ8uf9ddR-m781uQ6pgftCHLNAO8RUAwg",
  authDomain: "oh-users.firebaseapp.com",
  databaseURL: "https://oh-users.firebaseio.com",
  storageBucket: "oh-users.appspot.com",
  messagingSenderId: "502404513110"
};

const base = Rebase.createClass(config)

export default base
