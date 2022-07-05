import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
//var id_usuario = localStorage.getItem('idUsuario');
var username = localStorage.getItem('username');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`
};




const UserPedidos = () => {
  const [listOrder, setlistOrder] = useState([]);


  useEffect(() => {
    try {
        axios.get(baseUrl+'/orders/api/my-orders/' + username + '/', { headers })
        .then((response) => {
          console.log(response);
          setlistOrder(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log(' . ', error);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setlistOrder])


  function redirectPedido(id){
      window.location.href = '/user/pedido/'+id+'/'
  }

  return (
    <>
    <h3>Mis pedidos</h3>
    <hr></hr>
      <div className='row'>
        <div className='col-12' style={{ padding: 20 }}>
            {listOrder.map((item,index) => (
                <div key={index} style={{width:"100%",backgroundColor:"#E4E4E4",padding:25, marginBottom:40}}>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <p><b>Numero de pedido: </b>{item[0][0].delivery_number}</p>
                            <p><b>Id del pedido: </b>{item[0][0].id}</p>
                            <p><b>Status: </b>{item[0][0].status}</p>
                        </div>
                        <div className='col-12 col-md-8'>
                            <div className='row' style={{overflow:"hidden"}}>
                                <div className='col'>
                                    <span>Fecha de compra</span>
                                    <div style={{backgroundColor:"white",padding:5,textAlign:"center"}}>
                                        <b>{item[0][0].order_date}</b>
                                    </div>
                                </div>
                                <div className='col'>
                                    <span>Costo total</span>
                                    <div style={{backgroundColor:"white",padding:5,textAlign:"center"}}>
                                        <b>${item[0][0].full_payment} MXN</b>
                                    </div>
                                </div>
                                <div className='col'>
                                    <span>Estatus</span>
                                    <div style={{backgroundColor:"white",padding:5,textAlign:"center"}}>
                                        {
                                            (item[0][0].status === "Pendiente")
                                            ? <b><span className="badge" style={{backgroundColor:"#F9B233"}}> </span>{item[0][0].status}</b>
                                            : (item[0][0].status === "Entregado")
                                            ? <b><span className="badge" style={{backgroundColor:"#26B9DD"}}> </span>{item[0][0].status}</b>
                                            : (item[0][0].status === "Cancelado")
                                            ? <b><span className="badge" style={{backgroundColor:"#C12C30"}}> </span>{item[0][0].status}</b>
                                            : (item[0][0].status === "En camino")
                                            ? <b><span className="badge" style={{backgroundColor:"#4ABA56"}}> </span>{item[0][0].status}</b>
                                            : <></>
                                        }
                                    </div>    
                                </div>
                                <br/><br/><br/>
                                <span>Productos</span>
                                <div style={{backgroundColor:"white",padding:5,marginLeft:12}}>
                                    <div className='container' style={{display:"flex",overflowX:"auto",padding:0}}>
                                        <div style={{display:"flex"}}>
                                            {listOrder[index][2].map((item2,index2) => (
                                                <img key={index2} style={{width:30,height:30,objectFit:"cover",borderRadius:50}} src={item2[0].image} alt=""></img>
                                            ))}
                                        </div>
                                    </div>
                                </div>   
                                
                            </div>
                            <div className='container' style={{textAlign:"end",paddingTop:15}}>
                                <button className='btn' style={{backgroundColor:"#C12C30",color:"white",borderRadius:0,borderColor:"#C12C30"}} onClick = {() => { redirectPedido(item[0][0].id)} }>Ver detalles</button>
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
export default UserPedidos;