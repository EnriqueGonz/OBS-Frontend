import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Form,Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';

import '../config';
import AppbarAdmin from './AppbarAdmin';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('tokenAdmin');

var categoriaSeleccionada = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminProductoUpdate = () =>{
    var { idproducto,idcategoria } = useParams(); // params
    const [listCategoria,setlistCategoria] = useState([]);
    const [listSubCategoria,setlistSubCategoria] = useState([]);

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [inputs, setInputs] = useState({
        product_name: "",
        description: "",
        short_description: "",
        price: "",
        unit_of_existence: "",
        image: "",
        category_name:"",
        subcategory_name:""
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    function loadSubcategorias(evt) {
        
        categoriaSeleccionada = parseInt(document.getElementById('selectCategoria').value)
        console.log(categoriaSeleccionada);

        listCategoria.map((item,index) =>(
            (item[0][0].id === categoriaSeleccionada)
            ? setlistSubCategoria(item[1])
            : console.log('')
    
        ))

    }

    //get categorias
    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/categories/api/get-list/',{
            category_name:""
          },{headers})
          .then((response) => {
            console.log(response.data);
            setlistCategoria(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistCategoria])

     //Get producto
    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/products/api/specific-product/'+idproducto+'/',{headers})
          .then((response) => {
            console.log(response.data[0]);
            setInputs(response.data[0])
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setInputs])

  

    //put producto
    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('categories', parseInt(document.getElementById('selectCategoria').value))
        formData.append('subcategory', parseInt(document.getElementById('selectSubCategoria').value))
        formData.append('product_name', inputs.product_name)
        formData.append('price', parseFloat(inputs.price))
        formData.append('description', inputs.description)
        formData.append('short_description', inputs.short_description)
        formData.append('unit_of_existence', parseInt(inputs.unit_of_existence))
        formData.append('amount', parseInt(inputs.unit_of_existence))
        formData.append('image', selectedFile)

        axios.put(baseUrl + '/products/api/update/'+idproducto+'/',
        formData
        , { headers })
        .then((response) => {
            console.log(response);
            window.location.href = '/admin/productos'
        })
        .catch(err => {
            console.log(err.response);
            if( document.getElementById('selectSubCategoria').value === ""){
                document.getElementById('msgerror').style.display ="block";
            }else{
                document.getElementById('msgerror2').style.display ="block";
            }
            
        });
    
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])        
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setPreview(objectUrl)
        document.getElementById('img1').style.display = "none"
    }

    function clickinput(){
        document.getElementById('inputIMG').click();
    }

      
    

    return(    
        <>
        <AppbarAdmin/>
        <div className='container' style={{paddingTop:40}}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <h3><b>Editar producto</b></h3>
                    <button className='btn' style={{position:"relative"}} onClick={() => { clickinput() }}>
                        {
                            (inputs.image === "")
                            ? <img id="img1" src='https://obsbucket.s3.amazonaws.com/assets/images/imgDefault.png' alt="" style={{width:"100%",objectFit:"cover"}}></img>
                            : <img id="img1" src={'https://obsbucket.s3.amazonaws.com/'+ inputs.image} alt="" style={{width:"100%",objectFit:"cover"}}></img>
                        }
                        
                        <p style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}><b>Selecciona imagen</b></p>
                        <img alt='' src={preview} style={{ width: "90%" }} />
                        <input type="file" id="inputIMG" onChange={handleFileSelect}  style={{display:"none"}}></input>
                    </button>
                </div>
                <div className='col-12 col-md-6'>
                    <Form validated={false} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group>
                                <Form.Label>Nombre del producto</Form.Label>
                                <Form.Control required type="text" name="product_name" className='inputRegistro'  value={inputs.product_name} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group>
                                <Form.Label id="errorcategoria">Selecciona categoria</Form.Label>
                                <Form.Select id='selectCategoria' className='inputRegistro' required onChange={loadSubcategorias}>
                                    <option value={idcategoria}>{inputs.category_name}</option>
                                    {listCategoria.map((item, index) => (
                                        <option key={index} value={item[0][0].id} >{item[0][0].category_name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group>
                                <Form.Label id="errorcategoria">Selecciona subcategoria</Form.Label>
                                <Form.Select id='selectSubCategoria' className='inputRegistro' required>
                                    {listSubCategoria.map((item, index) => (
                                        <option key={index} value={item.id} >{item.subcategory_name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <span id="msgerror" style={{color:"red",display:"none"}}>Seleccione subcategoria {'(Vuela a seleccionar categoria si no aparecen las subcategorias)'}</span>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group>
                                <Form.Label>Descripcion Corta</Form.Label>
                                <Form.Control required type="text" name="short_description" className='inputRegistro' value={inputs.short_description} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group>
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control required type="text" name="description" className='inputRegistro' value={inputs.description} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control required type="text" name="price" className='inputRegistro' value={inputs.price} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Existencias</Form.Label>
                                <Form.Control required type="text" name="unit_of_existence" className='inputRegistro' value={inputs.unit_of_existence} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <span id="msgerror2" style={{color:"red",display:"none"}}>Algo salio mal, intentalo mas tarde.</span>

                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#C12C30", borderColor: "#C12C30" }} type="submit" >
                            Editar
                        </Button>
                    </Form>

                </div>

            </div>

            <hr />

        </div>


        </>
    )

}
export default AdminProductoUpdate;