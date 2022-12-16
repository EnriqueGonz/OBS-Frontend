import React,{useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoginModal from './LoginModal';
import { Modal } from 'react-bootstrap';
import { MdAdd, MdRemove,MdCategory,MdInfo } from 'react-icons/md';
import '../config';


var baseUrl = global.config.i18n.route.url;
var imgUrl = global.config.i18n.route.imgUrl;

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
            axios.get(baseUrl+'/products/api/specific-product/'+idproducto+'/')
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
            axios.post(baseUrl+'/shoppingcart/api/add/',{
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
                        {
                            (listProduct.image  === "")
                            ? <img alt=""  style={{width:"100%",objectFit:"none"}} src={imgUrl+'assets/images/imgDefault.png'}></img>
                            : <img alt="" className='zoomHover' style={{width:"100%"}} src={ imgUrl+listProduct.image }></img>
                        }
                    </div>
                    <div className='col-12 col-md-1'></div>
                    <div className='col-12 col-md-5'>
                        <h1 style={{fontSize:"2rem"}}><b>{listProduct.product_name}</b></h1>

                        <h2>$ {listProduct.price}</h2>

                        <div style={{ display: "inline-flex", alignItems: "center" }}>
                            <h5 ><b>Cantidad: </b></h5>
                            <button style={{ fontSize: 25,padding: 0,display: "flex", paddingLeft:5, paddingRight:5 }} onClick={handleOnRemove} className="btn"><MdRemove /></button>
                            <h4 style={{ padding:10,backgroundColor:"gray",color:"white" }}>{amount}</h4>
                            <button style={{ fontSize: 25,padding: 0,display: "flex", paddingLeft:5, paddingRight:5 }} onClick={handleOnAdd} className="btn"><MdAdd /></button>
                            <button className='btn' style={{paddingRight:25,paddingLeft:25,backgroundColor:"#C12C30",color:"white"}} onClick = {() => { methodAddCarShop(listProduct.id)} }>Añadir al carrito</button>
                        </div>

                        <br/>
                        <div className='mt-3 mb-3'>
                            <p style={{fontSize:20, display:"flex",alignItems:"center"}} ><MdCategory/><b>Categoria: &nbsp;</b> {listProduct.category_name}</p>
                        </div>
                        <p style={{fontSize:20,}} ><MdInfo/><b>Descripcion:</b>{' '+listProduct.description}</p>
                        
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