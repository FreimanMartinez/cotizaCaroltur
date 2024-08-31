import React from "react";
import logo from '../img/image_metalica_logo.png';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/home.css';


const Portafolio = () => {
  const dispositivo = localStorage.getItem("dispositivo");
  const navigate = useNavigate();
  console.log(dispositivo)
  if(dispositivo==="movile"){
    var claseVista="vistaMovile";
  }
  else{
    var claseVista="rower";
  }
  return (
    <div >
      <Helmet >
      <meta charset="UTF-8" />
      <title>Caroltur</title>
      
      </Helmet>
      <center class="contenidos">
        <header class='fondo-baner'>
          <img src={logo} alt="Imagen de ejemplo" class='image-baner'/>
          <h1>Agencia de viajes y operador turístico</h1>
          <p>Ofrecemos viajes y excursiones a los mejores destinos de Carolina del Príncipe, Gómezplata y Guadalupe.</p>
        </header>
        <div class="cuerpo">
          <div class={claseVista}>
            <div >
              <h1><a class="sinLinea" href="" onClick={() => navigate('/information', { state: { ciudad: 'Gómez Plata' } })}> Gómez Plata</a></h1>
              <table>
                
                <tr>
                <td align="center" class="img-home planes1"><b><a href="planes/Gómez Plata"><span class="otro">Planes</span></a></b></td>
                </tr>
                <tr>
                  <td class="espacio">----</td>
                </tr>
                <tr>                  
                <td align="center" class="img-home hoteles1"><b><a href="planes/Gómez Plata"><span class="otro">Hoteles</span></a></b></td>
                </tr>
              </table>
              
            </div>
            <div >
            <h1><a class="sinLinea" href="" onClick={() => navigate('/information', { state: { ciudad: 'Carolina' } })}> Carolina del Príncipe</a></h1>
              <table>
                <tr>
                  <td align="center" class="img-home planes2"><b><a href="planes/Carolina del Príncipe"><span class="otro">Planes</span></a></b></td>
                </tr>
                <tr>
                <tr>
                  <td class="espacio">----</td>
                </tr>
                </tr>
                <tr>                  
                <td align="center" class="img-home hoteles2"><b><span class="otro">Hoteles</span></b></td>
                </tr>
              </table>
            </div>
            <div >
            <h1><a class="sinLinea" href="" onClick={() => navigate('/information', { state: { ciudad: 'Guadalupe' } })}> Guadalupe</a></h1>
              <table>
                
                <tr>
                <td align="center" class="img-home planes3"><b><a href="planes/Guadalupe"><span class="otro">Planes</span></a></b></td>
                </tr>
                <tr>
                  <td class="espacio">----</td>
                </tr>
                
                <tr>                  
                <td align="center" class="img-home hoteles3"><b><span class="otro">Hoteles</span></b></td>
                </tr>
              </table>
            </div>
            
          </div>
        </div>
      </center>
      
    
  
    </div>
    
  );
};
export default Portafolio;