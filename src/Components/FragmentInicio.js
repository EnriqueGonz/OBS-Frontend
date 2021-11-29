import React, {Component} from 'react';
import imagen2 from '../images/img.png';
import imagen3 from '../images/pedidos.png';
import biclogo from '../images/bic.png';
import dixonlogo from '../images/DIXON.png';
import sharpielogo from '../images/sharpie.png';
import magistrallogo from '../images/magistral.png';
import footerImg from '../images/Frame.png';
import logoobs from '../images/logoobsbyn.png';

class FragmentInicio extends Component{
  render(){
      return(
          <div>
            <div>
              <img src={imagen2} alt="" className="imgHeader"></img>
            </div><br/><br/><br/>
            <div className="divtablaContainer">
              <table className="tablaContainer">
                <tbody>         
                      <td className="containerTd">
                        <img src={imagen3} alt=""></img>
                      </td>       
                      <td className="containerTd">
                        <h4>Realiza tus pedidos desde la web</h4><br/>
                        <span className="spanClass">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.<br/><br/>
                        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        </span>
                        
                      </td>      
                </tbody><br/><br/><br/>
                <h4 className="tablaContainer">Te facilitamos tu trabajo</h4>
              </table>
            </div>
            <div className="barra">
              <div className="container">
                <div className="row rowContainer">
                  <div className="col">
                    54
                    <br/><span>Clientes satisfechos</span>
                  </div>
                  <div className="col">
                    270
                    <br/><span>Servicios realizados</span>
                  </div>
                  <div className="col">
                    900
                    <br/><span>Productos en existencias</span>
                  </div>
                  <div className="col">
                    +1000
                    <br/><span>Productos vendidos</span>
                  </div>
                </div>
              </div>
            </div>
            <br/><br/>
            <div className="divtablaContainer">
              <h4 className="tablaContainer2">Contamos con las mejores marcas</h4>
            </div>
            
            <div className="barra2">
              <div className="container contentlogos">
                <div className="row rowContainerLogos">
                  <div className="col">
                    <img src={biclogo} alt="logo Bic" className="medidaLogos"></img>
                  </div>
                  <div className="col">
                    <img src={dixonlogo} alt="Logo Dixon" className="medidaLogos"></img>
                  </div>
                  <div className="col">
                    <img src={magistrallogo} alt="Logo Magistral" className="medidaLogos"></img>
                  </div>
                  <div className="col">
                    <img src={sharpielogo} alt="Logo Sharpie" className="medidaLogos"></img>
                  </div>
                </div>
              </div>
            </div>

            <div className="divtablaContainer">
              <div className="tablaContainer3">
                <div className="cardRegistro">
                  <div className="row">
                    <div className="col-4 cardRegistro1">

                    </div>
                  </div>
                  <div className="row">
                    <div className="col cardRegistro2">
                      <div>
                      <h3>Registrate y cotiza tu primera compra</h3>
                      <p>Y asi experimenta lo facil y seguro que es comprar con nosotros</p>

                      <input placeholder="Ingresa tu correo electronico"></input>
                      <br/><br/>
                      <p>Se enviará una contraseña a tu dirección de correo electrónico.</p>
                      <p>Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web, gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra política de privacidad.</p>
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>

              <div>
                <div className="row rowfooter">
                  <div className="col-10">
                  <div class="container">
                    <br/><br/><br/>
                    
                    <div class="row">
                      <div class="col-sm-3">
                        <img src={logoobs}></img>
                      </div>
                      <div class="col-6 col-md-4">
                        <div className="textFooter">Contacto@officeobs.com.mx</div>
                        <div className="textFooter">56 21818583</div>
                        <div className="textFooter">Servicio:Lunes-Sabado / 9:00 - 18:00 hrs</div>

                      </div>
                      <div class="col-6 col-md-4">
                        <div className="textFooter">Malinali S/N Col. Xochinahuac,</div>
                        <div className="textFooter">Alcaldía Azcapotzalco, c.p. 02125</div>
                        <div className="textFooter">CDMX</div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12">
                      <br/><br/>
                      <div className="textFooter2">
                      © 2021 Office Business Solution. Todos los derechos reservados | Aviso de Privacidad
                      </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="col-2 imgfooter">
                    
                  </div>
                </div>
              </div>


            
            

          </div>
      )
  }

}

export default FragmentInicio;