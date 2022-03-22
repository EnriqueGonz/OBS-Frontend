import React,{ useState,useEffect } from 'react';
import { Form,Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';


var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const UserDatos = () =>{
    const [listUserData, setlistUserData] = useState([]);

    const [inputs, setInputs] = useState({
        actualPassword: "", // int
        newPassword: "", //This field can be left empty
        newPassword2: "",  //This field can be left empty
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value)
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() =>{  
        try {
          axios.get('https://obsbackend.herokuapp.com/users/api/user_details/'+id_usuario+'/',{ headers })
          .then((response) => {
            console.log(response.data);
            setlistUserData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistUserData])
    
    return(    
        <>
        <div className='row'>
            <div className='col-12 col-md-4 ' style={{marginBottom:50}}>
                <div className='datosPersonales'>
                    <p style={{marginBottom:0}}><b>Nombre:&nbsp;</b> </p>
                    <h5 style={{fontWeight:100}}>{listUserData.first_name}</h5>
                </div>
                <div className='datosPersonales'>
                    <p style={{marginBottom:0}}><b>Email:&nbsp;</b> </p>
                    <h5 style={{fontWeight:100}}>{listUserData.email}</h5>
                </div>
                <div className='datosPersonales'>
                    <p style={{marginBottom:0}}><b>Telefono:&nbsp;</b></p>
                    {
                        (listUserData.phone === null)
                        ? <h5 style={{fontWeight:100}}>Sin num.</h5>
                        : <h5 style={{fontWeight:100}}>{listUserData.phone}</h5>
                    }
                </div>
                <button className='btn' style={{backgroundColor:"#C12C30",color:"white"}}>Editar informacion</button>
            </div>
            
            <div className='col-12 col-md-8' style={{paddingRight:30}}>
                <Form>
                    <h2 style={{borderLeft:"solid",borderWidth:10,borderColor:"#C4C4C4"}}><b>&nbsp; Cambio de contraseña</b></h2>
                    <Row style={{marginBottom:5}}>
                        <Form.Group as={Col}>
                        <Form.Label>Contraseña actual</Form.Label>
                        <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="password" name="actualPassword" value={inputs.actualPassword} onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row style={{marginBottom:5}}>
                        <Form.Group as={Col}>
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="password" name="newPassword" value={inputs.newPassword} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row style={{marginBottom:5}}>
                        <Form.Group as={Col}>
                        <Form.Label>Repetir contraseña</Form.Label>
                        <Form.Control style={{backgroundColor:"#A1C4CE",borderRadius:0}} required type="password" name="newPassword2" value={inputs.newPassword2} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Button style={{marginTop:20,background:"#C12C30",borderRadius:0,border:"none",float:"right"}} type="button">
                        <b>CAMBIAR</b>
                    </Button>
                </Form> 
            </div>

        </div>
            
            
            
        </>
    )

}
export default UserDatos;