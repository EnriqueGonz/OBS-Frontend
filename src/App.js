import './App.css';

import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Nosotros from './Components/Nosotros';
import Tienda from './Components/Tienda';
import Perfil from './Components/Perfil';
import PerfilMain from './Components/PerfilMain';
import Inicio from './Components/Inicio';
import NavbarOBS from './Components/NavbarOBS.js';
import FooterOBS from './Components/FooterOBS';
import Contacto from './Components/Contacto'
import ProductoEspecifico from './Components/ProductoEspecifico';
import UserCarShop from './Components/UserCarShop';

var token = localStorage.getItem('token');  

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
        <Route path="/Producto/:idproducto/">
            <ProductoEspecifico/>
        </Route>

        <Route path="/Micarrito/">
            <UserCarShop/>
        </Route>


        <Route path="/Perfil" render={() => {
          return token ? <PerfilMain/> : <Perfil/>
        }}>
        </Route>

        
        </Switch>
        <FooterOBS></FooterOBS>
      </Router>
    </div>
  );
}

export default App;
