import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import header from '../images/img.png';

import { Form, Button, Row, Modal, Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';
import validator from 'validator'

var baseUrl = global.config.i18n.route.url;
var imgUrl = global.config.i18n.route.imgUrl;

const RestorePassword = () => {
    var { uidd, rtoken } = useParams(); // params
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [pwDoNotMatch, setPwDoNotMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [inputs, setinputs] = useState({
        campo1: '',
        campo2: '',
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setinputs(values => ({ ...values, [name]: value }))
    }

    const PwNotMatchMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Las contraseñas no coinciden.</span>
        </div>
    )
    const PasswordNotStrongMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>La contraseña debe ser de al menos ocho caracteres, una mayúscula, un número y un símbolo como ! " ? % @ $.</span>
        </div>
    )

    function validatePassword() {
        let pw = inputs.campo1;
        let confirmPw = inputs.campo2;

        if (pw === confirmPw) {
            setErrorMessage(false);
            return true;
        } else {
            setPwDoNotMatch(true);
            return false;
        }
    }

    function validateIsStrong() {
        let value = inputs.campo1;
        if (validator.isStrongPassword(value, {
            minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return true;
        } else {
            setErrorMessage(true);
            return false;
        }
    }




    const restablecer = (evt) => {
        evt.preventDefault();

        let match = validatePassword();
        let strong = validateIsStrong();

        if (match === true && strong === true) {
            axios.post(baseUrl + '/password/reset/' + uidd + '/' + rtoken + '/', {
                password: inputs.campo1,
            })
                .then((response) => {
                    console.log(response);
                    handleShow();
                })
                .catch((error) => {
                    console.log(error);
                    document.getElementById('msgError').style.display = "block"
                });
        }
    }



    return (
        <div>
            <div style={{ marginBottom: 50 }}>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className='container' style={{ marginTop: 50 }} >
                <div className='container' style={{ width: "80%" }} >
                    <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; ¿Olvidaste la contraseña?</b></h2>
                    <Form validated={false} onSubmit={restablecer}>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Introduce Contraseña:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="campo1" value={inputs.campo1} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Confirma contraseña:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="campo2" value={inputs.campo2} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        {pwDoNotMatch ? <PwNotMatchMessage /> : null}
                        {errorMessage ? <PasswordNotStrongMessage /> : null}
                        <span id='msgError' style={{ color: "red", display: "none" }}>Ocurrio un error intentalo mas tarde.</span>

                        <div className='container' style={{ textAlign: "end" }}>
                            <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none" }} type="submit">
                                <b>Restablecer</b>
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            <Modal show={show} size="lg">
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <div className='container' style={{ textAlign: "center" }}>
                            <img src={imgUrl+'mailings/images/logo.png'} alt=""></img>
                        </div>
                        <br></br><br></br>
                        <h3>¡Contraseña actualizada con exito!</h3>
                        <h4>Inicia sesion en la plataforma con tu nueva contraseña.</h4>
                        <h5>Gracias!</h5>
                        <p><b>-OfficeBS-</b></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#C12C30", border: "none", borderRadius: 0 }} onClick={event => window.location.href = '/Perfil'}><b>OK</b></Button>
                </Modal.Footer>
            </Modal>

        </div>
    )

}

export default RestorePassword;