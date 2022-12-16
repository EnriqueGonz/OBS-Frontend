import React from 'react';
import imgFooter from '../images/LogoBN.png';
import { ReactComponent as IconEmail} from '../images/icons/email.svg'
import { ReactComponent as IconTelefono} from '../images/icons/telefono.svg'

const FooterOBS = () =>{
    return(    
        <>
        <div className='container-fluid' style={{padding:0,width:"100%",position:"relative",backgroundColor:"#3D3D3D"}}>
            <div className='container'>
                <div className='row' style={{marginTop:35, paddingTop:30,paddingBottom:15}}>
                    <div className='col-12 col-md-4' style={{borderRight: "3px solid #8B8B8B"}}>
                        <img src={imgFooter} alt='logoOBS' style={{width:200}}></img>
                    </div>
                    <div className='col-12 col-md-8'>
                        <div className='row' style={{paddingTop: 20}}>
                            <div className='col-12 col-md-6' style={{color:"white",lineHeight:"10px"}}>
                                <p><IconEmail/> contacto@officebs.com.mx</p>
                                <p><IconTelefono/>&nbsp; 56 21818583</p>
                                <p>Servicio:Lunes-Sabado / 9:00 - 18:00 hrs</p>
                            </div>
                            <div className='col-12 col-md-6' style={{color:"white",lineHeight:"10px"}}>
                                <p>Malinali S/N Col. Xochinahuac,</p>
                                <p>Alcaldía Azcapotzalco, c.p. 02125</p>
                                <p>CDMX</p>
                            </div>
                        </div>
                    </div>
                    <p style={{color:"white",paddingTop:15,textAlign:"right"}}>© 2021 Office Business Solution. Todos los derechos reservados | Aviso de Privacidad</p>
                </div>
            </div>
              
              
            
        </div>
        </>
    )

}
export default FooterOBS;