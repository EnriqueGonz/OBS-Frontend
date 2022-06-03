import React,{ useState,useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');
var username = localStorage.getItem('username');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const UserDirecciones = () => {
    const [listDirecciones, setlistDirecciones] = useState([]);

    const [inputs, setinputs] = useState({
        street: '',
        avenue: '',
        neighborhood: '',
        street_number:'',
        apartment_number:'',
        postal_code:'',
        city:'',
        state:'',
        references:'',
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setinputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/addresses/api/my-addresses/'+username+'/',{ headers })
          .then((response) => {
            console.log(response.data);
            setlistDirecciones(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistDirecciones])

      function mostrarForm(){
          if(document.getElementById('addDireccion').style.display === "none"){
              document.getElementById('addDireccion').style.display = "block"
          }else{
            document.getElementById('addDireccion').style.display = "none"
          }
      }

      function reloadDirecciones(){
        axios.get(baseUrl+'/addresses/api/my-addresses/'+username+'/',{ headers })
        .then((response) => {
          console.log(response.data);
          setlistDirecciones(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      }

      function AgregarDireccion(){
        axios.post(baseUrl+'/addresses/api/register/',{
            user:parseInt(id_usuario),
            street:inputs.street,
            avenue:inputs.avenue,
            neighborhood:inputs.neighborhood,
            street_number:inputs.street_number,
            apartment_number:"0",
            postal_code:parseInt(inputs.postal_code),
            city:inputs.city,
            state:inputs.state,
            references:inputs.references,

        },{ headers })
        .then((response) => {
            console.log(response.data);
            mostrarForm();
            reloadDirecciones();
        })
        .catch((error) => {
            console.log(error.response);
        });

      }

    return (
        <>

            <div className='row'>
                <div className='col-12 col-md-6'>
                    <h3>Mis direcciones</h3>
                </div>
                <div className='col-12 col-md-5' style={{textAlign:"end"}}>
                    <Button style={{ background: "#C12C30", borderRadius: 0, border: "none" }} type="button" onClick={() => { mostrarForm()} }>
                        <b>Añadir nueva direccion</b>
                    </Button>

                </div>
            </div>
            <hr></hr>
            <div>
                {listDirecciones.map((item,index) =>(
                    <div key={index}>
                        <p>{item.state}</p>

                    </div>
                ))}
            </div>
            <div className='row' id="addDireccion" style={{display:"none"}}>
                <div className='col-12' style={{ padding: 30 }}>
                    <Form>
                        <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Nueva direccion</b></h2>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Calle</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="street" onChange={handleChange} value={inputs.street} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Avenida</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="avenue" onChange={handleChange} value={inputs.avenue} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="neighborhood" onChange={handleChange} value={inputs.neighborhood} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col} >
                                <Form.Label>Numero de calle:</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="street_number" onChange={handleChange} value={inputs.street_number} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Codigo postal:</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="number" name="postal_code" onChange={handleChange} value={inputs.postal_code} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Ciudad:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="city" onChange={handleChange} value={inputs.city} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="state" onChange={handleChange} value={inputs.state} />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>

                            <Form.Group as={Col}>
                                <Form.Label>Referencias:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} as='textarea' required type="text" name="references" onChange={handleChange} value={inputs.references} />
                            </Form.Group>
                        </Row>
                        <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="button" onClick={() => {AgregarDireccion()}}>
                            <b>Agregar</b>
                        </Button>
                    </Form>
                </div>

            </div>



        </>
    )

}
export default UserDirecciones;