import React, { useState, useEffect } from 'react';
import CirculoServicios from '../images/CirculoServicios.png';
import CirculoHonestidad from '../images/CirculoHonestidad.png';
import CirculoResponsabilidad from '../images/CirculoResponsabilidad.png';
import CirculoCompromiso from '../images/CirculoCompromiso.png';

import header from '../images/header-nosotros.png';
import axios from 'axios';
import '../config';
var baseUrl = global.config.i18n.route.url;

const Nosotros = () => {
    const [listOpiniones, setlistOpiniones] = useState([]);
    const [vista, setVista] = useState('Servicios');

    useEffect(() => {
        document.title = "Office BS Conoce nuestro  objetivo";
        try {
            axios.get(baseUrl + '/opinions/api/public-access-opinions/')
                .then((response) => {
                    console.log(response.data)
                    setlistOpiniones(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistOpiniones])



    return (
        <div>
            <div style={{ marginBottom: 50 }}>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className="container grid-containerContacto">
                <div className="grid-item" style={{ marginBottom: 20 }}>
                    <div className="column">
                        <h3 style={{ fontSize: 48 }}>Calidad en nuestro articulos, al mejor precio.</h3>
                        {(() => {
                            if (vista === 'Servicios') {
                                return (
                                    <div style={{ borderRadius: 30, backgroundColor: "#C12C30", marginTop: 30, padding: 15 }}>
                                        <h2 style={{ color: "white", paddingLeft: 20 }}> Servicio al cliente</h2>
                                        <p style={{ color: "white", paddingLeft: 20 }}>Dentro de Office Business Solution la atención al cliente es lo mas importante , contamos con amplio equipo de colaboradores que están para atender las necesidades de nuestros clientes , de igual forma nuestro amplio catálogo de productos les permite elegir entre una gran variedad de artículos para su negocio </p>
                                    </div>
                                )
                            }
                            if (vista === 'Honestidad') {
                                return (
                                    <div style={{ borderRadius: 30, backgroundColor: "#1D8D43", marginTop: 30, padding: 15 }}>
                                        <h2 style={{ color: "white", paddingLeft: 20 }}> Honestidad</h2>
                                        <p style={{ color: "white", paddingLeft: 20 }}>OBS es una empresa de papelería al por mayor que ofrece recursos empresariales como material de oficina, mobiliario y mucho más. Buscamos establecer confianza en los productos que ofrecemos y brindar un servicio de calidad y honestidad a nuestros clientes</p>
                                    </div>
                                )
                            }
                            if (vista === 'Responsabilidad') {
                                return (
                                    <div style={{ borderRadius: 30, backgroundColor: "#639DAE", marginTop: 30, padding: 15 }}>
                                        <h2 style={{ color: "white", paddingLeft: 20 }}> Responsabilidad</h2>
                                        <p style={{ color: "white", paddingLeft: 20 }}>Somos un mayorista de papelería centrado en satisfacer la necesidad de recursos empresariales. Buscamos establecer la confianza en los productos que ofrecemos, y ofrecemos opciones tanto de marca como de entrega a domicilio. La responsabilidad con nuestros clientes es uno de los pilares más importantes de nuestra empresa, lo que significa ofrecer un servicio de calidad y honestidad.</p>
                                    </div>
                                )
                            }
                            if (vista === 'Compromiso') {
                                return (
                                    <div style={{ borderRadius: 30, backgroundColor: "#C1347C", marginTop: 30, padding: 15 }}>
                                        <h2 style={{ color: "white", paddingLeft: 20 }}> Compromiso</h2>
                                        <p style={{ color: "white", paddingLeft: 20 }}>Ser una papelería centrada en satisfacer la necesidad de recursos empresariales. Buscamos establecer la confianza en los productos que ofrecemos, y lo hacemos ofreciendo tanto marcas conocidas como entregas a domicilio.</p>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </div>
                <div className="grid-item" style={{ textAlign: "center" }}>
                    <div className="column">
                        <div style={{ display: "grid", gridTemplateColumns: "50% 50%", placeItems: "center" }}>
                            <button className='btn' style={{ width: "100%" }} onClick={() => { setVista('Servicios') }}>
                                <img alt="" src={CirculoServicios} style={{ width: "70%" }}></img>
                            </button>
                            <button className='btn' style={{ width: "100%" }} onClick={() => { setVista('Honestidad') }}>
                                <img alt="" src={CirculoHonestidad} style={{ width: "70%" }}></img>
                            </button>
                            <button className='btn' style={{ width: "100%" }} onClick={() => { setVista('Responsabilidad') }}>
                                <img alt="" src={CirculoResponsabilidad} style={{ width: "70%" }}></img>
                            </button>
                            <button className='btn' style={{ width: "100%" }} onClick={() => { setVista('Compromiso') }}>
                                <img alt="" src={CirculoCompromiso} style={{ width: "70%" }}></img>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container' style={{ marginTop: 50 }} >
                <div className='MisionVision'>
                    <div className='grid-item'>
                        <div className='column'>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Mision</b></h2>
                            <p>Nuestra misión es proporcionar a nuestros clientes lo que necesitan a precios competitivos. También ofrecemos servicios como el paquete y la entrega, ¡para que su compra sea aún más fácil! Nos esforzamos por ser una fuente de inspiración para las personas que buscan una nueva forma de hacer las cosas.</p>
                        </div>
                    </div>
                    <div className='grid-item'>
                        <div className='column'>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Vision</b></h2>
                            <p>Es ayudar a nuestros clientes a tomar decisiones informadas sobre lo que compran, y no sólo porque son propietarios de un negocio que necesitan artículos de calidad a un precio asequible. Queremos que nuestros clientes estén contentos con su experiencia con nosotros, y tengan la confianza de seguir adquiriendo nuestros productos.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="barraContacto" style={{ marginTop: 50, marginBottom: 50, paddingLeft: 50, paddingTop: 110 }}>
                <a className="btn btn-light" style={{ fontSize: 26, fontWeight: "bold", borderRadius: 25 }} href='/Contacto'>CONTÁCTANOS</a>
            </div>


            <div className='container'>
                <h2><b>Casos de exito</b></h2>
            </div>
            <div className='container' style={{ display: "flex", overflowX: "auto" }}>
                <div style={{ display: "flex" }}>
                    {listOpiniones.map((item, index) => (
                        <div key={index} style={{ border: "solid #B2B2B2 3px", width: 350, height: 230, marginRight: 40, position: "relative", padding: 25, borderRadius: 15 }}>
                            {(() => {
                                const rows = [];
                                for (let i = 0; i < item.rate; i++) {
                                    rows.push(<span key={i} style={{ fontSize: 25, color: "orange" }}>★</span>);
                                }
                                return rows;
                            })()}
                            <p className='module line-clamp2'>{item.message}</p>
                            <p style={{ position: "absolute", bottom: "1%" }}><b>{item.user}</b></p>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )

}

export default Nosotros;