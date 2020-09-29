import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LangingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NabBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <header>
        <NabBar />
      </header>

      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </Router>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
