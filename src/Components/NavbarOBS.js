import React from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';
import logo from '../images/LogoBN.png';
import telefono from '../images/phoneBN.png';
import email from '../images/emailBN.png';
import lineas from '../images/lineasNavbar.png';
import { ReactComponent as Logueo} from '../images/icons/IconLogueo.svg'
import { ReactComponent as Redes} from '../images/icons/RedesSociales.svg'

var name = localStorage.getItem('NombreUser');

const NavbarOBS = () =>{
    return(    
        <>
        <div >
            <div className="navbar navbarobs" style={{backgroundColor:"#3D3D3D"}}>
                <div className='container' style={{color:"white",paddingLeft:20,marginBottom: 20,marginTop:20}}>
                    <div>
                        <img alt="logoOBS" src={logo} style={{width:120, paddingRight:20,borderRight:"1px solid white"}}></img>
                        <a href='/contacto'>
                            <img alt="iconEmail" src={email} style={{width:65, marginLeft:50}}></img>
                        </a>
                        <a href='/contacto'>
                            <img alt='iconPhone' src={telefono} style={{width:65, marginLeft:30}}></img>
                        </a>
                    </div>
                    
                </div>

                <div style={{color:"white",paddingRight:20}}>
                    {(name === null)
                    ? <Redes/>
                    :   (name === "Administrador")
                        ?   <button className='btn' onClick={event =>  window.location.href='/admin/inicio'} style={{display:"flex",backgroundColor:"transparent",border:"solid #FFF 2px",borderRadius:15, color:"white"}}>
                                <Logueo style={{width:"25px"}}/>   
                                <div>
                                    <h6 style={{margin:0}}>¡Bienvenido!</h6>
                                    <span>{name}</span>
                                </div>
                            </button>
                        :   <button className='btn' style={{display:"flex",backgroundColor:"transparent",border:"solid #000 2px",borderRadius:15,color:"white"}}>
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
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor:"#3D3D3D"}}>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="">
                    </Nav>
                    <Nav>
                        <Nav.Link href="/Inicio/" style={{color:"white"}}>Inicio</Nav.Link>
                        <Nav.Link href="/Nosotros/" style={{color:"white"}}>Nosotros</Nav.Link>
                        <Nav.Link href="/Tienda" style={{color:"white"}}>Tienda</Nav.Link>
                        <Nav.Link href="/Perfil/" style={{color:"white"}}>Perfil</Nav.Link>
                        <Nav.Link href="/contacto/" style={{color:"white"}}>Contacto</Nav.Link>
                        <Nav.Link href="/Preguntas-Frecuentes/" style={{color:"white"}}>¿FyQ?</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand>
                    <img alt='' src={lineas} style={{width:""}}></img>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{color:"white"}} />
            
            </Container>
        </Navbar>
        </>
    )

}
export default NavbarOBS;