import React,{useEffect,useState } from 'react';
import header from '../images/headerTienda.png';
import axios from 'axios';
import '../Productos.css';
import { ReactComponent as IconCarShop} from '../images/icons/CarShop.svg'
import { Dropdown,Pagination,Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';

var paginas = 0;
var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const Tienda = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [listProducts, setlistProducts] = useState([]);
    const [array,setArray] = useState([]);

    useEffect(() => {
        try {
            axios.post('https://obsbackend.herokuapp.com/products/api/get_list/',{
                product_name:"",
                page:1
            })
            .then((response) => {
            console.log(response);
            paginas = response.data[0][0]["num_pages "];
            setlistProducts(response.data[1]);
            for (let num = 0; num < array.length; num++) {
                setArray([...array, num])
                
            }
            })
            .catch((error) => {
            console.log(error);
            });
        } catch (error) {
        console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    },[setlistProducts],[setArray])

    function methodName(number){
        axios.post('https://obsbackend.herokuapp.com/products/api/get_list/',{
            product_name:"",
            page:number
        })
        .then((response) => {
        console.log(response);
        setlistProducts(response.data[1]);
        })
        .catch((error) => {
        console.log(error);
        });
    }

    function methodAddCarShop(id_producto){
        if(token === null){
            handleShow();
        }else{
            axios.post('https://obsbackend.herokuapp.com/shoppingcart/api/add/',{
                user:id_usuario,
                products:id_producto,
                amount:1

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

    function methodShowCarShop(){
        if(token === null){
            handleShow();
        }else{
            window.location.href="/Micarrito"
        }
    }


    let items = [];
    for (let number = 1; number <= paginas; number++) {
    items.push(
        <li className="page-item" key={number}><button className="page-link" onClick = {() => { methodName(number)} }>{number}</button></li>,
    );
    }

    const paginationBasic = (
        <div>
          <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
          <br />
        </div>
      );
      

    

    return(
        <div style={{height:"100%",width:"100%"}}>
          <div>
              <img src={header} alt="" className="imgHeader"></img>
          </div>

          <div className='CategoriasMenu'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Archivo
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Escritura
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                Oficina
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                Papel
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                Tecnología
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </div>


          <div id='wrapper' style={{width:"100%"}}>
            <div id="sticky">
                <button className='btn-flotante' onClick = {() => { methodShowCarShop()} }><IconCarShop style={{width:30}}/><br></br> Ir al carrito</button>
            </div>
            
            <div className='container'>
                <div className='grid-container-productos'>
                {listProducts.map((item,index) => (
                    <div key={index} style={{marginBottom:20}}>
                        <div style={{textAlign:"center",marginBottom:10}}>
                            <a href={'/producto/'+item.id}><img alt="" className='imgProducto' src={'https://obsbucket.s3.amazonaws.com/'+item.image}></img></a>
                        </div>
                        <div className='module line-clamp'>
                            <a href={'/producto/'+item.id}><p style={{fontWeight:"bold",color:"#C12C30"}}>{item.product_name}</p></a>
                        </div>
                        <h6>${item.price}</h6>
                        <button className='btn' style={{backgroundColor:"#C12C30",color:"white",borderRadius:0,borderColor:"#C12C30"}} onClick = {() => { methodAddCarShop(item.id)} }>Agregar al carrito</button>
                    </div>
                    ))}     
                </div>
            </div>

          </div>
          <br/><br/>

          <div>
              {paginationBasic}
          </div>
          
          
          <br/><br/><br/><br/>


          

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body>
                <LoginModal/>
            </Modal.Body>
        </Modal>
          


          
        </div>
    )
}

export default Tienda;