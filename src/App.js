import "./App.css";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile"; 
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import { Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="d-flex w-100 align-items-center justify-content-center pt-5">
          <Col xs={12} md={6} lg={5}>
            <Router>
              <AuthProvider>
                <Switch> 
                  <PrivateRoute exact path="/" component={Dashboard} />  
                  <PrivateRoute exact path="/profile-update" component={UpdateProfile} />
                  <Route path="/signup" component={RegisterComponent} />
                  <Route path="/login" component={LoginComponent} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch> 
              </AuthProvider>
            </Router>
          </Col>
        </div>
      </header>
    </div>
  );
}

export default App;
