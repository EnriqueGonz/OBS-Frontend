import React, { useState, useEffect } from 'react';
//MdSettings,MdOutlineSettings
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { MdSettings } from "react-icons/md";
import '../config';
import AppbarAdmin from './AppbarAdmin';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('tokenAdmin');
var idPedido = 0;
var deliveryNumber = "";


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminPedidos = () => {
    const [listPedidos, setlistPedidos] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [input, setInput] = useState({
        numero: '',
    });

    useEffect(() => {
        try {
            axios.post(baseUrl + '/orders/api/all-orders/', {
                status: "",
                order_date: "",
                delivery_number: ""
            }, { headers })
                .then((response) => {
                    console.log(response);
                    setlistPedidos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistPedidos])

    function BuscarPorEstatus(evt) {
        console.log(document.getElementById('selectStatus').value);
        axios.post(baseUrl + '/orders/api/all-orders/', {
            status: document.getElementById('selectStatus').value,
            order_date: "",
            delivery_number: input.numero
        }, { headers })
            .then((response) => {
                //console.log(response)
                setlistPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function buscarPorNumero(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name, '  ', value);
        setInput(values => ({ ...values, [name]: value }))


        axios.post(baseUrl + '/orders/api/all-orders/', {
            status: document.getElementById('selectStatus').value,
            order_date: "",
            delivery_number: value
        }, { headers })
            .then((response) => {
                //console.log(response)
                setlistPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function changeEstatus(delivery, id) {
        idPedido = id;
        deliveryNumber = delivery;
        handleShow();
    }

    function actualizarEstatus() {
        if (document.getElementById('selectStatus2').value === "En camino") {
            var todayDate = new Date().toISOString().slice(0, 10);

            axios.put(baseUrl + '/orders/api/change-status/' + idPedido + '/', {
                status: document.getElementById('selectStatus2').value,
                date_delivery: todayDate,
            }, { headers })
                .then((response) => {
                    console.log(response)
                    //window.location.href = '/admin/pedidos/'
                })
                .catch((error) => {
                    console.log(error);
                });


        }
        if (document.getElementById('selectStatus2').value === "Entregado") {

            axios.put(baseUrl + '/orders/api/change-status/' + idPedido + '/', {
                status: document.getElementById('selectStatus2').value,
                date_delivery: "",
            }, { headers })
                .then((response) => {
                    //console.log(response)
                    window.location.href = '/admin/pedidos/'
                })
                .catch((error) => {
                    console.log(error);
                });

        }



    }




    return (
        <>
            <AppbarAdmin />
            <div className='container'>
                <div style={{ paddingBottom: 25 }}>
                    <div className='row'>
                        <div className='col'>
                            <h5>Filtrar por numero de pedido.</h5>
                            <div className="group">
                                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                <input placeholder="Search" type="search" className="inputSearch" name="numero" value={input.numero} onChange={buscarPorNumero} />
                            </div>


                        </div>
                        <div className='col'>
                            <h5>Filtrar por estatus</h5>
                            <Form.Select id='selectStatus' className='inputRegistro' required style={{ borderRadius: 8 }} onChange={BuscarPorEstatus}>
                                <option value="">Selecciona estatus</option>
                                <option value="">Sin filtro</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="En camino">En camino</option>
                                <option value="Entregado">Entregado</option>

                            </Form.Select>

                        </div>

                    </div>
                </div>

                <div>
                    {listPedidos.map((item, index) => (
                        <div key={index} style={{ width: "100%", backgroundColor: "#E4E4E4", padding: 25, marginBottom: 20, position: "relative" }}>
                            {
                                (item[2][0].status === "Entregado")
                                    ?
                                    <></>
                                    : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cambiar Estatus</Tooltip>}>
                                        <span style={{ position: "absolute", top: "0%", right: "0%" }} onClick={() => { changeEstatus(item[2][0].delivery_number, item[2][0].id) }}>
                                            <MdSettings style={{ width: 30, height: 30 }} />
                                        </span>
                                    </OverlayTrigger>
                            }

                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <p><b>Numero de pedido: </b>{item[2][0].delivery_number}</p>
                                    <p><b>Fecha del pedido: </b>{item[2][0].order_date}</p>
                                    <p><b>Productos: </b><a href={'/admin/detalles/pedido/' + item[2][0].id + '/'}>Ver productos</a></p>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <div className='row'>
                                        <div className='col'>
                                            <span>Comprador</span>
                                            <div style={{ backgroundColor: "white", padding: 5, textAlign: "center" }}>
                                                <b>{item[0][0].first_name}</b>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <span>Total</span>
                                            <div style={{ backgroundColor: "white", padding: 5, textAlign: "center" }}>
                                                <b>${item[1][0].full_payment} MXN</b>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <span>Estatus</span>
                                            <div style={{ backgroundColor: "white", padding: 5, textAlign: "center" }}>
                                                {
                                                    (item[2][0].status === "Pendiente")
                                                        ? <b><span className="badge" style={{ backgroundColor: "#F9B233" }}> </span>{item[2][0].status}</b>
                                                        : (item[2][0].status === "Entregado")
                                                            ? <b><span className="badge" style={{ backgroundColor: "#26B9DD" }}> </span>{item[2][0].status}</b>
                                                            : (item[2][0].status === "Cancelado")
                                                                ? <b><span className="badge" style={{ backgroundColor: "#C12C30" }}> </span>{item[2][0].status}</b>
                                                                : (item[2][0].status === "En camino")
                                                                    ? <b><span className="badge" style={{ backgroundColor: "#4ABA56" }}> </span>{item[2][0].status}</b>
                                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                        <br /><br /><br />
                                        <span>Metodo de pago</span>
                                        <div style={{ backgroundColor: "white", padding: 5, marginLeft: 12 }}>
                                            <b>{item[1][0].payment_method}</b>
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>
                    ))}
                </div>



            </div>

            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body>
                    <div style={{ padding: 40 }}>
                        <h3>Cambiar estatus al pedido Numero:</h3>
                        <div className='container' style={{ textAlign: "center", paddingBottom: 20, paddingTop: 20 }}>
                            <h5><b>{deliveryNumber}</b></h5>

                            <select id='selectStatus2'>
                                <option>Selecciona estatus</option>
                                <option value='En camino'>En camino</option>
                                <option value='Entregado'>Entregado</option>
                            </select>
                        </div>

                        <p><b>Nota:</b> Una vez establescas el estatus del pedido como "Entregado" ya no podras cambiar el estatus.</p>

                        <button className='btn' onClick={() => { actualizarEstatus() }} style={{ float: "right", backgroundColor: "#C12C30", color: "white" }}>Actualizar Estatus</button>
                        <button className='btn btn-secondary' style={{ marginRight: 10, float: "right" }} onClick={handleClose}>Cancelar</button>
                    </div>
                </Modal.Body>
            </Modal>




        </>
    )

}
export default AdminPedidos;