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
import { AppProvider } from "./hooks/app-context";


export const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/login" >
              <Login />
            </Route>
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
