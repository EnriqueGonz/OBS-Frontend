import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../config';
import validator from 'validator';


var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
//var id_usuario = localStorage.getItem('idUsuario');
var username = localStorage.getItem('username');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const UserDatos = () => {
    const [listUserData, setlistUserData] = useState([]);

    const [pwDoNotMatch, setPwDoNotMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [validatePhone, setValidatePhone] = useState(false);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    //const handleShow1 = () => setShow1(true);  

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [inputs, setInputs] = useState({
        actualPassword: '', // int
        newPassword: '', //This field can be left empty
        newPassword2: '',  //This field can be left empty
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    })

    const [inputsPassword, setinputsPassword] = useState({
        actualPassword: '', // int
        newPassword: '', //This field can be left empty
        newPassword2: '',  //This field can be left empty
    })

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

    const EmailMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese un correo válido.</span>
        </div>
    )
    const PhoneMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese un numero de 10 a 13 digitos.</span>
        </div>
    )

    function validatePassword() {
        let pw = inputsPassword.newPassword;
        let confirmPw = inputsPassword.newPassword2;

        if (pw === confirmPw) {
            setErrorMessage(false);
            return true;
        } else {
            setPwDoNotMatch(true);
            return false;
        }
    }

    function validateIsStrong() {
        let value = inputsPassword.newPassword;
        if (validator.isStrongPassword(value, {
            minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return true;
        } else {
            setErrorMessage(true);
            return false;
        }
    }

    function validarEmail() {

        if (validator.isEmail(inputs.email)) {
            setValidateEmail(false);
            return true
        } else {
            setValidateEmail(true);
            return false;
        }
    }
    function validarPhone() {
        if (validator.isMobilePhone(inputs.phone,['es-MX'])) {
            setValidatePhone(false);
            return true
        } else {
            setValidatePhone(true);
            return false;
        }
        
    }



    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        setinputsPassword(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        try {
            axios.get(baseUrl + '/users/api/my-account/' + username + '/', { headers })
                .then((response) => {
                    console.log(response.data);
                    setlistUserData(response.data);
                    setInputs(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistUserData], [setInputs])


    const methodUpdateUser = (evt) => {
        console.log('click')
        evt.preventDefault();
        let is_valid = validarEmail();
        let validPhone = validarPhone();

        if(is_valid === true && validPhone === true){
            axios.put(baseUrl + '/users/api/update-account/' + username + '/', {
                first_name: inputs.first_name,
                last_name: inputs.last_name,
                email: inputs.email,
                phone: inputs.phone,
            }, { headers })
                .then((response) => {
                    console.log(response);
                    window.location.href = "/Perfil/"
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        
    }

    const changePassword = (evt) => {
        evt.preventDefault();

        let is_valid_pw = validatePassword();
        let passwordisStrong = validateIsStrong();

        if (is_valid_pw === true && passwordisStrong === true) {
            if (inputsPassword.newPassword === inputsPassword.newPassword2) {
                axios.put(baseUrl + '/password/api/change-password/' + username + '/', {
                    old_password: inputs.actualPassword,
                    new_password: inputs.newPassword,
                }, { headers })
                    .then((response) => {
                        console.log(response);
                        localStorage.clear();
                        window.location.href = "/Perfil/"
                    })
                    .catch((error) => {
                        console.log(error.response.status);
                        if (error.response.status === 304) {
                            document.getElementById('msgAlerta').style.display = "block"
                        }else{
                            document.getElementById('msgPass').style.display = "block"
                        }
                        
                    });
            } else {
                
                document.getElementById('msgError').style.display = "block"
            }

        }


    }

    return (
        <>
            <h3>Mis datos</h3>
            <hr></hr>
            <div className='row'>
                <div className='col-12 col-md-4 ' style={{ marginBottom: 50 }}>
                    <div className='datosPersonales'>
                        <p style={{ marginBottom: 0 }}><b>Nombre:&nbsp;</b> </p>
                        <h5 style={{ fontWeight: 100 }}>{listUserData.first_name}</h5>
                    </div>
                    <div className='datosPersonales'>
                        <p style={{ marginBottom: 0 }}><b>Apellidos:&nbsp;</b> </p>
                        {
                            (listUserData.last_name === "null")
                                ? <h5 style={{ fontWeight: 100 }}>Sin asignar.</h5>
                                : <h5 style={{ fontWeight: 100 }}>{listUserData.last_name}</h5>
                        }
                    </div>
                    <div className='datosPersonales'>
                        <p style={{ marginBottom: 0 }}><b>Email:&nbsp;</b> </p>
                        <h5 style={{ fontWeight: 100 }}>{listUserData.email}</h5>
                    </div>
                    <div className='datosPersonales'>
                        <p style={{ marginBottom: 0 }}><b>Telefono:&nbsp;</b></p>
                        {
                            (listUserData.phone === null)
                                ? <h5 style={{ fontWeight: 100 }}>Sin num.</h5>
                                : <h5 style={{ fontWeight: 100 }}>{listUserData.phone}</h5>
                        }
                    </div>
                    <button className='btn' style={{ float: "right", backgroundColor: "#C12C30", color: "white" }} onClick={() => { handleShow() }}>Editar informacion</button>
                </div>

                <div className='col-12 col-md-8' style={{ paddingRight: 30 }}>
                    <Form validated={false} onSubmit={changePassword}>
                        <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Cambio de contraseña</b></h2>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Contraseña actual</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="actualPassword" value={inputsPassword.actualPassword} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="newPassword" value={inputsPassword.newPassword} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Repetir contraseña</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="newPassword2" value={inputsPassword.newPassword2} onChange={handleChange} />
                            </Form.Group>
                            {pwDoNotMatch ? <PwNotMatchMessage /> : null}
                            {errorMessage ? <PasswordNotStrongMessage /> : null}
                        </Row>
                        <p>Nota: *Al actualizar tu contraseña deberas iniciar sesion.</p>
                        <p id="msgPass" style={{ display: "none",color: "red" }}>Verifica que tus credenciales sean correctas.</p>
                        <p id="msgAlerta" style={{ display: "none" }}>Las contraseñas no esta siendo modificada</p>
                        <p id="msgError" style={{ color: "red", display: "none" }}>Error. Las contraseñas no coinciden</p>
                        <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="submit">
                            <b>CAMBIAR</b>
                        </Button>
                    </Form>
                </div>

            </div>

            <Modal show={show} size="lg" onHide={handleClose} >
                <Modal.Body>
                    <div>
                        <Form validated={false} onSubmit={methodUpdateUser}>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Actualizar datos</b></h2>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col}>
                                    <Form.Label>Nombre's:</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="first_name" value={inputs.first_name} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="last_name" value={inputs.last_name} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col}>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="email" value={inputs.email} onChange={handleChange} />
                                    {validateEmail ? <EmailMessage /> : null}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="number" name="phone" value={inputs.phone} onChange={handleChange} />
                                    {validatePhone ? <PhoneMessage /> : null}
                                </Form.Group>
                            </Row>

                            <div className='container mt-5' style={{textAlign:"end"}}>
                            {/* <Button variant="secondary" style={{border: "none", borderRadius: 0 }} onClick={handleClose}>Cancelar</Button> */}
                            <Button style={{ backgroundColor: "#C12C30", border: "none", borderRadius: 0 }} type="submit"><b>Actualizar datos</b></Button>
                            </div>
                        </Form>

                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={show1} size="md" onHide={handleClose1} >
                <Modal.Body>
                    <div>
                        <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Upsss...</h4>
                        <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Error</h3>
                        <p style={{ fontSize: 24, fontWeight: 300 }}>Ese producto esta en uso</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>



        </>
    )

}
export default UserDatos;