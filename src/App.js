import React,{ useState } from 'react';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useHistory
} from "react-router-dom";

function App() {
  const [username, setUsername] = useState();
  function handleInputUsername(text) {
    setUsername(text);
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/user">
            <User handleInputUsername={(e) => handleInputUsername(e)} />
          </Route>
          <Route path="/" render={props => !username
          ? (<Redirect to="/user" />)
          : (<Home username={username} />)}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  const history = useHistory();
  return (
    <div>
      <div className="home">
      <h1>Yokatter</h1>
      <p>あなたは, @{props.username}です！</p>
      <button onClick={() => history.push('/user')}>usernameの変更</button>
      </div>
      <div className="app">
      <Sidebar />
      <Feed username={props.username} />
      <Widgets />
      </div>
    </div>
  )
}

function User(props) {
  const history = useHistory();
  const handleSubmit = (e) => {
    history.push('/');
  }
  return (
    <div>
      <h2>あなたのYokatterユーザーネームを教えて下さい！</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => props.handleInputUsername(e.target.value)}></input>
        <input type="submit" value="決定"></input>
      </form>
    </div>
  )
}

export default App;