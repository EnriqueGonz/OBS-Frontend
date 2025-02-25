import React, { useState, useEffect } from 'react';

import { Form, Button, Row, Col, Modal, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import '../config';
import AppbarAdmin from './AppbarAdmin';

var baseUrl = global.config.i18n.route.url;
var imgUrl = global.config.i18n.route.imgUrl;


var token = localStorage.getItem('tokenAdmin');

var categoriaSeleccionada = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminAñadir = () => {
    const [listCategoria, setlistCategoria] = useState([]);
    const [listSubCategoria, setlistSubCategoria] = useState([]);
    const [listProductsErr, setlistProductsErr] = useState([])

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({
        nombre: "",
        descripcion: "",
        descripcion_corta: "",
        precio: "",
        existencias: "",

        category: "",
        categoryAdd: ""
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        //console.log(name, value)
    }

    function loadSubcategorias(evt) {

        categoriaSeleccionada = parseInt(document.getElementById('selectCategoria').value)
        console.log(categoriaSeleccionada);

        listCategoria.map((item, index) => (
            (item[0][0].id === categoriaSeleccionada)
                ? setlistSubCategoria(item[1])
                : console.log('')

        ))

    }

    //get categorias
    useEffect(() => {
        try {
            axios.post(baseUrl + '/categories/api/get-list/', {
                category_name: ""
            }, { headers })
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

    //delete categoria
    function methodEliminarCategoria() {

        var checkboxes = document.getElementsByName('foo');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked === true) {
                axios.delete(baseUrl + '/categories/api/delete/' + checkboxes[i].value + '/', { headers })
                    .then((response) => {
                        loadCategories();

                    })
                    .catch((error) => {
                    });
            }
        }
    }
    function methodEliminarSubCategoria() {

        var checkboxes = document.getElementsByName('subcategorias');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked === true) {
                axios.delete(baseUrl + '/subcategories/api/delete/' + checkboxes[i].value, { headers })
                    .then((response) => {
                        loadCategories();
                        console.log(response)

                    })
                    .catch((error) => {
                    });
            }
        }
    }


    //post categoria
    const handleSubmitCategoria = (event) => {
        event.preventDefault();
        axios.post(baseUrl + '/categories/api/register/', {
            category_name: inputs.category,
        }, { headers })
            .then((response) => {
                //console.log(response);
                loadCategories();
                inputs.category = ""

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmitCategoriaAdd = (event) => {
        event.preventDefault();
        axios.post(baseUrl + '/subcategories/api/register', {
            categories: parseInt(document.getElementById('selectCategoriaAdd').value),
            subcategory_name: inputs.categoryAdd,
        }, { headers })
            .then((response) => {
                //console.log(response);
                loadCategories();
                inputs.category = ""

            })
            .catch((error) => {
                console.log(error);
            });
    }

    //reload Categoria
    function loadCategories() {
        axios.post(baseUrl + '/categories/api/get-list/', {
            category_name: "",
        }, { headers })
            .then((response) => {
                //console.log(response);
                setlistCategoria(response.data)

            })
            .catch((error) => {
                console.log(error);
            });

    }

    //post producto
    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('categories', parseInt(document.getElementById('selectCategoria').value))
        formData.append('subcategory', parseInt(document.getElementById('selectSubCategoria').value))
        formData.append('product_name', inputs.nombre)
        formData.append('price', parseFloat(inputs.precio))
        formData.append('description', inputs.descripcion)
        formData.append('short_description', inputs.descripcion_corta)
        formData.append('unit_of_existence', parseInt(inputs.existencias))
        formData.append('amount', parseInt(inputs.existencias))
        formData.append('image', selectedFile)

        axios.post(baseUrl + '/products/api/register/',
            formData
            , { headers })
            .then((response) => {
                console.log(response);
                window.location.href = '/admin/productos'
            })
            .catch(err => {
                console.log(err.response);
            });

    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setPreview(objectUrl)
        document.getElementById('img1').style.display = "none"
    }

    function clickinput() {
        document.getElementById('inputIMG').click();
    }

    const handleSubmitExcel = (event) => {
        event.preventDefault()
        let formData = new FormData();
        formData.append('pathfile', selectedFile)

        axios.post(baseUrl + '/products/api/upload/',
            formData
            , { headers })
            .then((response) => {
                console.log(response);
                //window.location.href = "/admin/productos/";

            }).catch(err => {
                console.log(err.response)
                setlistProductsErr(err.response.data[1])
                document.getElementById("mensaje").style.display = "block"
            });
    }




    return (
        <>
            <AppbarAdmin />
            <div className='container' style={{ paddingTop: 40 }}>
                <div className='row' style={{ paddingBottom: 40 }}>
                    <div className='col'>
                        <h3><b>Añadir producto</b></h3>
                    </div>
                    <div className='col' style={{ textAlign: "end" }}>
                        <button className='btn' style={{ backgroundColor: "#C12C30", borderColor: "#C12C30", color: "white" }} onClick={() => { handleShow() }}>Subir por excel</button>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <button className='btn' style={{ position: "relative" }} onClick={() => { clickinput() }}>
                            <img id="img1" style={{ width: "90%" }} src={imgUrl + 'assets/images/imgDefault.png'} alt=""></img>
                            <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}><b>Selecciona imagen</b></p>
                            <img alt='' src={preview} style={{ width: "90%" }} />
                            <input type="file" id="inputIMG" onChange={handleFileSelect} style={{ display: "none" }}></input>
                        </button>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form validated={false} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group>
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control required type="text" name="nombre" className='inputRegistro' value={inputs.nombre} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group>
                                    <Form.Label id="errorcategoria">Selecciona categoria</Form.Label>
                                    <Form.Select id='selectCategoria' className='inputRegistro' required onChange={loadSubcategorias}>
                                        <option value="">Selecciona categoria</option>
                                        {listCategoria.map((item, index) => (
                                            <option key={index} value={item[0][0].id} >{item[0][0].category_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </Row>

                            <Row className="mb-3">
                                <Form.Group>
                                    <Form.Label id="errorcategoria">Selecciona subcategoria</Form.Label>
                                    <Form.Select id='selectSubCategoria' className='inputRegistro' required>
                                        {listSubCategoria.map((item, index) => (
                                            <option key={index} value={item.id} >{item.subcategory_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </Row>

                            <Row className="mb-3">
                                <Form.Group>
                                    <Form.Label>Descripcion Corta</Form.Label>
                                    <Form.Control required type="text" name="descripcion_corta" className='inputRegistro' value={inputs.descripcion_corta} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group>
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control required type="text" name="descripcion" className='inputRegistro' value={inputs.descripcion} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <InputGroup as={Col}>
                                    <InputGroup.Text id="basic-addon1">Precio</InputGroup.Text>
                                    <FormControl required type="text" name="precio" className='inputRegistro' value={inputs.precio} onChange={handleChange} />
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup>

                                <Form.Group as={Col}>
                                    <Form.Label>Existencias</Form.Label>
                                    <Form.Control required type="text" name="existencias" className='inputRegistro' value={inputs.existencias} onChange={handleChange} />
                                </Form.Group>





                            </Row>


                            <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#C12C30", borderColor: "#C12C30" }} type="submit" >
                                Agregar
                            </Button>
                        </Form>

                    </div>

                </div>

                <hr />

                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <span>Lista de categorias</span>

                        <div style={{ padding: 30, backgroundColor: "#DFDFDF" }}>
                            {listCategoria.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={item[0][0].id} name='foo' />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        {item[0][0].category_name}
                                    </label>
                                </div>
                            ))}

                            <div className='container' style={{ textAlign: "end" }}>
                                <Button style={{ backgroundColor: "#404345", borderColor: "#404345" }} onClick={() => { methodEliminarCategoria() }} >
                                    Eliminar
                                </Button>

                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-md-6'>
                        <span>Agregar nueva categoria</span>
                        <div style={{ padding: 30, backgroundColor: "#DFDFDF" }}>
                            <Form validated={false} onSubmit={handleSubmitCategoria}>
                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Nombre de la categoria</Form.Label>
                                        <Form.Control placeholder='Nombre de la categoria' required type="text" name="category" value={inputs.category} onChange={handleChange} />
                                    </Form.Group>

                                    <div className='container' style={{ textAlign: "center" }}>
                                        <Button style={{ marginTop: 25, width: "100%", backgroundColor: "#C12C30", borderColor: "#C12C30" }} type="submit">
                                            Registrar
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>

                    </div>

                </div>

                <hr />

                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <span>Lista de subcategoria</span>

                        <div style={{ padding: 30, backgroundColor: "#DFDFDF" }}>
                            {listCategoria.map((item, index) => (
                                <div key={index}>
                                    <h6><b>{item[0][0].category_name}</b></h6>
                                    {(listCategoria[index][1]).map((data, index2) =>
                                        <div key={index2} className="form-check">
                                            <input className="form-check-input" type="checkbox" value={data.id} name='subcategorias' />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                {data.subcategory_name}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className='container' style={{ textAlign: "end" }}>
                                <Button style={{ backgroundColor: "#404345", borderColor: "#404345" }} onClick={() => { methodEliminarSubCategoria() }} >
                                    Eliminar
                                </Button>

                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-md-6'>
                        <span>Agregar nueva Subcategoria</span>
                        <div style={{ padding: 30, backgroundColor: "#DFDFDF" }}>
                            <Form validated={false} onSubmit={handleSubmitCategoriaAdd}>
                                <Row className='mb-3'>
                                    <Form.Group>
                                        <Form.Label id="errorcategoria">Selecciona categoria</Form.Label>
                                        <Form.Select id='selectCategoriaAdd' required>
                                            <option value="">Selecciona categoria</option>
                                            {listCategoria.map((item, index) => (
                                                <option key={index} value={item[0][0].id} >{item[0][0].category_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">

                                    <Form.Group>
                                        <Form.Label>Nombre de la subcategoria</Form.Label>
                                        <Form.Control placeholder='Nombre de la Subcategoria' required type="text" name="categoryAdd" value={inputs.categoryAdd} onChange={handleChange} />
                                    </Form.Group>

                                    <div className='container' style={{ textAlign: "center" }}>
                                        <Button style={{ marginTop: 25, width: "100%", backgroundColor: "#C12C30", borderColor: "#C12C30" }} type="submit">
                                            Registrar
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>

                    </div>

                </div>

            </div>

            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body style={{ margin: 20 }}>
                    <div>
                        <h4>Subir productos por excel</h4>
                        <form onSubmit={handleSubmitExcel}>
                            <input type="file" onChange={handleFileSelect} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" /><br></br><br></br>
                            <Button type="submit" value="Upload File" style={{ backgroundColor: "#C12C30", borderColor: "#C12C30" }}>Cargar</Button>
                        </form>

                        <div>
                            <p id="mensaje" style={{ display: "none" }}>Hubo unos errores al subir estos productos, verifica sus datos:</p>
                            {listProductsErr.map((item, index) => (
                                <li key={index} style={{ color: "red" }}>{item.product_name}</li>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </>
    )

}
export default AdminAñadir;