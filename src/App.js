import './App.css';
import React from "react";
import { BrowserRouter as Router,Switch,Route,NavLink } from "react-router-dom";
import FragmentInicio from './Components/FragmentInicio';
import FragmentNosotros from './Components/FragmentNosotros';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="button-container">

          <div className="navbar navbar-expand-lg navbar-light bg-light navContainer">
              <NavLink to="/Inicio" className="navbar-brand navLinkContainer">Inicio</NavLink>
              <NavLink to="/Nosotros" className="navbar-brand navLinkContainer">Nosotros</NavLink>
              <NavLink to="/Tienda" className="navbar-brand navLinkContainer">Tienda</NavLink>
              <NavLink to="/Perfil" className="navbar-brand navLinkContainer">Perfil</NavLink>
              <NavLink to="/Contacto" className="navbar-brand navLinkContainer">Contacto</NavLink>
          </div>
        </div>
        
        <Switch>
        <Route path="/Inicio">
            <FragmentInicio></FragmentInicio>
        </Route>
        <Route path="/Nosotros">
            <FragmentNosotros></FragmentNosotros>
        </Route>
        <Route path="/Tienda">
            
        </Route>
        <Route path="/Perfil">
            
        </Route>
        <Route path="/Contacto">
            
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
