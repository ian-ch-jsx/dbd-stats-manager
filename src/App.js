import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile';
import Menu from './views/Profile/Menu';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/survivor">
            <Main />
          </Route>
          <Route exact path="/killer">
            <Main killer />
          </Route>
          <Route exact path="/signup">
            <Auth isSigningUp />
          </Route>
          <Route exact path="/signin">
            <Auth />
          </Route>
          <Route exact path="/stats/">
            <Menu />
          </Route>
          <Route exact path="/stats/survivor">
            <Profile />
          </Route>
          <Route exact path="/stats/killer">
            <Profile isKiller />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
