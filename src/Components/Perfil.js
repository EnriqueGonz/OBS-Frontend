import React from 'react';
import header from '../images/headerPerfil.png';
import { Form,Button,Row,Col } from 'react-bootstrap';

const Perfil = () =>{
      return(
          <>

            <div>
              <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className="container" style={{marginBottom:50,marginTop:50}}>
                <div className="grid-container">
                    <div className="container">
                        <Form>
                            <h2 style={{borderLeft:"solid",borderWidth:10,borderColor:"#C4C4C4"}}><b>&nbsp; Acceder</b></h2>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Email</Form.Label>
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="text" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Contraseña</Form.Label>*
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="password" name="" />
                                </Form.Group>
                            </Row>
                            <a href="/retorepassword" style={{paddingRight:15}}>¿Olvidate la contraseña</a>
                            <Button style={{marginTop:20,background:"#C12C30",borderRadius:0,border:"none",float:"right"}} type="button">
                                <b>Acceder</b>
                            </Button>
                        </Form> 
                    </div>
                    <div className="container">
                        <Form>
                            <h2 style={{borderLeft:"solid",borderWidth:10,borderColor:"#C4C4C4"}}><b>&nbsp; Registrate</b></h2>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="text" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Email *</Form.Label>*
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="text" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Contraseña *</Form.Label>
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="password" name="" />
                                </Form.Group>
                            </Row>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Confirma contraseña *</Form.Label>
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="password" name="" />
                                </Form.Group>
                            </Row>
                            <Button style={{marginTop:20,background:"#C12C30",borderRadius:0,border:"none",float:"right"}} type="button">
                                <b>REGISTRARSE</b>
                            </Button>
                        </Form> 
                    </div>
                </div>
            </div>


            <div className="barraPerfil"></div><br/><br/><br/>
            
        </>
      )
}

export default Perfil;