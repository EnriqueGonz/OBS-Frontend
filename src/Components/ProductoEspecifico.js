import React,{useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoginModal from './LoginModal';
import { Modal } from 'react-bootstrap';
import { MdAdd, MdRemove,MdCategory,MdReceiptLong,MdInfo } from 'react-icons/md';

var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const ProductoEspecifico = () =>{
    var { idproducto } = useParams(); // params
    const [amount, setAmount] = useState(1);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [listProduct, setlistProduct] = useState([]);

    useEffect(() => {
        try {
            axios.get('https://obsbackend.herokuapp.com/products/api/get_specific_product/'+idproducto+'/')
            .then((response) => {
            console.log(response);
            setlistProduct(response.data[0])
            })
            .catch((error) => {
            console.log(error);
            });
        } catch (error) {
        console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    },[setlistProduct])

    const handleOnAdd = () => {
        setAmount(amount + 1);
      };
    
      const handleOnRemove = index => {
        if (amount === 1) {
          console.log('No se puede restar mas')
        } else {
          setAmount(amount - 1);
        }
    
      };


    function methodAddCarShop(){
        console.log(idproducto);
        if(token === null){
            handleShow();
        }else{
            axios.post('https://obsbackend.herokuapp.com/shoppingcart/api/add/',{
                user:id_usuario,
                products:idproducto,
                amount:amount

            },{headers})
            .then((response) => {
            console.log(response);
            window.location.href = "/Micarrito"
            })
            .catch((error) => {
            console.log(error);
            });
        }

    }


      

    

    return(
        <div style={{height:"100%",width:"100%"}}>

            <div className='container'>
                <div className='row' style={{paddingTop:50}}>
                    <div className='col-12 col-md-1'></div>
                    <div className='col-12 col-md-4'>
                        <img alt="" style={{width:"100%"}} src={ 'https://obsbucket.s3.amazonaws.com/'+listProduct.image }></img>
                    </div>
                    <div className='col-12 col-md-1'></div>
                    <div className='col-12 col-md-5'>
                        <h1><b>{listProduct.product_name}</b></h1>

                        <h2>$ {listProduct.price}</h2>

                        <div style={{ display: "inline-flex", alignItems: "center" }}>
                            <h5><b>Cantidad: </b></h5>
                            <button style={{ fontSize: 25 }} onClick={handleOnRemove} className="btn"><MdRemove /></button>
                            <h4 style={{ padding:10,backgroundColor:"gray",color:"white" }}>{amount}</h4>
                            <button style={{  fontSize: 25 }} onClick={handleOnAdd} className="btn"><MdAdd /></button>
                            <button className='btn' style={{paddingRight:25,paddingLeft:25,backgroundColor:"#C12C30",color:"white"}} onClick = {() => { methodAddCarShop(listProduct.id)} }>Añadir al carrito</button>
                        </div>

                        <br/>
                        <div className='row'>
                            <div className='col'>
                                <p style={{fontSize:20}}><MdCategory/><b>Categoria:</b>{' '+listProduct.category_name}</p>
                            </div>
                            <div className='col'>
                                <p style={{fontSize:20}}><MdReceiptLong/><b>Marca:</b>{' '+listProduct.brand_name}</p>
                            </div>
                        </div>
                        <p style={{fontSize:20}}><MdInfo/><b>Descripcion:</b>{' '+listProduct.description}</p>
                        
                    </div>
                    <div className='col-12 col-md-1'></div>

                </div>

            </div>


            <Modal  show={show} size="md" onHide={handleClose} >
                <Modal.Body>
                    <LoginModal/>
                </Modal.Body>
            </Modal>  
        </div>
    )
}

export default ProductoEspecifico;