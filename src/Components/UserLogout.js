import React from 'react';


const UserLogout = () =>{

    function methodLogout(){
        localStorage.clear();
        window.location.href = "/Perfil"

    }
    
    return(    
        <>
        <div className='logout'>
            <h3>¿Seguro quieres cerrar sesion?</h3>

            <button className='btn' style={{backgroundColor:"#C12C30",color:"white",fontSize:""}} onClick = {() => { methodLogout()} }><b>CONTINUAR</b></button>
        </div>
            
            
            
        </>
    )

}
export default UserLogout;