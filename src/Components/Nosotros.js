import React from 'react';
import imgServicios from '../images/circulos.png';
import header from '../images/header-nosotros.png';

const Nosotros = () =>{

      return(
          <div>
            <div style={{marginBottom:50}}>
              <img src={header} alt="" className="imgHeader"></img>
            </div>
            
            <div className="container grid-containerContacto">
                <div className="grid-item" style={{marginBottom:20}}>
                    <div className="column">
                        <h3 style={{fontSize:48}}>Calidad en nuestro articulos, al mejor precio.</h3>
                        <div style={{borderRadius:30,backgroundColor:"#C12C30",marginTop:30,padding:15}}>
                            <h2 style={{color:"white", paddingLeft:20}}> Servicio al cliente</h2>
                            <p style={{color:"white",paddingLeft:20}}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        </div>  
                    </div>
                </div>
                <div className="grid-item" style={{textAlign:"center"}}>
                    <div className="column">
                        <img alt="" src={imgServicios} style={{width:"70%"}}></img>
                    </div>
                </div> 
            </div>

            <div className='container' style={{marginTop:50}} >
                <div className='MisionVision'>
                    <div className='grid-item'>
                        <div className='column'>
                            <h2 style={{borderLeft:"solid",borderWidth:10,borderColor:"#C4C4C4"}}><b>&nbsp; Mision</b></h2>
                            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        </div>
                    </div>
                    <div className='grid-item'>
                        <div className='column'>
                            <h2 style={{borderLeft:"solid",borderWidth:10,borderColor:"#C4C4C4"}}><b>&nbsp; Vision</b></h2>
                            <p>Que nuestros productos sean de la preferencia de nuestros clientes por la calidad, innovación y precios accesibles, así como por el servicio otorgado.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="barraContacto" style={{marginTop:50,marginBottom:50,paddingLeft: 50,paddingTop: 110}}>
                <button className="btn btn-light" style={{fontSize: 26,fontWeight: "bold",borderRadius:25}}>CONTÁCTANOS</button>
            </div>
            
          </div>
      )

}

export default Nosotros;