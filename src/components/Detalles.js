import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {collection, getDocs, orderBy, query,} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { where } from "firebase/firestore";
import './css/portafolio.css';
import './css/style.css';
const imagenes = [
  require('../img/hoteles1.jpg'),
  require('../img/hoteles2.jpg'),
  require('../img/hoteles3.jpg'),
  require('../img/hoteles1.jpg'),
  require('../img/hoteles2.jpg'),
  require('../img/hoteles3.jpg'),
  require('../img/hoteles1.jpg'),
  require('../img/hoteles2.jpg'),
  require('../img/hoteles3.jpg'),
  // Agrega más imágenes según sea necesario
];

const Detalles = () => {
   const [rutas, setRutas]=useState([])
    //const { id } = useParams();
    const location = useLocation();
  const { id } = location.state;
    const rutasColection= collection(db,"rutas")
    const [cargando, setCargando] = useState(true);
    var variable=false;
    var album;

  


  const getRutas = async (filtro) => {
    console.log(filtro);
    var consulta;
  
    try {
      
      if (filtro === "") {
        console.log("intenta ingresar")
        consulta = query(rutasColection,orderBy("municipio"));
      } else {
        
        consulta = query(
          rutasColection,
          where("tipo", "==", filtro),
          orderBy("municipio"),
          //orderBy("tipo", "desc")
        );
      }  
      const data = await getDocs(consulta);
      console.log(data)
      setRutas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setCargando(false);
    } catch (error) {
      console.error('Error al obtener las rutas:', error);
      // Define comportamiento alternativo en caso de error (ej., mostrar un mensaje al usuario)
      // Puedes usar un mensaje de alerta o una notificación dentro de la interfaz
      
      alert('Hubo un problema al acceder a la base de datos. Inténtalo de nuevo más tarde.');
    }
    
  };
  const variables = () => {
    // Función para actualizar el valor de la variable
    // En este ejemplo, se cambia el valor a "false"
    console.log(variable)
    if (!variable){
    variable=!variable;}
    console.log(variable)
    return variable
  };

  const listar=(str)=>{
    console.log("Esta entrando a listar")
    console.log(str.split("-"))
    return str.split("-");
  }
  const crearAlbum=(fotosUrl)=>{
    album=fotosUrl.split("<->");
    return true;
  }
  const convertirVectorAArrayObjetos=(vector)=> {
    return vector.map((imagen) => {
      return { src: imagen };
    });
  }
  const navigate = useNavigate();
  const handleAlbumClick = (carpeta) => {
    console.log("ntra de una y lo redirecciona")
    navigate('/album',{state:{carpeta:carpeta}});
  };
  useEffect(()=>{
    getRutas("");
    
    
  },[])
  
  return (
    <body className='logo-fond'>
    <div class="p-4 text-size-min-max" >
      <br></br>
        {cargando && <h1>Cargando...</h1>}
        
        {!cargando && rutas.length === 0  ? (
          <h1>Esta actividad no esta disponible</h1>
        ) : (
          <div >
            
            {rutas.map((ruta) => (
              <div key={ruta.id} >
                {ruta.id == id && variables() ? (    
                              
                  <div >
                    <div class="text-justify">
                      <h1 class="text-center "><b>{ruta.Nombre}</b></h1>
                      <p >{ruta.Description}</p>
                    </div>  
                    <div className=''>
                      <div class="col-md-5 col-sm-6  text-left  " id='atractivos' > 
                        <h3 class="text-center"><b>Atractivos</b></h3>  
                        <ul >
                          {listar(ruta.atractivos).map((elemento) => (
                            <li key={elemento}>{elemento}</li>
                          ))}
                        </ul>                   
                        
                        <script>var j={ruta.atractivos}</script>
                      </div> 
                      <div class="col-md-2 col-sm-0  " >
                      </div> 
                      <div class="col-md-5 col-sm-6  text-left " >
                      <h3 class="text-center"><b>Datos Técnico</b></h3>
                      <ul>
                        <li><b>Distancia:</b> {ruta.Distancia}.</li>
                        <li>
                          <b>Grado de Dificultad (de 1 a 5)</b>:{" "}
                          {ruta.GradoDificultad}.
                        </li>
                      </ul>
                      <h3 class="text-center"><b>Incluye</b></h3>  
                        <ul >
                          {listar(ruta.incluye).map((elemento) => (
                            <li key={elemento}>{elemento}</li>
                          ))}
                        </ul>     
                      </div> 
                    </div>
                    <div class=" text-left" >
                      <h3 class="text-center"><b>Recomendaciones</b></h3>
                      <ul >
                        {listar(ruta.recomendaciones).map((elemento) => (
                          <li key={elemento}>{elemento}</li>
                        ))}
                      </ul> 
                    </div>
                    <div class="col-md-2 "></div>
                    
                    <div class="botoncito">
      {/* Resto del contenido de Detalles */}
      <button onClick={() => handleAlbumClick(ruta.ref)} class="portadaAlbum"><img src={ruta.url} alt="" /></button>
    </div>
                  </div>
                  
                ) : (
                  // Renderizar si los valores son diferentes
                  <h1></h1>
                )}
              </div>
            ))}
            
          </div>
          
        )}
        {!cargando && !variable ? (<h1>Producto no encontrado</h1> ): (<h1></h1>)}
        
      
      <div class="col-md-8 ">
        <h1>.</h1>
      </div>
      
      
    </div>
    
    <br></br>
    
    <div >
          
      </div>
    </body>
    
  );
};

export default Detalles;