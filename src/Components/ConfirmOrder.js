import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../images/HeaderCarrito.png';
import '../Productos.css';
import { Modal,Form,Col,Row,Button } from 'react-bootstrap';
import '../config';


var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
var id_usuario = localStorage.getItem('idUsuario');
var iddireccion = 0;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`
};




const ConfirmOrder = () => {
    const [listProducts, setlistProducts] = useState([]);

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


  useEffect(() => {
    try {
        axios.get(baseUrl+'/shoppingcart/api/my-shopping-cart/'+username+'/', { headers })
        .then((response) => {
          console.log(response);
          setlistProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log(' . ', error);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setlistProducts])

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


    let costo_total = 0;

    listProducts.map((item) =>(
        costo_total += parseFloat(item[0][0]["total_price"])

    ))

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

  function procederAlPago(){
      console.log('pagar')
      var checkboxes = document.getElementsByName('direcciones');
      for(var i=0, n=checkboxes.length;i<n;i++) {
          if(checkboxes[i].checked === true){
              console.log(checkboxes[i].value);
              iddireccion = checkboxes[i].value
          } 
      }

      if(iddireccion === 0){
          console.log('sin direccion');
          document.getElementById('msgError').style.display="block"
      }else{
            document.getElementById('msgError').style.display="none"

            let rowOrder = [];
            let datasUserRow = {
                user: id_usuario,
                addresses: iddireccion,
            }

            let datasOrderRow = []
            listProducts.map((item) =>(
                datasOrderRow.push({
                    products: item[0][0]["products_id"],
                    amount: item[0][0]["amount"],
                })
            ))
            
            rowOrder.push([datasUserRow]);
            rowOrder.push([datasOrderRow]);

            console.log(rowOrder);


            axios.post(baseUrl+'/orders/api/register/', {
                order: rowOrder
            }, { headers }
            ).then((response) => {
                console.log(response.data)

            }).catch((error) => {
                console.log(error)
            });
      }


  }

    



  return (
        <>
        <div>
            <img src={header} alt="" className="imgHeader"></img>
        </div>

        <div className='container' style={{marginTop:35}}>
            <h4><b>1.- Mis productos</b></h4>
        </div>
        <div className='container' style={{display:"flex",overflowX:"auto",backgroundColor:"#ECECEC"}}>
            <div style={{display:"flex"}}>
                {listProducts.map((item,index) => (
                    <div key={index} style={{border:"solid #B2B2B2 3px", width:150,height:150, marginRight:40,position:"relative",padding:25,borderRadius:15}}>
                        <img style={{width:100,height:100,objectFit:"cover"}} src={'https://obsbucket.s3.amazonaws.com/'+item[1][0].image} alt=""></img>
                    </div>
                ))}
            </div>
        </div>
        <div className='container' style={{backgroundColor:"#ECECEC",marginBottom:35,padding:15}}>
            {listProducts.map((item,index) => (
                <p style={{margin:0}} key={index}>{item[0][0].amount} {item[1][0].product_name}</p>
            ))}
        </div>

        <div className='container' style={{marginBottom:40}}>
            <h4><b>2.- Mis Direcciones</b></h4>
            <p id='msgError' style={{color:"red",display:"none"}}>Selecciona direccion</p>
            {listDirecciones.map((item,index) =>(
                <div key={index}>
                    <div className="form-check" style={{padding:5, marginBottom:10,backgroundColor:"#ECECEC"}}>
                        <input className="form-check-input" type="radio" name="direcciones" id="Direccion" value={item.id}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            <span>{item.street} {item.avenue} Calle no. {item.street_number} No. de casa: {item.apartment_number} <br/> {item.neighborhood}, {item.city}, {item.state}. <br/>CP: {item.postal_code} <br/>Referencias: {item.references}</span>
                        </label>
                    </div>
                    
                </div>
            ))}
            <button onClick = {() => { mostrarForm()} } style={{backgroundColor:"#C12C30",color:"white",float:"right" }} className="btn btnRemove">Agregar direcciones</button> 

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
        </div>

        <div className='container'>
            <h4><b>3.- Formas de pago</b></h4>
            <div className="form-check" style={{padding:5, marginBottom:10,backgroundColor:"#ECECEC"}}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    PayPal
                </label>
            </div>
            <div className="form-check" style={{padding:5, marginBottom:10,backgroundColor:"#ECECEC"}}>
                <input className="form-check-input" type="radio" name="flexRadioDefault"/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Tarjeta de credito/ debito
                </label>
            </div>
            <div className="form-check" style={{padding:5, marginBottom:10,backgroundColor:"#ECECEC"}}>
                <input className="form-check-input" type="radio" name="flexRadioDefault"/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Mercado Pago
                </label>
            </div>
        </div>


        
        <div className='container' style={{backgroundColor:"#ECECEC",marginTop:35}}>
            <div className='row'>
                <div className='col' style={{textAlign:"end"}}>
                    <h2>Pagas:</h2>
                </div>
                <div className='col' style={{textAlign:"center"}}>
                    <h2><b>${costo_total}</b></h2>
                    <Button style={{ background: "#C12C30", borderRadius: 0, border: "none" }} type="button"  onClick={() => { procederAlPago()} } >
                        <b>Pagar</b>
                    </Button>
                </div>
            </div>
        </div>
        </>

  )

}
export default ConfirmOrder;