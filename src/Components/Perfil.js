import React, { useState } from 'react';
import header from '../images/headerPerfil.png';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import validator from 'validator'

const headers = {
    'Content-Type': 'application/json',
};


const Perfil = () => {
    // Register
    const [inputUser, setInputUser] = useState({
        first_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    // inputs Validate Register
    const [validateFirstN, setValidateFirstN] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [pwDoNotMatch, setPwDoNotMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    // Login
    const [inputLogin, setInputLogin] = useState({
        emailLogin: '',
        passwordLogin: '',
    });

    // inputs validate Login
    const [validateEmailLogin, setValidateEmailLogin] = useState(false);
    const [validatePasswordLogin, setValidatePasswordLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);


    function handleChangeRegister(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name, '  ', value);
        setInputUser(values => ({ ...values, [name]: value }))
    }


    function handleChangeLogin(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name, '  ', value);
        setInputLogin(values => ({ ...values, [name]: value }))
    }


    //Messages
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

    const PasswordLoginMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese su contraseña.</span>
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

    // Login or Register Error
    const LoginErrorMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>El correo o la contraseña son incorrectas. Inténtelo de nuevo.</span>
        </div>
    )

    const RegisterErrorMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>¡Algo ha salido mal!, Inténtelo de nuevo.</span>
        </div>
    )


    function validatePassword() {
        let pw = inputUser.password;
        let confirmPw = inputUser.confirm_password;

        if (pw === confirmPw) {
            setErrorMessage(false);
            return true;
        } else {
            setPwDoNotMatch(true);
            return false;
        }
    }


    function validateIsStrong() {
        let value = inputUser.password;
        if (validator.isStrongPassword(value, {
            minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return true;
        } else {
            setErrorMessage(true);
            return false;
        }
    }

    function validateInputsRegister() {
        if (validator.isEmpty(inputUser.first_name)) {
            setValidateFirstN(true);
            return false;
        } else {
            setValidateFirstN(false);
        }

        if (validator.isEmail(inputUser.email)) {
            setValidateEmail(false);
        } else {
            setValidateEmail(true);
            return false;
        }

        return true;
    }

    const handleSubmitRegister = (evt) => {
        setRegisterError(false);
        setErrorMessage(false);

        let isValidInputsRegister = validateInputsRegister();
        let is_valid_pw = validatePassword();
        let passwordisStrong = validateIsStrong();


        if (is_valid_pw === true && isValidInputsRegister === true && passwordisStrong === true) {
            try {
                axios.post('https://obsbackend.herokuapp.com/users/api/register/', {
                    first_name: inputUser.first_name,
                    last_name: 'null', // This field will send as null
                    email: inputUser.email,
                    password: inputUser.password,
                }, { headers }).then((response) => {
                    console.log(response.data);
                }).catch((err) => {
                    console.log(err);
                    setPwDoNotMatch(false);
                    setRegisterError(true);
                });

            } catch (error) {
                //Show error here
                setPwDoNotMatch(false);
                setRegisterError(true);
            }
        } else {
            //
        }
    }


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
                axios.post('https://obsbackend.herokuapp.com/access/api/login/', {
                    email: inputLogin.emailLogin,
                    password: inputLogin.passwordLogin,
                }, { headers }).then((response) => {
                    console.log(response.data);
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

            <div>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className="container" style={{ marginBottom: 50, marginTop: 50 }}>
                <div className="grid-container">
                    <div className="container">
                        <Form onSubmit={handleSubmitLogin}>
                            <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Acceder</b></h2>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="text" name="emailLogin" value={inputLogin.emailLogin} onChange={handleChangeLogin} />
                                    {validateEmailLogin ? <EmailMessage /> : null}
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Contraseña</Form.Label>*
                                    <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0, borderStyle: "none" }} required type="password" name="passwordLogin" value={inputLogin.passwordLogin} onChange={handleChangeLogin} />
                                    {validatePasswordLogin ? <PasswordLoginMessage /> : null}
                                </Form.Group>
                                {loginError ? <LoginErrorMessage /> : null}
                            </Row>
                            <a href="/retorepassword" style={{ paddingRight: 15 }}>¿Olvidate la contraseña</a>
                            <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right", borderStyle: "none" }} type="button" onClick={handleSubmitLogin}>
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
                                {registerError ? <RegisterErrorMessage /> : null}
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