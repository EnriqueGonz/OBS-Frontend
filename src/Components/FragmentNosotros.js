import React, {Component} from 'react';
import logoobs from '../images/logoobsbyn.png';
import header from '../images/header-nosotros.png';

class FragmentNosotros extends Component{
  render(){
      return(
          <div>
            <div>
              <img src={header} alt="" className="imgHeader"></img>
            </div><br/><br/><br/>
            <div className="row">
                <div className="col-8">
                    <h3 style={{paddingLeft: 108,textAlign: "left",fontSize:68}}>Calidad en nuestro articulos, al mejor precio.</h3>
                    <div className="container direction">
                        <div className="divServ" style={{borderRadius:30}}>
                            <h2 style={{color:"white", paddingLeft:20}}> Servicio al cliente</h2>
                            <p style={{color:"white",paddingLeft:20}}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        </div>

                    </div>

                </div>
                <div className="col-4 nosotrosimg"></div>
            </div><br/><br/><br/>


            <div class="container">
            <div class="row justify-content-md-center">
                <div class="col col-lg-6" style={{padding:40}}>
                <h2>Mision</h2>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <hr style={{height:5}}></hr>
                </div>
                
                <div class="col col-lg-6" style={{padding:40}}>
                <h2>Vision</h2>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <hr style={{height:5}}></hr>
                </div>
            </div>
            </div>

            <div className="barraContacto">

            </div><br/><br/><br/>
            
            
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
      )
  }

}

export default FragmentNosotros;