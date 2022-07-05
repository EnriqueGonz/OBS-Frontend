import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Pedidos.css';
import axios from 'axios';
import '../config';


var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const UserPedidoSpecific = () => {
    var { idorder } = useParams(); // params

    const [listPedido, setlistPedido] = useState([]);
    const [listDetalles, setlistDetalles] = useState([]);
    const [listProductos, setlistProductos] = useState([]);

    useEffect(() => {
        try {
            axios.get(baseUrl + '/payment/api/specific-order/'+idorder+'/', { headers })
                .then((response) => {
                    console.log(response.data);
                    setlistPedido(response.data[0][0])
                    setlistDetalles(response.data[1])
                    setlistProductos(response.data[2])
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistPedido],[setlistDetalles],[setlistProductos])



    return (
        <>
            <div className='container containerDivs'>
                <h3>Detalles del pedido No. {listPedido.id}</h3>
            </div>

            <div className='container containerDivs' style={{display:"flex",overflowX:"auto",backgroundColor:"#ECECEC"}}>
                <div style={{display:"flex"}}>
                    {listProductos.map((item,index) => (
                        <div key={index} style={{border:"solid #B2B2B2 3px", width:150,height:150, marginRight:40,position:"relative",padding:25,borderRadius:15}}>
                            <img style={{width:100,height:100,objectFit:"cover"}} src={item[0].image} alt="" title={item[0].product_name}></img>
                        </div>
                    ))}
                </div>
            </div>

            <div className='container containerDivs' style={{backgroundColor:"#ECECEC",padding:15}}>
                {listProductos.map((item,index) => (
                    <p style={{margin:0}} key={index}>{item[0].amount} piezas {item[0].product_name}</p>
                ))}
            </div>

            <div className='container containerDivs'>
                <div className='row'>
                    <div className='col detallesPedido'>
                        <p className='detallesP'>Pedido realizado el dia:</p>
                        <p className='detallesP'>{listPedido.order_date}</p>
                    </div>
                    <div className='col detallesPedido'>
                        <p className='detallesP'>Costo total</p>
                        <p className='detallesP'>{listPedido.full_payment}</p>
                    </div>
                    <div className='col detallesPedido'>
                        <p className='detallesP'>Metodo de pago:</p>
                        <p className='detallesP'>{listPedido.payment_method}</p>
                    </div>
                    <div className='col' style={{backgroundColor:"#ECECEC"}}>
                        {
                            (listPedido.payment_method === "Mercado pago")
                                ? <div>
                                    <p className='detallesP'>¿Olvidaste Pagar?</p>
                                    <a href={'/checkout/buy/mercadopago/' + listPedido.qr_mercado_pago + '/'}>Ver codigo QR</a>
                                </div>
                                : <>
                                    <p className='detallesP'>Pedido</p>
                                    <p className='detallesP'>{listPedido.payment_status}</p>
                                </>
                        }

                    </div>
                </div>
            </div>

            <div className='container containerDivs'>
                <h3>Mas detalles</h3>
                    <table style={{width:"100%"}}>
                        <thead style={{borderBottom:"solid",borderBottomWidth:1,borderBottomColor:"#DFDFDF",textAlign:"start"}}>
                            <tr>
                                <th className="col" style={{width:"25%"}}></th>
                                <th className="col" style={{width:"25%"}}></th>
                                <th className="col" style={{width:"25%"}}></th>
                                <th className="col" style={{width:"25%"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProductos.map((item,index) =>(
                                <tr key={index} style={{borderBottom:"solid 1px #DFDFDF"}}>
                                    <td colSpan="1">
                                        <img src={item[0].image} alt="" style={{width:40,height:40,border:"solid",margin:5,borderWidth:1,borderColor:"#E7E7E7",borderRadius:5}}></img>
                                    </td>
                                    <td colSpan="1" style={{textAlign:"start"}}>
                                        <a className='nodecorationa' href={'/producto/'+ item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                        <span><span style={{fontWeight:700}}>Cantidad: {listDetalles[index].amount}</span></span>
                                    </td>
                                    <td colSpan="1" style={{textAlign:"start"}}>
                                        <span><span style={{fontWeight:700}}>Precio unitario: ${listDetalles[index].unit_price}MXN</span></span>
                                    </td>
                                    <td colSpan="1" style={{textAlign:"start"}}>
                                        <span><span style={{fontWeight:700}}>Precio unitario: ${listDetalles[index].total_price}MXN</span></span>
                                    </td>
                                </tr>
                            ))}
                            <tr style={{borderBottom:"solid 1px #DFDFDF"}}>
                                <td colSpan="3" style={{textAlign:"end"}}>
                                </td>
                                <td colSpan="1" style={{textAlign:"center"}}>
                                    <span><span style={{fontWeight:700}}>Total: ${listPedido.full_payment}MXN</span></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{textAlign:"end"}}>
                                    <a type='button' className='btn' href='https://api.whatsapp.com/send/?phone=525621818583&text=¡Hola!' style={{fontWeight:500,backgroundColor:"#404345",color:"white",marginRight:5}}><span>Dudas </span></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

            </div>






        </>
    )
}
export default UserPedidoSpecific;