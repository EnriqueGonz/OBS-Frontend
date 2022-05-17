import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../images/HeaderCarrito.png';
import '../Productos.css';
import { MdDeleteOutline, } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import '../config';


var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
var idproducto = 0;


const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`
};




const UserCarShop = () => {
    const [listProducts, setlistProducts] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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

    let costo_total = 0;


    listProducts.map((item) =>(
        costo_total += parseFloat(item[0][0]["total_price"])

    ))


    function methodRefreshList(){
        axios.get(baseUrl+'/shoppingcart/api/my-shopping-cart/'+username+'/', { headers })
        .then((response) => {
          console.log(response);
          setlistProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

   function methodModalDelCarShop(number){
      idproducto = number;
      handleShow();
    }

    function methodDelCarShop(){
        axios.delete(baseUrl+'/shoppingcart/api/delete/'+idproducto+'/', { headers })
        .then((response) => {
        console.log(response);
        if (response.status === 200) {
            handleClose();
            methodRefreshList();
        }
        })
        .catch((error) => {
        console.log(error);
        });
    }

    function methodReloadCarShop(){
        
        var inputsAmount = document.getElementsByName('foo');
        for(var i=0, n=inputsAmount.length;i<n;i++) {
            
            if( parseInt(inputsAmount[i].value) === parseInt(listProducts[i][0][0]["amount"])){
                console.log(listProducts[i][0][0]["amount"])
                console.log(inputsAmount[i].value )
            }else{
                console.log('-')
                axios.put(baseUrl+'/shoppingcart/api/update/'+listProducts[i][0][0]["id"]+'/',{
                    amount:parseInt(inputsAmount[i].value)
                }, { headers })
                .then((response) => {
                console.log(response);
                })
                .catch((error) => {
                console.log(error);
                });
            }

        }
        window.location.href = "/Micarrito"

    }

  return (
    <>
        <div>
              <img src={header} alt="" className="imgHeader"></img>
          </div>
      <div className='row'>
        <div className='col-12' style={{ padding: 20, textAlign:"-webkit-center" }}>
        <div style={{width:"85%"}}>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Eliminar</th>
                <th scope="col"></th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {listProducts.map((item,index) => (
                    <tr key={index}>
                        <td style={{position:"relative"}}>
                            <div style={{position:"absolute",top:"15%"}}>
                                <button onClick = {() => { methodModalDelCarShop(item[0][0]["id"])} } style={{ fontSize: 35 }} className="btn btnRemove"><MdDeleteOutline /></button>
                            </div>
                        </td>
                        <td>
                            <a href={'/producto/'+item[1][0]["id"]}><img style={{width:65,height:65,margin:10}} src={'https://obsbucket.s3.amazonaws.com/'+item[1][0]["image"]} alt=""></img></a>
                        </td>
                        <td>
                            <a href={'/producto/'+item[1][0]["id"]}><h5 style={{color:"#C12C30"}}><b>{item[1][0]["product_name"]} <br/></b></h5></a><p>{item[1][0]["description"]}</p>
                        </td>
                        <td>
                            {item[0][0]["unit_price"]}
                        </td>
                        <td>
                            <input style={{width:50}} type="number" defaultValue={item[0][0]["amount"]} min="1" max="100" name='foo'/>
                        </td>
                        <td>
                            {item[0][0]["total_price"]}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4"></td>
                    <td colSpan="1"><b>Total:</b></td>
                    <td colSpan="1"><b>{'$' + costo_total+'MXN'}</b></td>
                </tr>
                <tr>
                    <td colSpan="3">{/* <input type="text" placeholder='Ingresa Cupon:'  /><button style={{marginLeft:5,fontSize:13,backgroundColor:"#C12C30",color:"white" }} className="btn btnRemove">Aplicar cupon</button> */}</td>
                    <td colSpan="3" style={{textAlign:"-webkit-right"}}><button onClick = {() => { methodReloadCarShop()} } style={{backgroundColor:"#C12C30",color:"white" }} className="btn btnRemove">Actualizar carrito</button></td>
                </tr>
            </tbody>
        </table>

        
        </div>
        </div>
      </div>


      <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body>
                <div>
                    <h3>Eliminar de carrito de compras</h3>
                    <p>¿seguro que quieres eliminar al producto de tu carrito de compras?</p>

                    <button className='btn' onClick = {() => { methodDelCarShop()} } style={{float:"right",backgroundColor:"#C12C30",color:"white"}}>Eliminar</button>
                    <button className='btn btn-secondary' style={{marginRight:10,float:"right"}} onClick={handleClose}>Cancelar</button>
                </div>
            </Modal.Body>
        </Modal>

    </>
  )

}
export default UserCarShop;