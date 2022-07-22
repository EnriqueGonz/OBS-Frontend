import React from 'react';
import mercadoPago from '../images/mercadoPago.png';
import infoMercadoPago from '../images/infoMercagoPago.png';
import { useParams } from 'react-router-dom';
import '../Pedidos.css';

import QRCode from "react-qr-code";


const Testqr = () => {
    var { qrcode } = useParams(); // params
    
    return (
        <>
        <div className='container'>
            <br></br>
            <div className='row'>

                <div className='col-12 col-md-6'>
                    
                    <h3 style={{fontSize:42}}><b>ESCANEA Y PAGA</b></h3>
                    <h3 style={{fontSize:42}}>Desde tu celular</h3>

                    <ul>
                            <li><b>Paso 1</b> Ingresa a la App de Mercado Pago</li>
                            <li><b>Paso 2</b> Escanea el codigo QR</li>
                            <li><b>Paso 3</b> Seleccioná tu medio de pago: débito, crédito o dinero en Mercado Pago.</li>
                            <li><b>Paso 4</b> Avisá que pagaste ¡y listo!</li>
                    </ul>
                </div>

                <div className='col-12 col-md-6' style={{textAlign:"center"}}>
                    <div style={{backgroundColor:"#00B6F0"}}>
                        <img src={mercadoPago} alt="" style={{width:"60%",paddingTop:40,paddingBottom:40}}></img>
                        <div style={{ textAlign:"-webkit-center" }}>
                            <div className='Qrwidth' style={{backgroundColor:"white",padding:20}}>
                                <QRCode  level='L' title='Mercado Pago QR' value={qrcode} />
                            </div>
                        </div>
                        <h2 style={{color:"white"}}><b>ESCANEA Y PAGA</b></h2>
                        <br></br>
                    </div>
                    <div className='container' style={{backgroundColor:"white"}}>
                        <br></br>
                        <img src={infoMercadoPago} alt="" style={{width:"90%"}}></img>
                    </div>
                </div>

            </div>

        </div>
        
        

        </>
    )
}
export default Testqr;