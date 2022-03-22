import React, {useState} from 'react';
import '../Perfil.css';

import header from '../images/headerPerfil.png';
import UserDatos from './UserDatos';
import UserPedidos from './UserPedidos';
import UserDirecciones from './UserDirecciones';
import UserLogout from './UserLogout';


const PerfilMain = () =>{
    const [vista, setVista] = useState('Perfil');


      return(
          <>

            <div>
              <img src={header} alt="" className="imgHeader"></img>
            </div>

            <div style={{marginBottom:50,marginTop:50}}>
                <div className='grid-container-perfil'>
                    <div className="grid-item" style={{marginBottom:20}}>
                        <div className="column" style={{borderRight:"solid"}}>
                            <div className='btn-group'>
                                <button id='btnPerfil' className='btn btnposs' onClick = {() => { setVista('Perfil') } }><h4>Perfil</h4></button>
                                <button className='btn btnposs' onClick = {() => { setVista('Pedidos') } }><h4>Pedidos</h4></button>
                                <button className='btn btnposs' onClick = {() => { setVista('Direcciones') } }><h4>Direccion</h4></button>
                                <button className='btn btnposs' onClick = {() => { setVista('CerrarSesion') } }><h4>Cerrar Sesion</h4></button>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="column">
                            {(() => {
                            if (vista === 'Perfil') {
                            return (
                                <UserDatos/>
                            )
                            }
                            if (vista === 'Pedidos') {
                            return (
                                <UserPedidos/>
                            )
                            }
                            if (vista === 'Direcciones') {
                                return (
                                    <UserDirecciones/>
                            )
                            }
                            if (vista === 'CerrarSesion') {
                                return (
                                    <UserLogout/>
                            )
                            }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
      )
}

export default PerfilMain;