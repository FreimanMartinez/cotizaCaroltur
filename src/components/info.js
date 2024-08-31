import React from "react";
import logo from '../img/image_metalica_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './css/info.css';
import carolinaImagen from '../img/carolina.jpeg';
import fiestas from '../img/carolina.jpeg';
import danzas from '../img/carolina.jpeg';
import santa from '../img/carolina.jpeg';

function Info() {
  const location = useLocation();
  const { ciudad } = location.state;

  return (
    <div class="municipio">
      {ciudad === "Gómez Plata" && (
        <p>Hola mundo de Gómez Plata</p>
      )}
      {ciudad === "Carolina" && (
        <>
            <center>
                <h1 class="titulo">Carolina del Príncipe</h1>
                <img src={carolinaImagen} class="fotoPueblo"></img>
            </center>
            <hr class="separa" ></hr>
            <div class="tableInfo">
                <div>
                    <h1>Ubicación</h1>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6915.840362631476!2d-75.28744886148672!3d6.724916973084243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4466459575f30d%3A0x594da5e5e7013e32!2sCarolina%2C%20Antioquia!5e1!3m2!1ses!2sco!4v1724777205569!5m2!1ses!2sco"
                        class="mapa"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div>
                    <h1>Datos Generales</h1>
                    <ul>
                        <li><b>Nombre: </b>Carolina del Principe.</li>
                        <li><b>Seudónimo: </b>Jardín Colonial de América.</li>
                        <li><b>Gentilicio: </b>Carolinitas.</li>
                        <li><b>Temperatura Promedio: </b>21°C.</li>
                        <li><b>Altura: </b>1800 msnm.</li>
                        <li><b>Economia: </b>Ganadería, Agricultura, Energía Eléctrica.</li>
                    </ul>
                </div>
            </div>
            <div class="historia">
                <h1>Historia</h1>
                <p>
                Carolina del Príncipe, fundada en 1787 en el Valle de los Osos, tiene sus raíces en la llegada de los españoles al territorio de la tribu indigena los Nutabes, donde establecieron esta provincia para proteger las rutas de transporte de oro hacia España. El nombre "Carolina" se otorgó en honor al Príncipe de España Carlos IV heredero de la corona, y en 1814 se convirtió en municipio durante el periodo de independencia. En el siglo XX, el municipio se dividió, dando lugar a Gómez Plata y Guadalupe. A pesar de ser el más pequeño en población, Carolina del Príncipe se beneficia económicamente de las represas de Miraflores y Troneras, que generan importantes regalías y contribuyen al desarrollo regional. La historia de la región también está marcada por la resistencia indígena y los esfuerzos de colonización que influyeron en la configuración de la zona.
                </p>
            </div>
            <div>
                <h1></h1>
                <div class="fiestasImg">
                    <div class="festividades">
                        <a href="/eventos"><img src={fiestas} ></img><center>
                        <span>Fiestas de los Balcones</span></center>
                        </a>
                        
                    </div>
                    <div class="festividades">
                        <a href="/eventos"><img src={fiestas} ></img><center>
                        <span>Festival de Danzas</span></center>
                        </a>
                        
                    </div>
                    <div class="festividades">
                        <a href="/eventos"><img src={fiestas} ></img><center>
                        <span class="eventoName">Festiestas Equinas</span></center>
                        </a>
                    </div>
                </div>
            </div>
        </>
      )}
     
      {ciudad === "Guadalupe" && (
        <p>Hola mundo de Guadalupe</p>
      )}
      {ciudad === undefined && (
        <h1>Ciudad no encontrada</h1>
      )}
    </div>
  );
}

export default Info;