import React, { useEffect,useRef} from 'react';

import imagen2 from '../images/img.png';
import imagen3 from '../images/pedidos.png';
import biclogo from '../images/marcas/bic.png';
import dixonlogo from '../images/marcas/DIXON.png';
import sharpielogo from '../images/marcas/sharpie.png';
import magistrallogo from '../images/marcas/magistral.png';
import ContactaSoporte from '../images/ContactaSoporte.png';
import contactaWhatsapp from '../images/contactaWhatsapp.png';
import btnApiWhatsapp from '../images/btnApiWhatsapp.png';

import '../animated.css';
import { Carousel } from 'react-bootstrap';

document.title = "Office BS tu papelería de confianza"
let cantidad = 0;


const Inicio = () => {

    const clientes = useRef(null);
    const servicios = useRef(null);
    const productosExistencias = useRef(null);
    const productosVendidos = useRef(null);

    useEffect(() => {
        contador();

    },[])


    function contador() {
        let tiempo=setInterval(() => {
            cantidad+=5
            
            if(cantidad <= 54){
                clientes.current.textContent = cantidad
            }
            if(cantidad <= 270){
                servicios.current.textContent = cantidad
            }
            if(cantidad <= 900){
                productosExistencias.current.textContent = cantidad
            }
            if(cantidad <= 1000){
                productosVendidos.current.textContent = cantidad
            }

            if(cantidad === 1000){
                clearInterval(tiempo)
            }

         }, 25);
    }

    function methodShowWhatsapp(){
        window.location.href ='https://api.whatsapp.com/send/?phone=525621818583&text=¡Hola!%20Necesito%20ayuda'
    }


    return (
        <div>
            <div id='stickyWhatsapp'>
                <button className='btn btn-flotanteWhatsapp' onClick = {() => { methodShowWhatsapp()} }>
                    <img alt="btnWhatsApp" src={btnApiWhatsapp} style={{width:150}}></img>
                </button>    
            </div>
        
            <div style={{ paddingBottom: 50 }}>
                <img src={imagen2} alt="" className="imgHeader fadeInDown"></img>
            </div>
            <div className='container' style={{ width: "80%", paddingBottom: 60 }}>
                <Carousel>
                    <Carousel.Item>
                        <div className='row'>
                            <div className='col' style={{ paddingBottom: 10 }}>
                                <img style={{ width: "-webkit-fill-available" }} src={imagen3} alt=""></img>
                            </div>
                            <div className='col' style={{ textAlign: "justify" }}>
                                <h4>Realiza tus pedidos desde la web</h4>
                                <span style={{ fontSize: "14px" }}>
                                    En Office Business Solutions buscamos que tu proceso de compra sea rápido y sencillo, es por eso que contamos con una amplia cantidad de productos dentro de nuestro catálogo.<br /><br/>
                                    Olvídate de esas largas filas o distancias a papelerías de mayoreo  y realiza tu compra desde la comodidad de tu hogar u oficina, nuestro servicio de pedidos web incluye una amplia gama de métodos de pago y es completamente seguro.
                                </span>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='row'>
                            <div className='col' style={{ paddingBottom: 10 }}>
                                <img style={{ width: "-webkit-fill-available" }} src={contactaWhatsapp} alt=""></img>
                            </div>
                            <div className='col' style={{ textAlign: "justify" }}>
                                <h4>Contacta y aparta productos vía whatsapp</h4>
                                <span style={{ fontSize: "14px" }}>
                                    En Office Business Solutions conocemos que la velocidad de compra y la rapidez con la que requieres papelería de mayoreo para tu negocio es importante , es por eso que contamos con sistema de consulta y apartado. <br/><br/>
                                    Escribenos y de inmediato alguno de nuestros ejecutivos levantara tu cotización sin costo alguno o bien tu pedido, y te ayudará en el proceso de compra de tus productos. ¿Buscas un producto que no está en nuestro catálogo? no te preocupes en OBS lo buscamos por ti para que llegue hasta tu domicilio.
                                </span>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='row'>
                            <div className='col' style={{ paddingBottom: 10 }}>
                                <img style={{ width: "-webkit-fill-available" }} src={ContactaSoporte} alt=""></img>
                            </div>
                            <div className='col' style={{ textAlign: "justify" }}>
                                <h4>Soporte y consultas vía telefónica</h4>
                                <span style={{ fontSize: "14px" }}>
                                    Con OBS el envío de tus paquetes de papelería no es preocupación , contamos con un sistema privado de entregas a domicilio, realizamos envios dentro de CDMX y Area Metropolitana asi como foráneos<br /><br/>
                                    Nuestra atención por parte de nuestro departamento de contact center te permitirá estar monitoreando de forma constante tu pedido, en OBS tu papelería de confianza buscamos generar un vínculo empresarial y poder satisfacer tus necesidades de papelería para tu negocio.
                                </span>
                            </div>
                        </div>
                    </Carousel.Item>

                </Carousel>
            </div>
            <div className="barraInicio" style={{ marginBottom: 50 }}>
                <div className="container">
                    <div className="row rowContainer">
                        <div className="col">
                            +<span ref={clientes}>54</span>
                            <br />
                            <span>Clientes satisfechos</span>
                        </div>
                        <div className="col">
                            +<span ref={servicios}>270</span>
                            <br />
                            <span>Servicios realizados</span>
                        </div>
                        <div className="col">
                            +<span ref={productosExistencias}>900</span>
                            <br />
                            <span>Productos en existencias</span>
                        </div>
                        <div className="col">
                            +<span ref={productosVendidos}>1000</span>
                            <br />
                            <span>Productos vendidos</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='container' style={{ width: "85%" }}>
                <h4>Contamos con las mejores marcas</h4>
            </div>

            <div>
                <div className="container" style={{ backgroundColor: "#F4F4F4" }}>
                    <div className="row rowContainerLogos">
                        
                        <div className="col">
                            <img src={biclogo} alt="logo Bic" className="medidaLogos"></img>
                        </div>
                        <div className="col">
                            <img src={dixonlogo} alt="Logo Dixon" className="medidaLogos"></img>
                        </div>
                        <div className="col">
                            <img src={magistrallogo} alt="Logo Magistral" className="medidaLogos"></img>
                        </div>
                        <div className="col">
                            <img src={sharpielogo} alt="Logo Sharpie" className="medidaLogos"></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-sm tablaContainer3" style={{ textAlign: "-webkit-center" }}>
                <div className="cardRegistro" >
                    <div className="row">
                        <div className="col-4" style={{ height: 50, borderRadius: "50px 0px 0px 0px", backgroundColor: "#32BD60" }}>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ backgroundColor: "#1D8D42" }}>
                            <div>
                                <h3>Registrate y cotiza tu primera compra</h3>
                                <p>Y asi experimenta lo facil y seguro que es comprar con nosotros</p>
                                <div style={{ display: "flex", placeContent: "center" }}>
                                    <input placeholder="Ingresa tu correo electronico" style={{width:"55%"}}></input>
                                    <a className='btn' style={{ borderRadius: 0, backgroundColor: "#C12C30", color: "white" }} href='/Perfil'>Enviar</a>
                                </div>
                                <br /><br />
                                <p>Se enviará una contraseña a tu dirección de correo electrónico.</p>
                                <p>Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web, gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra política de privacidad.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}
export default Inicio;