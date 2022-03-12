import React from 'react';
import imgFooter from '../images/footer.png';
import { ReactComponent as IconEmail} from '../images/icons/email.svg'
import { ReactComponent as IconTelefono} from '../images/icons/telefono.svg'

const FooterOBS = () =>{
    return(    
        <>
        <div className='container-fluid' style={{padding:0,width:"100%",position:"relative"}}>
            <img alt="" style={{width:"100%"}} src={imgFooter}></img>
            <div className='bgFooterMovil' style={{width:"55%",position:"absolute",bottom:"10%",left:"22%"}}>
              <div className='row'>
                <div className='col' style={{color:"white",lineHeight:"10px"}}>
                  <p><IconEmail/> Contacto@officeobs.com.mx</p>
                  <p><IconTelefono/>&nbsp; 56 21818583</p>
                  <p>Servicio:Lunes-Sabado / 9:00 - 18:00 hrs</p>
                </div>
                <div className='col' style={{color:"white",lineHeight:"10px"}}>
                  <p>Malinali S/N Col. Xochinahuac,</p>
                  <p>Alcaldía Azcapotzalco, c.p. 02125</p>
                  <p>CDMX</p>
                </div>
              </div>
              <p style={{color:"white",paddingTop:30,textAlign:"center"}}>© 2021 Office Business Solution. Todos los derechos reservados | Aviso de Privacidad</p>
            </div>
        </div>
        </>
    )

}
export default FooterOBS;