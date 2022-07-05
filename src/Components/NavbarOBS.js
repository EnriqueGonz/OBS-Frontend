import React from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';
import imgBanner from '../images/banner.png';
import { ReactComponent as IconEmail} from '../images/icons/email.svg'
import { ReactComponent as IconTelefono} from '../images/icons/telefono.svg'
import { ReactComponent as Logueo} from '../images/icons/IconLogueo.svg'
import { ReactComponent as Redes} from '../images/icons/RedesSociales.svg'

var name = localStorage.getItem('NombreUser');

const NavbarOBS = () =>{
    return(    
        <>
        <div >
            <div className="navbar navbarobs" style={{backgroundImage: `url(${imgBanner})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                <div style={{color:"white",paddingLeft:20}}>
                    <p><IconEmail/> Contacto@officeobs.com.mx</p>
                    <p><IconTelefono/>&nbsp; 56 21818583</p>
                </div>
                <div>
                    <p><b>Servicio: Lunes-Sábado / 9:00 -18:00 hrs</b></p>
                </div>
                <div style={{color:"white",paddingRight:20}}>
                    {(name === null)
                    ? <Redes/>
                    :   (name === "Administrador")
                        ?   <button className='btn' onClick={event =>  window.location.href='/admin/inicio'} style={{display:"flex",backgroundColor:"#FFF",border:"solid #000 2px",borderRadius:15}}>
                                <Logueo style={{width:"25px"}}/>   
                                <div>
                                    <h6 style={{margin:0}}>¡Bienvenido!</h6>
                                    <span>{name}</span>
                                </div>
                            </button>
                        :   <button className='btn' style={{display:"flex",backgroundColor:"#FFF",border:"solid #000 2px",borderRadius:15}}>
                                <Logueo style={{width:"25px"}}/>   
                                <div>
                                    <h6 style={{margin:0}}>¡Bienvenido!</h6>
                                    <span>{name}</span>
                                </div>
                            </button>
                    }
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
                    <Nav.Link href="/Inicio/">Inicio</Nav.Link>
                    <Nav.Link href="/Nosotros/">Nosotros</Nav.Link>
                    <Nav.Link href="/Tienda">Tienda</Nav.Link>
                    <Nav.Link href="/Perfil/">Perfil</Nav.Link>
                    <Nav.Link href="/contacto/">Contacto</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )

}
export default NavbarOBS;