import React, {useState,useEffect} from 'react';

import { Form } from 'react-bootstrap';
import axios from 'axios';

import '../config';
import AppbarAdmin from './AppbarAdmin';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('tokenAdmin');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminPedidos = () =>{
    const [listPedidos,setlistPedidos] = useState([]);

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/orders/api/all-orders/',{
            status: "",
            order_date:"",
          },{headers})
          .then((response) => {
            console.log(response);
            setlistPedidos(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistPedidos])

      
    

    return(    
        <>
        <AppbarAdmin/>
        <div className='container'>
            <div style={{paddingBottom:25}}>
                <div className='row'>
                    <div className='col'>
                        <h5>Filtrar por numero de pedido.</h5>
                        <div className="group">
                            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                            <input placeholder="Search" type="search" className="inputSearch"/>
                        </div>


                    </div>
                    <div className='col'>
                        <h5>Filtrar por fecha</h5>
                        <Form.Select id='selectCategoria' className='inputRegistro' required style={{borderRadius:8}}>
                            <option value="">Selecciona categoria</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            
                        </Form.Select>

                    </div>

                </div>
            </div>

            <div>
                {listPedidos.map((item,index) => (
                    <div key={index} style={{width:"100%",backgroundColor:"#E4E4E4",padding:25,marginBottom:20}}>
                        <div className='row'>
                            <div className='col-12 col-md-4'>
                                <p><b>Numero de pedido: </b>{item[0][0].delivery_number}</p>
                                <p><b>Fecha del pedido: </b>{item[0][0].order_date}</p>
                                <p><b>Status: </b>{item[0][0].status}</p>
                            </div>
                            <div className='col-12 col-md-8'>
                                <div className='row'>
                                    <div className='col'>
                                        <span>Fecha de compra</span>
                                        <div style={{backgroundColor:"white",padding:5,textAlign:"center"}}>
                                            <b>{item[0][0].order_date}</b>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <span>Pedido realizado</span>
                                        <div style={{backgroundColor:"white",padding:5,textAlign:"center"}}>
                                            <b>{item[0][0].order_date}</b>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <span>Estatus</span>
                                        <div style={{backgroundColor:"white",padding:5,textAlign:"center"}}>
                                            {
                                                (item[0][0].status === "Pendiente")
                                                ? <b><span className="badge" style={{backgroundColor:"#F9B233"}}> </span>{item[0][0].status}</b>
                                                : (item[0][0].status === "Entregado")
                                                ? <b><span className="badge" style={{backgroundColor:"#414141"}}> </span>{item[0][0].status}</b>
                                                : (item[0][0].status === "Cancelado")
                                                ? <b><span className="badge" style={{backgroundColor:"#C12C30"}}> </span>{item[0][0].status}</b>
                                                : (item[0][0].status === "En camino")
                                                ? <b><span className="badge" style={{backgroundColor:"#4ABA56"}}> </span>{item[0][0].status}</b>
                                                : <></>
                                            }
                                        </div>    
                                    </div>
                                    <br/><br/><br/>
                                    <span>Metodo de pago</span>
                                    <div style={{backgroundColor:"white",padding:5,marginLeft:12}}>
                                        <b>{item[0][0].status}</b>
                                    </div>   
                                    
                                </div>
                                

                            </div>
                        </div>

                    </div>
                ))}
            </div>
            


        </div>


        </>
    )

}
export default AdminPedidos;