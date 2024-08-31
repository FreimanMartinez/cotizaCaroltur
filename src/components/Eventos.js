import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import {collection, getDocs, orderBy, query,} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { where } from "firebase/firestore";

import { useRef } from "react";
import './css/portafolio.css';


const Eventos = () => {
  const { municipio } = useParams();
  const [rutas, setRutas]=useState([])
  const rutasColection= collection(db,"rutas")
  const categoriasRutas= collection(db,"categoriasRutas")
  const [categorias, setCategorias] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [cargando, setCargando] = useState(true);
  
 
  const pageRef = useRef(null);

 
  console.log("entrando ando")
  if (pageRef.current === null) {
    pageRef.current = window.location.pathname;
  } else if (pageRef.current !== window.location.pathname) {
    window.location.reload();
  }

  const getRutas = async (filtro) => {
    
    var consulta;
    try {
      
      if( (municipio!=null)&&(filtro != "")){
        console.log("Ingresa al 1")
        consulta = query(
          rutasColection,
          where("municipio", "==", municipio),
          where("tipo", "==", filtro)
        );
      }
      else if( municipio!=null){
        console.log("Ingresa al 2")
        console.log("entra a esta parte")
        consulta = query(
          rutasColection,
          where("municipio", "==", municipio)
        );
      }
      else if (filtro === "") {
        console.log("Ingresa al 3")
        consulta = query(rutasColection, orderBy("municipio"));
      } else {
        console.log("Ingresa al 4")
        consulta = query(
          rutasColection,
          where("tipo", "==", filtro),
          orderBy("municipio"),
          //orderBy("tipo", "desc")
        );
      }
  
      const data = await getDocs(consulta);
      
      
      setRutas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setCargando(false);
    } catch (error) {
      console.error('Error al obtener las rutas:', error);
      // Define comportamiento alternativo en caso de error (ej., mostrar un mensaje al usuario)
      // Puedes usar un mensaje de alerta o una notificación dentro de la interfaz
      alert('Hubo un problema al acceder a la base de datos. Inténtalo de nuevo más tarde.');
    }
  };
  
  async function getCategorias(){
    const CategoriaRuta = await getDocs(categoriasRutas);
    setCategorias(CategoriaRuta.docs[0].data()); 
    console.log(categorias)
  }
  

  const handleChange = (e) => {
    setValorSeleccionado(e.target.value);
    console.log("Ingresa "+ e.target.value)
    getRutas(e.target.value);
    // Implement filtering logic here based on 'valorSeleccionado'
  };
  const categoriasArray = Object.keys(categorias);
  const opcionesSelect = categoriasArray.map((categoria) => (
    <option key={categoria} value={categoria}>
      {categorias[categoria]}
    </option>
  ));
  var cuentaMunicipio="";
  console.log(municipio)
  

  useEffect(()=>{
   
    getCategorias();
    getRutas("");
    
  },[])
    
  return (
    <div ><br></br>
    <center>
        <b>Tipo: </b>
      <select value={valorSeleccionado} onChange={handleChange}>
        <option value="">Todas las categorías</option>
        {opcionesSelect}
      </select>
      {cargando && <h1>Cargando...</h1>}
      {!cargando && rutas.length === 0 ? (
        <h1>En el momento no tenemos actividades de este tipo en {municipio}</h1>
      ) : (
        <div>
        {rutas.map((rutas)=>(
          
          <div key={rutas.id}>        
          
          {cuentaMunicipio!==rutas.municipio && ( // Check for different municipality
          <>            
            <h2><b>{cuentaMunicipio=rutas.municipio}</b></h2>
          </>
        )}
        
        <table className="table table-hover ">
        
          <tbody>
            
              <tr >                
                <table>
                  <tr>
                    <td colSpan={2} ><center> <h3><b>{rutas.Nombre}</b></h3> </center></td>
                  </tr>
                  <tr>
                    <td className="padin">
                    <div className=" row ">
                    <div class="col-md-4  text-center">
                    <img src={rutas.url} alt="Imagen de ejemplo" class='image-ruta'/></div>
                    <div class="col-md-8 pt-3 class-descip ">
                     {rutas.rDescripcion} 
                      <ul>
                        <li>Distancia: {rutas.Distancia}. 
                        </li>
                        <li className="text-left"> Grado de Dificultad (de 1 a 5): {rutas.GradoDificultad}. </li>
                      </ul><a href={"portafolio/"+rutas.id}>Ver más</a> 
                      </div>
                      </div>
                      
                      </td>
                  </tr>
                </table>
                
              </tr>
              </tbody>
              </table>
              </div>
            ))}
            </div>
            )}
          
          <br></br><br></br>
        
      

      </center>
    
  
    </div>
    
  );
};
export default Eventos;