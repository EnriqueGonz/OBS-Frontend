import React from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';
import imgBanner from '../images/banner.png';
import { ReactComponent as IconEmail} from '../images/icons/email.svg'
import { ReactComponent as IconTelefono} from '../images/icons/telefono.svg'

const AppbarAdmin = () =>{

    function cerrarSesion(){
        localStorage.clear();
        window.location.href = "/inicio"
    }


    return(    
        <>
        <div >
            <div className="navbar navbarobs" style={{backgroundImage: `url(${imgBanner})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                <div style={{color:"white",paddingLeft:20}}>
                    <p><IconEmail/> contacto@officebs.com.mx</p>
                    <p><IconTelefono/>&nbsp; 56 21818583</p>
                </div>
                <div>
                    <p><b>Servicio: Lunes-Sábado / 9:00 -18:00 hrs</b></p>
                </div>
                <div style={{color:"white",paddingRight:20}}>
                    <button className='btn' onClick = {() => { cerrarSesion()} } style={{backgroundColor:"#C12C30",border:"solid #C12C30 2px",borderRadius:0}}> 
                        <div>
                            <h6 style={{marginBottom:0,color:"white"}}>Salir</h6>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container>
            <Navbar.Brand href="/Inicio/">OfficeBS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                    <Nav.Link href="/admin/inicio/">Inicio</Nav.Link>
                    <Nav.Link href="/admin/productos/">Productos</Nav.Link>
                    <Nav.Link href="/admin/añadir">Añadir</Nav.Link>
                    <Nav.Link href="/admin/pedidos/">Pedidos</Nav.Link>
                    <Nav.Link href="/admin/opiniones/">Opiniones</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )

}
export default AppbarAdmin;