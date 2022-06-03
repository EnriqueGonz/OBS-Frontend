import React, {useState,useEffect} from 'react';
import axios from 'axios';

import '../config';
import AppbarAdmin from './AppbarAdmin';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('tokenAdmin');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminOpiniones = () =>{
    const [listOpiniones,setlistOpiniones] = useState([]);

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/opinions/api/all-opinions/',{headers})
          .then((response) => {
            setlistOpiniones(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistOpiniones])

      function reloadOpiniones(){
        axios.get(baseUrl+'/opinions/api/all-opinions/',{headers})
        .then((response) => {
          console.log(response);
          setlistOpiniones(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }


      function setVisible(id){
        axios.put(baseUrl+'/opinions/api/update/'+id+'/',{},{headers})
        .then((response) => {
          reloadOpiniones();

        })
        .catch((error) => {
          console.log(error);
        });
      }

      function deleteOpinion(id){
        axios.delete(baseUrl+'/opinions/api/delete/'+id+'/',{headers})
        .then((response) => {
          reloadOpiniones();

        })
        .catch((error) => {
          console.log(error);
        });
      }
      
    

    return(    
        <>
        <AppbarAdmin/>
        <div className='container'>
            <div style={{paddingBottom:25}}>
                {listOpiniones.map((item,index) => (
                    <div key={index} style={{width:"100%",backgroundColor:"#E4E4E4",padding:25,marginBottom:20}}>
                        <div className='row'>
                            <div className='col-12 col-md-7'>
                                <p><b>Titular de la opinion:</b></p>
                                <div style={{padding:15,backgroundColor:"white"}}>
                                    <span>{item.user}</span>
                                </div>

                                <p><b>Mensaje:</b></p>
                                <div style={{padding:15,backgroundColor:"white"}}>
                                    <span>{item.message}</span>
                                </div>
                                
                            </div>
                            <div className='col-12 col-md-5'>
                                <p><b>Fecha de comentario: </b></p>
                                <div style={{padding:15,backgroundColor:"white"}}>
                                    <span>{item.created_at}</span>
                                </div>
                                <p><b>Calificacion: </b></p>
                                <span id='estrellas'>
                                {(() => {
                                    const rows = [];
                                    for (let i = 0; i < item.rate; i++) {
                                    rows.push(<span key={i} style={{fontSize:30,color:"orange"}}>★</span>);
                                    }
                                    return rows;
                                })()}
                                </span>

                                <div className='row'>
                                    <div className='col'>
                                        {
                                            (item.is_visible === true)
                                            ? <button className='btn botonProductosAdmin' style={{margin:0,backgroundColor:"#282828",color:"white"}}  onClick = {() => { setVisible(item.id)}  }>Ocultar comentario</button>
                                            : <button className='btn botonProductosAdmin' style={{margin:0,backgroundColor:"transparent",color:"black",border:"solid #000"}}  onClick = {() => { setVisible(item.id)}  }>Mostrar comentario</button>
                                        }
                                    </div>
                                    <div className='col'>
                                        <button className='btn botonProductosAdmin' style={{margin:0,backgroundColor:"#C12C30",color:"white"}} onClick = {() => { deleteOpinion(item.id)} }>Eliminar comentario</button>
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
export default AdminOpiniones;