import './App.css';
import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Nosotros from './Components/Nosotros';
import Tienda from './Components/Tienda';
import Perfil from './Components/Perfil';
import Inicio from './Components/Inicio';
import NavbarOBS from './Components/NavbarOBS.js';
import FooterOBS from './Components/FooterOBS';
import Contacto from './Components/Contacto'

import Maps from './Components/Maps';

function App() {
  return (
    <div className="App">
      <Router>
      <NavbarOBS></NavbarOBS>
        <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route path="/Inicio">
            <Inicio/>
        </Route>
        <Route path="/Nosotros">
            <Nosotros/>
        </Route>
        <Route path="/Contacto">
            <Contacto/>
        </Route>
        <Route path="/Tienda">
            <Tienda/>
        </Route>
        <Route path="/Perfil">
          <Perfil/>
        </Route>
        <Route path="/Contacto">            
        </Route>
        </Switch>
        <FooterOBS></FooterOBS>
      </Router>
    </div>
  );
}

export default App;
