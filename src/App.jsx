import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.scss';
import 'antd/dist/antd.css';
import Login from './scenes/Login/Login';
import Dashboard from './shared/Layout/Dashboard';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PrivateRoute } from "./components/PrivateRoute";


export const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
