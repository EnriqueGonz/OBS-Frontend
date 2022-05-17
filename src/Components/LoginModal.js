import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import validator from 'validator'
import '../config';


var baseUrl = global.config.i18n.route.url;
const headers = {
    'Content-Type': 'application/json',
};


const LoginModal = () => {


    // Login
    const [inputLogin, setInputLogin] = useState({
        emailLogin: '',
        passwordLogin: '',
    });

    // inputs validate Login
    const [validateEmailLogin, setValidateEmailLogin] = useState(false);
    const [validatePasswordLogin, setValidatePasswordLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);


    function handleChangeLogin(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name, '  ', value);
        setInputLogin(values => ({ ...values, [name]: value }))
    }



    const EmailMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese un correo válido.</span>
        </div>
    )

    const PasswordLoginMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese su contraseña.</span>
        </div>
    )

    // Login or Register Error
    const LoginErrorMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>El correo o la contraseña son incorrectas. Inténtelo de nuevo.</span>
        </div>
    )



    function validateEmailPwLogin() {
        setLoginError(false);
        // Email
        if (validator.isEmail(inputLogin.emailLogin)) {
            setValidateEmailLogin(false);
        } else {
            setValidateEmailLogin(true);
            return false;
        }

        // Password
        if (validator.isEmpty(inputLogin.passwordLogin)) {
            setValidatePasswordLogin(true);
            return false;
        } else {
            setValidatePasswordLogin(false);
        }


        return true;
    }

    const handleSubmitLogin = (evt) => {
        let isValidaEmailPwLogin = validateEmailPwLogin();

        if (isValidaEmailPwLogin === true) {
            try {
                axios.post(baseUrl+'/access/api/login/', {
                    email: inputLogin.emailLogin,
                    password: inputLogin.passwordLogin,
                }, { headers }).then((response) => {
                    console.log(response);
                    localStorage.clear();
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('idUsuario', response.data.pk);
                    localStorage.setItem('username', response.data.username);
                    //window.location.href = '/Micarrito'
                }).catch((err) => {
                    console.log(err);
                    setLoginError(true);
                });
            } catch (error) {
                //   
                setLoginError(true);
            }
        }
    }



    return (
        <>
            <div className="container" style={{ marginBottom: 50, marginTop: 50 }}>
                    <div className="container">
                        <Form onSubmit={handleSubmitLogin}>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Acceder</b></h2>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="text" name="emailLogin" value={inputLogin.emailLogin} onChange={handleChangeLogin} />
                                    {validateEmailLogin ? <EmailMessage /> : null}
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} >
                                    <Form.Label>Contraseña</Form.Label>*
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="password" name="passwordLogin" value={inputLogin.passwordLogin} onChange={handleChangeLogin} />
                                    {validatePasswordLogin ? <PasswordLoginMessage /> : null}
                                </Form.Group>
                                {loginError ? <LoginErrorMessage /> : null}
                            </Row>
                            <a href="/retorepassword" style={{ paddingRight: 15 }}>¿Olvidate la contraseña</a>
                            <p>¿No tienes una cuenta? <a href="/Perfil"><b style={{display:"inline-block",color:"#C12C30"}}>Registrate</b></a></p>
                            <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right", borderStyle: "none" }} type="button" onClick={handleSubmitLogin}>
                                <b>Acceder</b>
                            </Button>
                        </Form>
                    </div>
            </div>
        </>
    )
}

export default LoginModal;