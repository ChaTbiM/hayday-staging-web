import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.scss';
import 'antd/dist/antd.css';
import Login from './scenes/Login/Login';
import Dashboard from './shared/Layout/Dashboard';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
