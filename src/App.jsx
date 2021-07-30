import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Dashboard from './scenes/Dashboard';
import Login from './scenes/Login/Login';

function App() {

  return (
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
  );
}

export default App;
