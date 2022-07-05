import React from 'react';
import { Button } from 'react-bootstrap';
import logoImg from '../images/LogoModal.png';
import successImg from '../images/Success.png';

function finalizarCompra() {
    window.location.href = "/inicio"
    
}

const SuccessShop = () => {
    
    return (
        <>
        <div className='container' style={{textAlign:"center"}}>
            <div className="row" style={{margin:20}}>
                <div className="col">
                    <img src={logoImg} alt="" style={{width:"90%",margin:15}}></img>
                </div>
                <div className="col" style={{textAlign:"center",paddingTop:35}}>
                    <img src={successImg} alt="" style={{width:65,paddingBottom:10}}></img>
                    <h4>Tu compra a sido un exito</h4>
                    <h5>Puedes consultar los detalles de tu pedido en <a href="/Perfil">"Mis pedidos"</a></h5>

                </div>
            </div>

            <Button style={{width:"80%",marginTop:20,backgroundColor:"#C12C30",borderColor:"#C12C30",color:"white" }} onClick = {() => { finalizarCompra()} } >
                Aceptar
            </Button>

        </div>
        

        </>
    )
}
export default SuccessShop;