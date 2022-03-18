import React, { useState } from 'react';
import header from '../images/headerPerfil.png';
import { Form, Button, Row, Col } from 'react-bootstrap';


const headers = {
    'Content-Type': 'application/json',
};


const Perfil = () => {
    const [inputUser, setInputUser] = useState({

    });


    function handleChangeRegister(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputUser(values => ({ ...values, [name]: value }))
    }

    const handleSubmitRegister = (evt) => {
        try {
            /*
            axios.post('https://yellowrabbit.herokuapp.com/addresses/api/register/', {
                user: idusuario,
                street: inputsDireccion.street,
                avenue: inputsDireccion.avenue,
                neighborhood: inputsDireccion.neighborhood,
                street_number: inputsDireccion.street_number,
                apartment_number: inputsDireccion.apartment_number,
                postal_code: inputsDireccion.postal_code,
                city: inputsDireccion.city,
                state: inputsDireccion.state,
                additional_data: inputsDireccion.additional_data,
            }, { headers }).then((response) => {
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });
            */
        } catch (error) {
            //Show error here
        }
    }



    return (
        <>

            <div>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className="container" style={{ marginBottom: 50, marginTop: 50 }}>
                <div className="grid-container">
                    <div className="container">
                        <Form>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Acceder</b></h2>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Contraseña</Form.Label>*
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                                </Form.Group>
                            </Row>
                            <a href="/retorepassword" style={{ paddingRight: 15 }}>¿Olvidate la contraseña</a>
                            <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="button">
                                <b>Acceder</b>
                            </Button>
                        </Form>
                    </div>
                    <div className="container">
                        <Form onSubmit={handleSubmitRegister}>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Registrate</b></h2>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Email *</Form.Label>*
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Contraseña *</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Confirma contraseña *</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                                </Form.Group>
                            </Row>
                            <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="button" onClick={handleSubmitRegister}>
                                <b>REGISTRARSE</b>
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>


            <div className="barraPerfil"></div><br /><br /><br />

        </>
    )
}

export default Perfil;