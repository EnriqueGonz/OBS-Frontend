import React from 'react';
import { useParams } from 'react-router-dom';
import header from '../images/img.png';

import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;

const ConfirmMail = () => {
    var { uidd, rtoken } = useParams(); // params

    function confirmarMail() {

        axios.get(baseUrl + '/mailer/api/confirm-mail/' + uidd + '/' + rtoken + '/')
            .then((response) => {
                console.log(response);
                window.location.href = '/Perfil'
            })
            .catch((error) => {
                console.log(error);
            });
        
        
    }

    return (
        <div>
            <div style={{ marginBottom: 50 }}>
                <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div className='container' style={{ marginTop: 50 }} >
                <div className='container' style={{ width: "80%" }} >
                    <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Gracias por confirmar tu correo electronico</b></h2>
                    <p>Da click en el boton para iniciar sesion con tus datos</p>

                    <button className='btn' onClick={() => confirmarMail()}>Confirmar</button>
                    
                </div>
            </div>

        </div>
    )

}

export default ConfirmMail;