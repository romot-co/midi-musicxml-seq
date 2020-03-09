import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'scss/index.scss';

import MidiUploadPage from 'pages/MidiUploadPage';
import MidiEditPage from 'pages/MidiEditPage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MidiUploadPage} />
        <Route exact path="/edit" component={MidiEditPage} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <div className="app">
      <main className="main">
        <Routes />
      </main>
    </div>
  );
}

export default App;
