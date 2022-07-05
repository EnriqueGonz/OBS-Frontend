import React, { useState, useEffect } from 'react';

import { Pagination, Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import logo from '../images/logo.png';
import '../config';
import AppbarAdmin from './AppbarAdmin';


var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('tokenAdmin');
var paginas = 0;
var idproducto = 0;


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminProductos = () => {
    const [listProducts, setlistProducts] = useState([]);
    const [listCategoria, setlistCategoria] = useState([]);
    const [categoria, setcategoria] = useState("Todos");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {
        try {
            axios.post(baseUrl + '/categories/api/get-list/', {
                category_name: "",
            })
                .then((response) => {
                    console.log(response);
                    setlistCategoria(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistCategoria])

    useEffect(() => {
        try {
            axios.post(baseUrl + '/products/api/all-products-admin/', {
                product_name: "",
                category_name: "",
                subcategory_name: "",
                page: 1
            }, { headers })
                .then((response) => {
                    console.log(response);
                    paginas = response.data[0][0]["num_pages"];
                    setlistProducts(response.data[1]);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistProducts])

    function methodLoadPage(number) {
        axios.post(baseUrl + '/products/api/all-products-admin/', {
            product_name: "",
            category_name: "",
            subcategory_name: "",
            page: number
        }, { headers })
            .then((response) => {
                console.log(response);
                setlistProducts(response.data[1]);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    let items = [];
    for (let number = 1; number <= paginas; number++) {
        items.push(
            <li className="page-item" key={number}><button className="page-link" onClick={() => { methodLoadPage(number) }}>{number}</button></li>,
        );
    }

    const paginationBasic = (
        <div>
            <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
            <br />
        </div>
    );


    function methodDeleteProduct(number) {
        idproducto = number;
        console.log(number);
        handleShow();
    }

    function methodDelete() {
        axios.delete(baseUrl + '/products/api/delete/' + idproducto + '/', { headers })
            .then((response) => {
                methodLoadPage(1);
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    }




    function methodModalAgotado(number) {
        idproducto = number;
        console.log(number);
        handleShow2();
    }

    function methodAgotado() {
        axios.put(baseUrl + '/products/api/product-out-stock/' + idproducto + '/', {}, { headers })
            .then((response) => {
                handleClose2();
                methodLoadPage(1);

            })
            .catch((error) => {
                console.log(error);
            });

    }


    function BuscarPorCategoria(evt) {
        if (document.getElementById('selectCategoria').value === "") {
            setcategoria("Todos")
        } else {
            setcategoria(document.getElementById('selectCategoria').value)
        }


        try {
            axios.post(baseUrl + '/products/api/all-products-admin/', {
                product_name: "",
                category_name: document.getElementById('selectCategoria').value,
                page: 1
            }, { headers })
                .then((response) => {
                    paginas = response.data[0][0]["num_pages "];
                    setlistProducts(response.data[1]);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }
    }


    function methodModalUpdate(number, categoriaProducto) {
        window.location.href = '/admin/producto/api/update/' + number + '/' + categoriaProducto + '/'
    }

    return (
        <div>
            <AppbarAdmin />

            <>
                <div className='container'>
                    <div style={{ width: "100%", textAlign: "justify" }}>
                        <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                            <div className='col'>
                                <h3><b>{categoria}</b></h3>
                            </div>
                            <div className='col'>
                                <Form.Select id='selectCategoria' onChange={BuscarPorCategoria} style={{ width: "auto", float: "right" }}>
                                    <option value="">Sin filtros</option>
                                    {listCategoria.map((item, index) => (
                                        <option key={index} value={item.category_name} >{item.category_name}</option>
                                    ))}
                                </Form.Select>
                            </div>

                        </div>
                        <div className='row'>
                            {listProducts.map((item, index) => (
                                <div key={index} className='col-6 col-md-3' style={{ paddingBottom: 15 }}>
                                    <div className="card" >
                                        {
                                            (item.unit_of_existence === 0)
                                                ? <span className='productoAgotado'>Agotado</span>
                                                : <></>
                                        }
                                        <div className="card__content">
                                            <div className='row' style={{ height: "50%", justifyContent: "center" }}>
                                                {
                                                    (item.image === "")
                                                        ? <a href={'/producto/' + item.id} ><img alt="" className='imgProducto' style={{ objectFit: "fill" }} src='https://obsbucket.s3.amazonaws.com/assets/images/imgDefault.png'></img></a>
                                                        : <a href={'/producto/' + item.id} ><img alt="" className='imgProducto' src={'https://obsbucket.s3.amazonaws.com/' + item.image}></img></a>
                                                }

                                            </div>
                                            <div className='module line-clamp'>
                                                <a href={'/producto/' + item.id} style={{ color: "black", textDecoration: "none" }}><p style={{ fontWeight: "bold" }}>{item.product_name}</p></a>
                                            </div>
                                            <p className="card__info" style={{ height: "fit-content" }}> <span className='simbol_price'>$</span>{item.price} <span className='simbol_price'>+ envio</span></p>
                                            <div style={{ width: "100%" }}>
                                                <div className='row' style={{ width: "100%", margin: 0, textAlign: "center" }}>
                                                    <div className='col-12 col-md-4' style={{ margin: 0, padding: 0 }}>
                                                        <button className='btn botonProductosAdmin' style={{ margin: 0, backgroundColor: "#282828", color: "white" }} onClick={() => { methodModalAgotado(item.id) }}>Agotado</button>
                                                    </div>
                                                    <div className='col-12 col-md-4' style={{ margin: 0, padding: 0 }}>
                                                        <button className='btn botonProductosAdmin' style={{ margin: 0, backgroundColor: "#282828", color: "white" }} onClick={() => { methodModalUpdate(item.id, item.categories_id) }}>Editar</button>
                                                    </div>
                                                    <div className='col-12 col-md-4' style={{ margin: 0, padding: 0 }}>
                                                        <button className='btn botonProductosAdmin' style={{ margin: 0, backgroundColor: "#C12C30", color: "white" }} onClick={() => { methodDeleteProduct(item.id) }}>Eliminar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: 20 }}>
                    {paginationBasic}
                </div>
            </>


            <br></br>

            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body style={{ margin: 20 }}>
                    <div style={{ textAlign: "center", border: "solid #92DCE5 5px", padding: 25 }}>
                        <img src={logo} alt=""></img>
                        <h4>¿Segur@ que quieres eliminar el producto {idproducto}?</h4>
                        <p>*Nota: Los productos que esten relacionado con algun pedido no podran ser eliminados</p>



                        <Button style={{ marginLeft: 10, backgroundColor: "#282828", borderColor: "#282828" }} onClick={handleClose}>
                            Volver
                        </Button>

                        <Button style={{ marginLeft: 10, backgroundColor: "#C12C30", borderColor: "#C12C30", color: "white" }} onClick={() => { methodDelete() }} >
                            Eliminar
                        </Button>


                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={show2} size="md" onHide={handleClose2} >
                <Modal.Body style={{ margin: 20 }}>
                    <div>
                        <h4>¿Agotar producto {idproducto}?</h4>

                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#C12C30", borderColor: "#C12C30", color: "white" }} onClick={() => { methodAgotado() }} >
                            Agotar
                        </Button>
                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={handleClose2}>
                            Volver
                        </Button>

                    </div>
                </Modal.Body>
            </Modal>


        </div>
    )

}
export default AdminProductos;