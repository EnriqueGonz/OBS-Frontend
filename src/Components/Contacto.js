import React, { useState } from 'react';
import header from '../images/headerContacto.png';
import { ReactComponent as IconEmail } from '../images/icons/email.svg'
import { ReactComponent as IconTelefono } from '../images/icons/telefono.svg'
import { ReactComponent as Redes } from '../images/icons/RedesSociales.svg'
import { ReactComponent as IconWhat } from '../images/icons/Whatsapp.svg'
import { Form, Button, Row, Col } from 'react-bootstrap';
import Maps from './Maps';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;


const Contacto = () => {
    const [validated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(baseUrl + '/mailer/api/emailjs-credentials/')
            .then((response) => {
                console.log(response)
                let emailJsData = response.data;
                let body = {
                    from_name: inputs.nombre,
                    from_email: inputs.correo,
                    reply_to: inputs.correo,
                    message: inputs.mensaje,
                }
                emailjs.send(emailJsData.service_id, emailJsData.template_id, body, emailJsData.public_key)
                    .then((result) => {
                        console.log(result)
                    }, (error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

  };


    const [inputs, setInputs] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    })

    function handleChange(evt) {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    return (
        <div>
            <div style={{ marginBottom: 50 }}>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className="container" style={{ paddingTop: 50 }}>
                <div className="row">
                    <div className='col'>
                        <h2><b>&nbsp; Contactanos</b></h2>
                        <p><IconEmail style={{ width: 30, height: "100%", filter: "invert(1)" }} /> contacto@officebs.com.mx</p>
                        <p><IconTelefono style={{ width: 23, height: "100%", filter: "invert(1)" }} />&nbsp; 56 21818583</p>
                    </div>
                    <div className='col'>
                        <h2><b>&nbsp; Visitanos</b></h2>
                        <div className='container'>
                            <Redes style={{ height: "100%", width: 135 }} />
                        </div>
                    </div>
                    <div className='col'>
                        <h2><b>&nbsp; Chateemos</b></h2>
                        <div className='container' style={{ paddingLeft: 80 }}>
                            <IconWhat style={{ width: 40 }} />
                        </div>
                    </div>

                </div>

            </div>


            <div className='container' style={{ marginTop: 50 }} >
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='column'>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Escribenos</b></h2>
                            <div className="container">
                                <Form validated={validated} onSubmit={handleSubmit}>
                                    <Row style={{ marginBottom: 5 }}>
                                        <Form.Group as={Col} controlId="">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="nombre" onChange={handleChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row style={{ marginBottom: 5 }}>
                                        <Form.Group as={Col} controlId="">
                                            <Form.Label>Email</Form.Label>*
                                            <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="correo" onChange={handleChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row style={{ marginBottom: 5 }}>
                                        <Form.Group as={Col} controlId="">
                                            <Form.Label>Mensaje</Form.Label>*
                                            <Form.Control as="textarea" style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="mensaje" onChange={handleChange} />
                                        </Form.Group>
                                    </Row>
                                    <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="submit">
                                        <b>Acceder</b>
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='column'>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Ubícanos</b></h2>
                        </div>
                        <Maps></Maps>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Contacto;