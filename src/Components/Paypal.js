import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Install: npm i @paypal/react-paypal-js
import axios from 'axios';
import '../config';
import { Modal,Button } from 'react-bootstrap';
import logoImg from '../images/LogoModal.png';
import successImg from '../images/Success.png';
import NavbarOBS from "./NavbarOBS";
import FooterOBS from "./FooterOBS";

var baseUrl = global.config.i18n.route.url;
var orderPaypal = "";
var token = localStorage.getItem('token');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const PayPal = (parametros) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    const handleAprove = (orderId) => {
        // Registrar que se guardó con éxito en el backend
        // if response is success
        setIsSuccess(true);
    }

    if (isSuccess){
        //alert('El pago se hizo correctamente');
        console.log('aaca');
        
        //window.location.href = '/Perfil/'
        // Se usa la API del back aqui.
        //https://yellowrabbit.herokuapp.com/payment/api/save-payment-intent-paypal/
        /**
         * datos ()
         * - user
         * - order // Lo obtienes del pedido
         * - paypal_order_id // Lo obtienes del response
         * - shipping_price // costo de envío.
         */
    }

    if(error){
        // Display error message
        alert(error);
    }


    function successmethodpay(){

        axios.post(baseUrl+'/payment/api/save-payment-intent-paypal/',{
            user: parametros.idusuario,
            order: parametros.idorder,
            paypal_order_id: orderPaypal,
        },{ headers })
        .then((response) => {
            console.log(response)
            handleShow();
        })
        .catch((error) => {
            console.log(error);
        });

    }

    function finalizarCompra(){
        window.location.href = "/Inicio"
    }


    return (
        <>
        <NavbarOBS/>
            <div className="container" style={{paddingTop:35}}>
                <div className="row">
                    <div className="col">
                        <h3>Total a pagar: </h3>
                        <h4>${parametros.precio} MXN</h4>
                    </div>
                    <div className="col">
                        <h4>Metodo de pago seleccionado:</h4>
                        <h4>PayPal</h4>
                    </div>
                </div>

                <div style={{textAlign:"center", paddingTop:25}}>
                    <PayPalScriptProvider options={{ "client-id": parametros.clientIdPaypal, currency: "MXN" }}>
                        <PayPalButtons id="botonPaypal"
                            style={{ color: "silver", layout: "horizontal", height: 48, tagline: false, shape: "pill" }}

                            onClick = {(data, actions) => {
                                const hasAlreadyBoughtItem = false; //
                                if(hasAlreadyBoughtItem){
                                    setError("Ya ha comprado este artículo");
                                    return actions.reject()
                                }else{
                                    return actions.resolve()
                                }
                            }}

                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            description: parametros.product_name, // Nombre del producto
                                            amount: {
                                                value: parametros.precio, // Es el precio en MXN, con todo y costo de envío.
                                            },
                                        },
                                    ]
                                });
                            }}

                            onApprove={ async (data, actions) => {
                                const order = await actions.order.capture();
                                console.log('order: ', order);
                                console.log(order.id)
                                orderPaypal = order.id;
                                successmethodpay();
                                handleAprove(data.orderID);

                            }}

                            onCancel = {()=>{
                                //display cancel message, or redirect to order details
                            }}

                            onError={(err) => {
                                setError(err);
                                console.error("PayPal checkout onError ", err);
                            }}
                        />

                    </PayPalScriptProvider>
                </div>
            </div>
            <FooterOBS/>


            <Modal  show={show} size="lg">
                <Modal.Body style={{margin:20}}>
                    <div className="row">
                        <div className="col">
                            <img src={logoImg} alt="" style={{width:"90%",margin:15}}></img>
                        </div>
                        <div className="col" style={{textAlign:"center"}}>
                            <img src={successImg} alt="" style={{width:65,paddingBottom:10}}></img>
                            <h4>Tu compra a sido un exito</h4>
                            <h5>Puedes consultar los detalles de tu pedido en <a href="/Perfil">"Mis pedidos"</a></h5>

                        </div>
                        
                        <Button style={{marginTop:20,backgroundColor:"#C12C30",borderColor:"#C12C30",color:"white" }} onClick = {() => { finalizarCompra()} } >
                            Aceptar
                        </Button>
                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PayPal