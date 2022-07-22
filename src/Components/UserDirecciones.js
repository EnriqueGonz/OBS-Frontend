import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');
var username = localStorage.getItem('username');
var iddireccion = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const UserDirecciones = () => {
    const [listDirecciones, setlistDirecciones] = useState([]);

    const [inputs, setinputs] = useState({
        street: '',
        avenue: '',
        neighborhood: '',
        street_number: '',
        apartment_number: '',
        postal_code: '',
        city: '',
        state: '',
        references: '',
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setinputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        try {
            axios.get(baseUrl + '/addresses/api/my-addresses/' + username + '/', { headers })
                .then((response) => {
                    console.log(response.data);
                    setlistDirecciones(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistDirecciones])

    function mostrarForm() {
        if (document.getElementById('addDireccion').style.display === "none") {
            document.getElementById('addDireccion').style.display = "block"
        } else {
            document.getElementById('addDireccion').style.display = "none"
        }
    }

    function reloadDirecciones() {
        axios.get(baseUrl + '/addresses/api/my-addresses/' + username + '/', { headers })
            .then((response) => {
                console.log(response.data);
                setlistDirecciones(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const AgregarDireccion = (evt) => {
        evt.preventDefault();
        axios.post(baseUrl + '/addresses/api/register/', {
            user: parseInt(id_usuario),
            street: inputs.street,
            avenue: inputs.avenue,
            neighborhood: inputs.neighborhood,
            street_number: inputs.street_number,
            apartment_number: inputs.apartment_number,
            postal_code: parseInt(inputs.postal_code),
            city: inputs.city,
            state: inputs.state,
            references: inputs.references,

        }, { headers })
            .then((response) => {
                console.log(response.data);
                mostrarForm();
                reloadDirecciones();
            })
            .catch((error) => {
                console.log(error.response);
            });

    }

    function eliminarDireccion() {
        
        var checkboxes = document.getElementsByName('direcciones');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked === true) {
                console.log(checkboxes[i].value);
                iddireccion = checkboxes[i].value
            }
        }

        axios.delete(baseUrl + '/addresses/api/delete/' + iddireccion + '/', { headers })
            .then((response) => {
                console.log(response.data);
                reloadDirecciones();
            })
            .catch((error) => {
                console.log(error.response);
            });

    }

    return (
        <>

            <div className='row'>
                <div className='col-12 col-md-6'>
                    <h3>Mis direcciones</h3>
                </div>
                <div className='col-12 col-md-5' style={{ textAlign: "end" }}>
                    <Button style={{ background: "#C12C30", borderRadius: 0, border: "none" }} type="button" onClick={() => { mostrarForm() }}>
                        <b>Añadir nueva direccion</b>
                    </Button>

                </div>
            </div>
            <hr></hr>
            <div style={{ width: "91%" }}>
                {listDirecciones.map((item, index) => (
                    <div key={index}>
                        <div className="form-check" style={{ padding: 5, marginBottom: 10, backgroundColor: "#ECECEC" }}>
                            <input className="form-check-input" type="radio" name="direcciones" id="Direccion" value={item.id} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                <span>{item.street} {item.avenue} Calle no. {item.street_number} No. de casa: {item.apartment_number} <br /> {item.neighborhood}, {item.city}, {item.state}. <br />CP: {item.postal_code} <br />Referencias: {item.references}</span>
                            </label>
                        </div>

                    </div>
                ))}


                <button className='btn' style={{ float: "right", backgroundColor: "#C12C30", borderColor: "#C12C30", color: "white", borderRadius: 0 }} onClick={() => { eliminarDireccion() }}> <b>Eliminar Direccion</b> </button>
            </div>
            <div className='row' id="addDireccion" style={{ display: "none" }}>
                <div className='col-12' style={{ padding: 30 }}>
                    <Form validated={true} onSubmit={AgregarDireccion}>
                        <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Nueva direccion</b></h2>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Calle</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="street" onChange={handleChange} value={inputs.street} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Avenida</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="avenue" onChange={handleChange} value={inputs.avenue} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="neighborhood" onChange={handleChange} value={inputs.neighborhood} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col} >
                                <Form.Label>Numero de calle:</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="street_number" onChange={handleChange} value={inputs.street_number} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Numero de apartamento:</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="apartment_number" onChange={handleChange} value={inputs.apartment_number} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Codigo postal: {" (5 digitos)"}</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required pattern="[0-9]{5}"  name="postal_code" onChange={handleChange} value={inputs.postal_code} placeholder='5 digitos' />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Ciudad:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="city" onChange={handleChange} value={inputs.city} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="state" onChange={handleChange} value={inputs.state} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>

                            <Form.Group as={Col}>
                                <Form.Label>Referencias:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} as='textarea' required type="text" name="references" onChange={handleChange} value={inputs.references} />
                            </Form.Group>
                        </Row>
                        <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="submit" >
                            <b>Agregar</b>
                        </Button>
                    </Form>
                </div>

            </div>



        </>
    )

}
export default UserDirecciones;