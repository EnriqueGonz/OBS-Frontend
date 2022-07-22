import React, { useEffect, useState } from 'react';
import header from '../images/headerTienda.png';
import axios from 'axios';
import '../Productos.css';
import { ReactComponent as IconCarShop } from '../images/icons/CarShop.svg'
import { Dropdown, Pagination, Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';
import '../config';


var baseUrl = global.config.i18n.route.url;
var paginas = 0;
var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const Tienda = () => {
    const [input, setInput] = useState({
        nombre: '',
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [listProducts, setlistProducts] = useState([]);
    const [listCategoria, setlistCategoria] = useState([]);
    const [array, setArray] = useState([]);
    const [nombreCategoria, setnombreCategoria] = useState("");
    const [nombreSubCategoria, setnombreSubCategoria] = useState("");

    document.title = "Office BS  nuestros articulos de papeleria"

    useEffect(() => {
        try {
            axios.post(baseUrl + '/categories/api/get-list/', {
                category_name: ""
            })
                .then((response) => {
                    console.log(response.data);
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
            axios.post(baseUrl + '/products/api/all-products/', {
                product_name: "",
                category_name: "",
                subcategory_name: "",
                page: 1,
            })
                .then((response) => {
                    console.log(response);
                    paginas = response.data[0][0]["num_pages"];
                    setlistProducts(response.data[1]);
                    for (let num = 0; num < array.length; num++) {
                        setArray([...array, num])

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistProducts], [setArray])

    function methodName(number) {

        if (nombreCategoria === "" && nombreSubCategoria === "" && input.nombre === "") {
            reloadproducts(number)
        } else if (input.nombre !== "") {
            reloadproducts3(number)
        } else if (nombreCategoria !== "" && nombreSubCategoria !== "") {
            reloadproducts2(number);

        }
    }

    function methodAddCarShop(id_producto) {
        if (token === null) {
            handleShow();
        } else {
            axios.post(baseUrl + '/shoppingcart/api/add/', {
                user: id_usuario,
                products: id_producto,
                amount: 1

            }, { headers })
                .then((response) => {
                    console.log(response);
                    window.location.href = "/Micarrito"
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function methodShowCarShop() {
        if (token === null) {
            handleShow();
        } else {
            window.location.href = "/Micarrito"
        }
    }


    let items = [];
    for (let number = 1; number <= paginas; number++) {
        items.push(
            <li className="page-item" key={number}><button style={{ width: 40 }} className="page-link" onClick={() => { methodName(number, nombreCategoria, nombreSubCategoria) }}>{number}</button></li>,
        );
    }

    const paginationBasic = (
        <div>
            <Pagination className='paginacion' style={{ placeContent: "center", display: "grid", gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto" }}>{items}</Pagination>
            <br />
        </div>
    );

    function reloadproducts(num) {
        axios.post(baseUrl + '/products/api/all-products/', {
            product_name: "",
            category_name: "",
            subcategory_name: "",
            page: num
        })
            .then((response) => {
                setlistProducts(response.data[1]);
                window.location.href = '#productos'
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function reloadproducts2(num) {
        axios.post(baseUrl + '/products/api/all-products/', {
            product_name: "",
            category_name: nombreCategoria,
            subcategory_name: nombreSubCategoria,
            page: num
        })
            .then((response) => {
                setlistProducts(response.data[1]);
                window.location.href = '#productos'
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function reloadproducts3(num) {
        axios.post(baseUrl + '/products/api/all-products/', {
            product_name: input.nombre,
            category_name: nombreCategoria,
            subcategory_name: nombreSubCategoria,
            page: num
        })
            .then((response) => {
                setlistProducts(response.data[1]);
                window.location.href = '#productos'
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function buscarPorNombre(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name, '  ', value);
        setInput(values => ({ ...values, [name]: value }))


        axios.post(baseUrl + '/products/api/all-products/', {
            product_name: input.nombre,
            category_name: nombreCategoria,
            subcategory_name: nombreSubCategoria,
            page: 1
        })
            .then((response) => {
                console.log(response);
                paginas = response.data[0][0]["num_pages"];
                setlistProducts(response.data[1]);
                for (let num = 0; num < array.length; num++) {
                    setArray([...array, num])

                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function buscarSubcategoria(categoria, subcategoria) {
        setnombreCategoria(categoria)
        setnombreSubCategoria(subcategoria)

        axios.post(baseUrl + '/products/api/all-products/', {
            product_name: "",
            category_name: categoria,
            subcategory_name: subcategoria,
            page: 1,
        })
            .then((response) => {
                console.log(response);
                paginas = response.data[0][0]["num_pages"];
                setlistProducts(response.data[1]);
                for (let num = 0; num < array.length; num++) {
                    setArray([...array, num])

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }




    return (
        <div style={{backgroundColor:"#F2F6F8"}}>
            <div>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className='CategoriasMenu'>
                {listCategoria.map((item, index) => (
                    <Dropdown key={index}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {item[0][0].category_name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {(listCategoria[index][1]).map((data, index2) =>
                                <Dropdown.Item key={index2} onClick={() => { buscarSubcategoria(item[0][0].category_name, data.id) }}>{data.subcategory_name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                ))}
            </div>


            <div id='wrapper' style={{ width: "100%", backgroundColor: "#F2F6F8" }}>
                <div id="sticky">
                    <button className='btn-flotante' onClick={() => { methodShowCarShop() }}><IconCarShop style={{ width: 30 }} /><br></br> Ir al carrito</button>
                </div>
                <a name='productos' href='/'> </a>

                <div className='row'>
                    <div className='col-12'>
                        <div className='container marginMovil' style={{ marginBottom: 20 }}>
                            <div style={{ textAlign: "-webkit-right" }}>
                                <div className="groupTienda">
                                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                    <input placeholder="Buscar por nombre" type="search" className="inputSearchTienda" name="nombre" value={input.nombre} onChange={buscarPorNombre} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='grid-container-productos'>
                                {listProducts.map((item, index) => (
                                    <div className='cardProducto' key={index} style={{ marginBottom: 20 }}>
                                        <div style={{ textAlign: "center", marginBottom: 10 }}>
                                            {
                                                (item.image === "")
                                                    ? <a href={'/producto/' + item.id}><img alt="" className='imgProducto' style={{ objectFit: "none" }} src='https://obsbucket.s3.amazonaws.com/assets/images/imgDefault.png'></img></a>
                                                    : <a href={'/producto/' + item.id}><img alt="" className='imgProducto' src={'https://obsbucket.s3.amazonaws.com/' + item.image}></img></a>
                                            }

                                        </div>
                                        <div style={{ margin: 15 }}>
                                            <div className='module line-clamp'>
                                                <a href={'/producto/' + item.id}><p style={{ fontWeight: "bold", color: "#C12C30" }}>{item.product_name}</p></a>
                                            </div>
                                            <h6>${item.price}</h6>
                                            <button className='btn' style={{ backgroundColor: "#C12C30", color: "white", borderRadius: 0, borderColor: "#C12C30" }} onClick={() => { methodAddCarShop(item.id) }}>Agregar al carrito</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>




            </div>

            <div className='container'>
                {paginationBasic}
            </div>

            
            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body>
                    <LoginModal />
                </Modal.Body>
            </Modal>




        </div>
    )
}

export default Tienda;