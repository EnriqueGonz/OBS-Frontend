import './App.css';

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Opiniones from './Components/Opiniones';
import AdminOpiniones from './Components/AdminOpiniones';
import ForgotPassword from './Components/ForgotPassword';
import RestorePassword from './Components/RestorePassword';
import ConfirmOrder from './Components/ConfirmOrder';
import SuccessShop from './Components/SuccessShop';
import Testqr from './Components/Testqr';
import UserPedidoSpecific from './Components/UserPedidoSpecific';
import AdminPedidoSpecific from './Components/AdminPedidoSpecific';
import PreguntasFrecuentes from './Components/PreguntasFrecuentes';
import ConfirmMail from './Components/ConfirmMail';

var token = localStorage.getItem('token');
var tokenAdmin = localStorage.getItem('tokenAdmin');

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>

                    {/* Usuario */}

                    <Route exact path="/">
                        <NavbarOBS />
                        <Inicio />
                    </Route>

                    <Route path="/Inicio">
                        <NavbarOBS />
                        <Inicio></Inicio>
                    </Route>
                    <Route path="/Nosotros" >
                        <NavbarOBS />
                        <Nosotros />
                    </Route>
                    <Route path="/Contacto">
                        <NavbarOBS />
                        <Contacto />
                    </Route>
                    <Route path="/Tienda">
                        <NavbarOBS />
                        <Tienda />
                    </Route>
                    <Route path="/Producto/:idproducto/">
                        <NavbarOBS />
                        <ProductoEspecifico />
                    </Route>
                    <Route path="/Preguntas-Frecuentes">
                        <NavbarOBS />
                        <PreguntasFrecuentes />
                    </Route>

                    <Route path="/Micarrito/">
                        <NavbarOBS />
                        <UserCarShop />
                    </Route>

                    <Route path="/user/pedido/:idorder/">
                        <NavbarOBS />
                        <UserPedidoSpecific />
                    </Route>

                    <Route path="/olvide-mi-contraseña/">
                        <NavbarOBS />
                        <ForgotPassword />
                    </Route>

                    <Route path="/password/reset/:uidd/:rtoken/">
                        <NavbarOBS />
                        <RestorePassword />
                    </Route>

                    <Route path="/mailer/api/confirm-mail/:uidd/:rtoken/">
                        <NavbarOBS />
                        <ConfirmMail />
                    </Route>

                    <Route path="/Perfil" render={() => {
                        return token ? <><NavbarOBS /><PerfilMain /></> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>


                    {/* ------------Rutas de admin------------- */}

                    <Route path="/admin/inicio/" render={() => {
                        return tokenAdmin ? <AdminInicio /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/admin/productos/" render={() => {
                        return tokenAdmin ? <AdminProductos /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/admin/añadir/" render={() => {
                        return tokenAdmin ? <AdminAñadir /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/admin/producto/api/update/:idproducto/:idcategoria/" render={() => {
                        return tokenAdmin ? <AdminProductoUpdate /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/admin/pedidos/" render={() => {
                        return tokenAdmin ? <AdminPedidos /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/admin/opiniones/" render={() => {
                        return tokenAdmin ? <AdminOpiniones /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/admin/detalles/pedido/:idorder/" render={() => {
                        return tokenAdmin ? <AdminPedidoSpecific /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>

                    <Route path="/opiniones/" render={() => {
                        return tokenAdmin ? <Opiniones /> : <><NavbarOBS /><Perfil /></>
                    }}>
                    </Route>


                    {/* Pagos */}

                    <Route path="/pagar/">
                        <NavbarOBS />
                        <ConfirmOrder />
                    </Route>

                    <Route path="/checkout/buy/mercadopago/:qrcode/">
                        <NavbarOBS />
                        <Testqr />
                    </Route>

                    <Route path="/success/">
                        <NavbarOBS />
                        <SuccessShop />
                    </Route>




                </Switch>
                <FooterOBS />
            </Router>
        </div>
    );
}

export default App;
