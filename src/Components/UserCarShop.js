import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../images/HeaderCarrito.png';
import '../Productos.css';
import { MdDeleteOutline, } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import '../config';


var baseUrl = global.config.i18n.route.url;
var imgUrl = global.config.i18n.route.imgUrl;


var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
var idproducto = 0;


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};




const UserCarShop = () => {
    const [listProducts, setlistProducts] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        try {
            axios.get(baseUrl + '/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
                .then((response) => {
                    console.log(response);
                    if (response.data === "") {
                        setlistProducts([])
                    } else {
                        setlistProducts(response.data);

                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistProducts])



    let costo_total = 0;

    listProducts.map((item) => (
        costo_total += parseFloat(item[0][0]["total_price"])
    ))


    function methodRefreshList() {
        axios.get(baseUrl + '/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
            .then((response) => {
                console.log(response);
                setlistProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function methodModalDelCarShop(number) {
        idproducto = number;
        handleShow();
    }

    function methodDelCarShop() {
        axios.delete(baseUrl + '/shoppingcart/api/delete/' + idproducto + '/', { headers })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    handleClose();
                    methodRefreshList();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function makeOrder() {
        window.location.href = "/pagar"
    }

    function test() {
        console.log('click')
        var inputsAmount = document.getElementsByName('foo');
        for (var i = 0, n = inputsAmount.length; i < n; i++) {

            if (parseInt(inputsAmount[i].value) === parseInt(listProducts[i][0][0]["amount"])) {
                //console.log(listProducts[i][0][0]["amount"])
                //console.log(inputsAmount[i].value )
            } else {
                //console.log('-')
                axios.put(baseUrl + '/shoppingcart/api/update/' + listProducts[i][0][0]["id"] + '/', {
                    amount: parseInt(inputsAmount[i].value)
                }, { headers })
                    .then((response) => {
                        methodRefreshList();
                        //console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        }
    }

    return (
        <>
            <div>
                <img src={header} alt="" className="imgHeader"></img>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12' style={{ padding: 20, textAlign: "-webkit-center" }}>
                        <div className='table-responsive'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col"></th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProducts.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ position: "relative" }}>
                                                <div style={{ position: "absolute", top: "15%" }}>
                                                    <button onClick={() => { methodModalDelCarShop(item[0][0]["id"]) }} style={{ fontSize: 35 }} className="btn btnRemove"><MdDeleteOutline /></button>
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    (item[1][0]["image"] === "")
                                                        ? <a href={'/producto/' + item[1][0]["id"]}><img style={{ width: 65, height: 65, margin: 10, objectFit: "fill" }} src={imgUrl+'assets/images/imgDefault.png'} alt=""></img></a>
                                                        : <a href={'/producto/' + item[1][0]["id"]}><img style={{ width: 65, height: 65, margin: 10 }} src={imgUrl + item[1][0]["image"]} alt=""></img></a>
                                                }

                                            </td>
                                            <td>
                                                <a href={'/producto/' + item[1][0]["id"]}><h5 style={{ color: "#C12C30" }}><b>{item[1][0]["product_name"]} <br /></b></h5></a><p>{item[1][0]["short_description"]}</p>
                                            </td>
                                            <td>
                                                {"$" + item[0][0]["unit_price"]}
                                            </td>
                                            <td>
                                                <input style={{ width: 50 }} type="number" defaultValue={item[0][0]["amount"]} min="1" max="100" name='foo' onChange={() => { test() }} />
                                            </td>
                                            <td>
                                                {"$" + item[0][0]["total_price"]}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td colSpan="1"><b>Total:</b></td>
                                        <td colSpan="1"><b>{'$' + costo_total.toFixed(2) + 'MXN'}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='container' style={{ textAlign: "end", width: "85%" }}>
                        <button onClick={() => { makeOrder() }} style={{ backgroundColor: "#C12C30", color: "white" }} className="btn btnRemove">Proceder al pago</button>
                    </div>
                </div>

            </div>



            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body>
                    <div>
                        <h3>Eliminar de carrito de compras</h3>
                        <p>¿seguro que quieres eliminar al producto de tu carrito de compras?</p>

                        <button className='btn' onClick={() => { methodDelCarShop() }} style={{ float: "right", backgroundColor: "#C12C30", color: "white" }}>Eliminar</button>
                        <button className='btn btn-secondary' style={{ marginRight: 10, float: "right" }} onClick={handleClose}>Cancelar</button>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )

}
export default UserCarShop;