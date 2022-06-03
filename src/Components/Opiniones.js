import React, { useState } from 'react';
import header from '../images/img.png';
import { Form,Button,Row,Modal,Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;

var calificacion = 0;

const Opiniones = () =>{
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [inputs, setinputs] = useState({
        nombre: '', // int
        opinion: '', //This field can be left empty
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value)
        setinputs(values => ({ ...values, [name]: value }))
    }


function calificar(estrellas){
    calificacion = estrellas
    document.getElementById(estrellas+"estrella").style.color="orange"

    for (let i = 0; i < 5; i++) {
        if(i < estrellas){
            document.getElementById((i+1)+"estrella").style.color="orange"
        }else{
            document.getElementById((i+1)+"estrella").style.color="black"
        }
        
    }
}

function enviarOpinion(){
    console.log(document.getElementById('inputcheck').checked);
    if(calificacion === 0){
        document.getElementById('msgError').style.display= "block";

    }else if(document.getElementById('inputcheck').checked === true){
        document.getElementById('msgError').style.display= "none";
        document.getElementById('msgErroCheck').style.display= "none";

        axios.post(baseUrl+'/opinions/api/send-opinion/4/NjUxZjcwMjYxNDgwMWJjZjM2NjkyYjBlOGU5OTVjZDM',{
            user:inputs.nombre,
            message:inputs.opinion,
            rate:calificacion
        })
        .then((response) => {
            console.log(response);
            handleShow();
        })
        .catch((error) => {
        console.log(error);
        });
        
    }else{
        document.getElementById('msgErroCheck').style.display= "block";
    }
}



      return(
          <div>
            <div style={{marginBottom:50}}>
              <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className='container' style={{marginTop:50}} >
                <div className='contianer' style={{textAlign:"center",paddingBottom:30}}>
                    <img src='https://obsbucket.s3.amazonaws.com/mailings/images/logo.png' alt=""></img>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <Form>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Titular de opinión</Form.Label>
                                <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="text" name="nombre" value={inputs.nombre} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row style={{marginBottom:5}}>
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Opinion / Mensaje</Form.Label>*
                                <Form.Control as="textarea" style={{backgroundColor:"#A1C4CE",borderRadius:0}} required name="opinion" value={inputs.opinion} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Button style={{marginTop:20,background:"#C12C30",borderRadius:0,border:"none",float:"right"}} type="button" onClick = {() => { enviarOpinion()} }>
                                <b>Opinar</b>
                            </Button>
                        </Form> 
                    </div>
                    <div className='col-12 col-md-6'>
                        <h5>Calificanos</h5>
                        <span className='estrella' id="1estrella" onClick = {() => { calificar(1)} }>★</span>
                        <span className='estrella' id="2estrella" onClick = {() => { calificar(2)} }>★</span>
                        <span className='estrella' id="3estrella" onClick = {() => { calificar(3)} }>★</span>
                        <span className='estrella' id="4estrella" onClick = {() => { calificar(4)} }>★</span>
                        <span className='estrella' id="5estrella" onClick = {() => { calificar(5)} }>★</span>
                        <p id="msgError" style={{color:"red",display:"none"}}>Ingresa cantidad de estrellas</p>

                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id='inputcheck' ></input> 
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Al escribir tu opinión, aceptas que tu nombre, empresa y opinión “pueda” llegar a ser usada en los casos de éxito de la página para ayudar a los clientes potenciales a convencerse de nuestros servicios 
                        </label>
                        <p id="msgErroCheck" style={{color:"red",display:"none"}}>Debe aceptar las condiciones para poder enviar tu opinion</p>
                        </div>

                    

                    </div>
                </div>
            </div>

            <Modal  show={show} size="lg">
            <Modal.Body>
                <div style={{textAlign:"center"}}>
                    <div className='container' style={{textAlign:"center"}}>
                        <img src='https://obsbucket.s3.amazonaws.com/mailings/images/logo.png' alt=""></img>
                    </div>
                    <br></br><br></br>
                    <h3>¡Gracias por tus comentarios!</h3>
                    <h4>Tu opinion es muy importante para nosotros.</h4>
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

export default Opiniones;