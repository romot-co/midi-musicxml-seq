import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import MidiUploadPage from 'pages/MidiUploadPage';
import MidiEditPage from 'pages/MidiEditPage';

const Routes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={MidiUploadPage} />
        <Route path="/edit" component={MidiEditPage} />
        <Route component={() => (<div>404 Not found</div>)} />
      </Switch>
    </BrowserRouter>
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
