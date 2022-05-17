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
import AdminInicio from './Components/AdminInicio';
import AdminProductos from './Components/AdminProductos';
import AdminAñadir from './Components/AdminAñadir';
import AdminPedidos from './Components/AdminPedidos';
import AdminProductoUpdate from './Components/AdminProductoUpdate';

var token = localStorage.getItem('token');  

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
            <NavbarOBS/>
            <Inicio />
        </Route>
        <Route path="/Inicio">
            <NavbarOBS/>
            <Inicio></Inicio>
        </Route>
        <Route path="/Nosotros">
            <NavbarOBS/>
            <Nosotros/>
        </Route>
        <Route path="/Contacto">
            <NavbarOBS/>
            <Contacto/>
        </Route>
        <Route path="/Tienda">
            <NavbarOBS/>
            <Tienda/>
        </Route>
        <Route path="/Producto/:idproducto/">
            <NavbarOBS/>
            <ProductoEspecifico/>
        </Route>

        <Route path="/Micarrito/">
            <NavbarOBS/>
            <UserCarShop/>
        </Route>


        <Route path="/Perfil" render={() => {
          return token ? <><NavbarOBS/><PerfilMain/></> : <><NavbarOBS/><Perfil/></>
        }}>
        </Route>


        <Route path="/admin/inicio/">
            <AdminInicio/>
        </Route>
        <Route path="/admin/productos/">
            <AdminProductos/>
        </Route>
        <Route path="/admin/añadir/">
            <AdminAñadir/>
        </Route>
        <Route path="/admin/producto/api/update/:idproducto/:idcategoria/">
            <AdminProductoUpdate/>
        </Route>
        <Route path="/admin/pedidos/">
            <AdminPedidos/>
        </Route>

        
        </Switch>
        <FooterOBS/>
      </Router>
    </div>
  );
}

export default App;
