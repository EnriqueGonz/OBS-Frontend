import React, { useState } from 'react';
import header from '../images/img.png';
import { Form,Button,Row,Modal,Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;

const ForgotPassword = () =>{
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [inputs, setinputs] = useState({
        email: '', // int
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setinputs(values => ({ ...values, [name]: value }))
    }



const enviarEmail = (event) => {

    event.preventDefault();
    axios.post(baseUrl+'/password/api/request-reset/',{
        email:inputs.email,
    })
    .then((response) => {
        console.log(response);
        handleShow();
    })
    .catch((error) => {
    console.log(error);
    document.getElementById('msgerror').style.display = "block"
    });
}



      return(
          <div>
            <div style={{marginBottom:50}}>
              <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className='container' style={{marginTop:50}} >
                <div className='container' style={{width:"80%"}} >
                    <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; ¿Olvidaste la contraseña?</b></h2>
                    <Form validated={false} onSubmit={enviarEmail}>
                        <Row style={{marginBottom:5}}>
                            <Form.Group as={Col} controlId="">
                            <Form.Label>Introduce Email:</Form.Label>
                            <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="email" name="email" value={inputs.email} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <span id="msgerror" style={{display:"none", color:"red"}}>&nbsp;&nbsp;Ocurrio un  error, valida que el correo sea valido.</span><br></br>
                        <span>&nbsp;&nbsp;Recibirás un correo electrónico con el enlace para poder cambiar tu contraseña</span><br></br>
                        <div className='container' style={{textAlign:"end"}}>
                            <Button style={{marginTop:20,background:"#C12C30",borderRadius:0,border:"none"}} type="submit">
                                <b>Enviar</b>
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            <Modal  show={show} size="lg">
            <Modal.Body>
                <div style={{textAlign:"center"}}>
                    <div className='container' style={{textAlign:"center"}}>
                        <img src='https://obsbucket.s3.amazonaws.com/mailings/images/logo.png' alt=""></img>
                    </div>
                    <br></br><br></br>
                    <h3>¡Solicitud para restablecer contraseña realizada con exito!</h3>
                    <h4>En breve recibiras las instrucciones para restablecer tu contraseña.</h4>
                    <h5>Gracias!</h5>
                    <p><b>-OfficeBS-</b></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:"#C12C30",border:"none",borderRadius:0}} onClick={event =>  window.location.href='/inicio'}><b>OK</b></Button>
            </Modal.Footer>
        </Modal>
            
          </div>
      )

}

export default ForgotPassword;