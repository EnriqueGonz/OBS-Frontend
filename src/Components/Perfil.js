import React, { useState } from 'react';
import header from '../images/headerPerfil.png';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import validator from 'validator'

const headers = {
    'Content-Type': 'application/json',
};


const Perfil = () => {
    const [inputUser, setInputUser] = useState({
        first_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });


    // inputs Validate
    const [validateFirstN, setValidateFirstN] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [pwDoNotMatch, setPwDoNotMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    function handleChangeRegister(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name, '  ', value);
        setInputUser(values => ({ ...values, [name]: value }))
    }


    function validatePassword() {
        let pw = inputUser.password;
        let confirmPw = inputUser.confirm_password;

        if (pw === confirmPw) {
            return true;
        } else {
            setErrorMessage(false);
            setPwDoNotMatch(true);
            return false;
        }
    }


    function validateIsStrong() {
        let value = inputUser.password;
        if (validator.isStrongPassword(value, {
            minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPwDoNotMatch(false);
            setErrorMessage(false);
        } else {
            setPwDoNotMatch(false);
            setErrorMessage(true);
        }
    }


    // Passwords do not match message
    const FirstNameMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese su nombre.</span>
        </div>
    )

    const EmailMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese un correo válido.</span>
        </div>
    )

    // Passwords do not match message
    const PwNotMatchMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Las contraseñas no coinciden.</span>
        </div>
    )

    // Passwordis not strong
    const PasswordNotStrongMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>La contraseña debe ser de al menos ocho caracteres, una mayúscula, un número y un símbolo como ! " ? % @ $.</span>
        </div>
    )


    const handleSubmitRegister = (evt) => {
        if (validator.isEmpty(inputUser.first_name)) {
            setValidateFirstN(true);
        } else {
            setValidateFirstN(false);
        }

        if (validator.isEmail(inputUser.email)) {
            setValidateEmail(false);
        } else {
            setValidateEmail(true);
        }

        let is_valid_pw = validatePassword();
        if (is_valid_pw === true) {
            setPwDoNotMatch(false);
            validateIsStrong();
            try {
                axios.post('http://127.0.0.1:8000/users/api/register/', {
                    first_name: inputUser.first_name,
                    last_name: 'null', // This field will send as null
                    email: inputUser.email,
                    password: inputUser.password,
                    phone: '', // This field will be sent empty
                    image: '', // This field will be sent empty
                }, { headers }).then((response) => {
                    console.log(response.data);
                }).catch((err) => {
                    console.log(err);
                });

            } catch (error) {
                //Show error here
            }
        } else {
            //
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
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="text" name="email" />
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Contraseña</Form.Label>*
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="password" name="password" />
                                </Form.Group>
                            </Row>
                            <a href="/retorepassword" style={{ paddingRight: 15 }}>¿Olvidate la contraseña</a>
                            <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right", borderStyle: "none" }} type="button">
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
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="text" name="first_name" value={inputUser.first_name} onChange={handleChangeRegister} />
                                    {validateFirstN ? <FirstNameMessage /> : null}
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Email *</Form.Label>*
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="email" name="email" value={inputUser.email} onChange={handleChangeRegister} />
                                    {validateEmail ? <EmailMessage /> : null}
                                </Form.Group>
                            </Row>

                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="" >
                                    <Form.Label>Contraseña *</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="password" name="password" value={inputUser.password} onChange={handleChangeRegister} />
                                </Form.Group>
                            </Row>

                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Confirma contraseña *</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="password" name="confirm_password" value={inputUser.confirm_password} onChange={handleChangeRegister} />
                                </Form.Group>

                                {/* Error message */}
                                {pwDoNotMatch ? <PwNotMatchMessage /> : null}
                                {errorMessage ? <PasswordNotStrongMessage /> : null}
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