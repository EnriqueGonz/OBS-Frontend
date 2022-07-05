import React from 'react';
import productos from '../images/admVistaProductos.png';
import anadir from '../images/admVistaAnadir.png';
import pedidos from '../images/admVistaPedidos.png';
import vistaUser from '../images/admVistaUser.png';
import AppbarAdmin from './AppbarAdmin';



const AdminInicio = () => {
    return (
        <>
            <AppbarAdmin />
            <div>
                <div className='container' style={{ marginTop: 25 }}>
                    <h3><b>¡Bienvenido</b></h3>
                    <h5>Admin</h5>
                </div>
                <div className='container' style={{ border: "Solid", borderColor: "#C12C30", borderRadius: 20, marginTop: 25, marginBottom: 25 }}>
                    <button className='btn container' onClick={event => window.location.href = '/admin/productos'}>
                        <div className='row'>
                            <div className='col-4' style={{ textAlign: "center", borderRight: "solid", borderColor: "#C12C30" }}>
                                <img className='InicioAdminBtns' src={productos} alt="" style={{ width: "40%" }}></img>
                            </div>
                            <div className='col-8' style={{ paddingLeft: 35 }}>
                                <div style={{ textAlign: "initial" }}>
                                    <h4><b>Ir a productos</b></h4>
                                    <span>Revisa el catálogo de tus productos, para saber existencias, marcar agotados y hacer un inventariado.</span>
                                </div>

                            </div>
                        </div>
                    </button>
                </div>
                <div className='container' style={{ border: "Solid", borderColor: "#639DAE", borderRadius: 20, marginBottom: 25 }}>
                    <button className='btn container' onClick={event => window.location.href = '/admin/añadir'}>
                        <div className='row'>
                            <div className='col-4' style={{ textAlign: "center", borderRight: "solid", borderColor: "#639DAE" }}>
                                <img className='InicioAdminBtns' src={anadir} alt="" style={{ width: "40%" }}></img>
                            </div>
                            <div className='col-8' style={{ paddingLeft: 35 }}>
                                <div style={{ textAlign: "initial" }}>
                                    <h4><b>Ir a añadir</b></h4>
                                    <span>Agrega productos, modifica los ya existentes, ya sea precio, existencias, detalles del producto, etc.</span>
                                </div>

                            </div>
                        </div>
                    </button>
                </div>
                <div className='container' style={{ border: "Solid", borderColor: "#C1347C", borderRadius: 20, marginBottom: 25 }}>
                    <button className='btn container' onClick={event => window.location.href = '/admin/pedidos'}>
                        <div className='row'>
                            <div className='col-4' style={{ textAlign: "center", borderRight: "solid", borderColor: "#C1347C" }}>
                                <img className='InicioAdminBtns' src={pedidos} alt="" style={{ width: "40%" }}></img>
                            </div>
                            <div className='col-8' style={{ paddingLeft: 35 }}>
                                <div style={{ textAlign: "initial" }}>
                                    <h4><b>Ir a pedidos</b></h4>
                                    <span>Revisa los detalles de pedidos, direcciones, estatus de los envíos, etc.</span>
                                </div>

                            </div>
                        </div>
                    </button>
                </div>
                <div className='container' style={{ border: "Solid", borderColor: "#1D8D43", borderRadius: 20, marginBottom: 25 }}>
                    <button className='btn container' onClick={event => window.location.href = '/inicio/'}>
                        <div className='row'>
                            <div className='col-4' style={{ textAlign: "center", borderRight: "solid", borderColor: "#1D8D43" }}>
                                <img className='InicioAdminBtns' src={vistaUser} alt="" style={{ width: "40%" }}></img>
                            </div>
                            <div className='col-8' style={{ paddingLeft: 35 }}>
                                <div style={{ textAlign: "initial" }}>
                                    <h4><b>Ir a vista de usuario</b></h4>
                                    <span>Entra a la página de Office BS desde la perspectiva de usuario para verificar la información y funcionamiento.</span>
                                </div>

                            </div>
                        </div>
                    </button>
                </div>
            </div>


        </>
    )

}
export default AdminInicio;