import React from 'react';
import imagen2 from '../images/img.png';
import imagen3 from '../images/pedidos.png';
import biclogo from '../images/marcas/bic.png';
import dixonlogo from '../images/marcas/DIXON.png';
import sharpielogo from '../images/marcas/sharpie.png';
import magistrallogo from '../images/marcas/magistral.png';


const Inicio = () =>{
    return(    
        <>
        <div style={{paddingBottom:50}}>
            <img src={imagen2} alt="" className="imgHeader"></img>
        </div>
        <div className='container' style={{width:"80%",paddingBottom:60}}>
            <div className='row'>
                <div className='col' style={{paddingBottom:10}}>
                    <img style={{width:"-webkit-fill-available"}} src={imagen3} alt=""></img>
                </div>
                <div className='col' style={{textAlign:"justify"}}>
                    <h4>Realiza tus pedidos desde la web</h4>
                    <span style={{fontSize:"14px"}}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.<br/><br/>
                    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                    </span>
                </div>
            </div>
        </div>
        <div className="barraInicio" style={{marginBottom:50}}>
            <div className="container">
                <div className="row rowContainer">
                    <div className="col">
                        +54<br/>
                        <span>Clientes satisfechos</span>
                    </div>
                    <div className="col">
                        +270<br/>
                        <span>Servicios realizados</span>
                    </div>
                    <div className="col">
                        +900<br/>
                        <span>Productos en existencias</span>
                    </div>
                    <div className="col">
                        +1000<br/>
                        <span>Productos vendidos</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='container' style={{width:"85%"}}>
            <h4>Contamos con las mejores marcas</h4>
        </div>
            
        <div>
            <div className="container" style={{backgroundColor:"#F4F4F4"}}>
            <div className="row rowContainerLogos">
                <div className="col">
                <img src={biclogo} alt="logo Bic" className="medidaLogos"></img>
                </div>
                <div className="col">
                <img src={dixonlogo} alt="Logo Dixon" className="medidaLogos"></img>
                </div>
                <div className="col">
                <img src={magistrallogo} alt="Logo Magistral" className="medidaLogos"></img>
                </div>
                <div className="col">
                <img src={sharpielogo} alt="Logo Sharpie" className="medidaLogos"></img>
                </div>
            </div>
            </div>
        </div>

        <div className="tablaContainer3" style={{textAlign:"-webkit-center"}}>
            <div className="cardRegistro" >
                <div className="row">
                    <div className="col-4" style={{height:50,borderRadius: "50px 0px 0px 0px",backgroundColor:"#32BD60"}}>
                    </div>
                </div>
                <div className="row">
                <div className="col" style={{backgroundColor:"#1D8D42"}}>
                    <div>
                    <h3>Registrate y cotiza tu primera compra</h3>
                    <p>Y asi experimenta lo facil y seguro que es comprar con nosotros</p>

                    <input placeholder="Ingresa tu correo electronico"></input>
                    <br/><br/>
                    <p>Se enviará una contraseña a tu dirección de correo electrónico.</p>
                    <p>Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web, gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra política de privacidad.</p>
                    </div>
                </div>                    
                </div>
            </div>
        </div>
        

        </>
    )

}
export default Inicio;