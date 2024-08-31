import React, {useState, useEffect} from "react";
import {collection, getDocs, orderBy, doc, setDoc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import './css/nuevaActividad.css';


const NuevaActividad = () => {
  const categoriasRutas= collection(db,"categoriasRutas");
  const [categorias, setCategorias] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [almuerzo, setAlmuerzo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [distancia, setDistancia] = useState('');
  const [grado, setGrado] = useState('');
  const [nombre, setNombre] = useState('');
  const [album, setAlbum] = useState('');
  const [atractivos, setAtractivos] = useState('');
  const [incluye, setIncluye] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [rDescripcion, setRDescripcion] = useState('');
  const [recomendaciones, setRecomendaciones] = useState('');
  const [tipo, setTipo] = useState('');
  const [url, setUrl] = useState(''); 

  const handleSubmit = (e) => {
    console.log("Esta entrando a la champera");
    e.preventDefault();

    const datosFormulario = {
      Almuerzo: almuerzo,
      Description: descripcion,
      Distancia: distancia,
      GradoDificultad: grado,
      Nombre: nombre,
      album: album,
      atractivos: atractivos,
      incluye: incluye,
      municipio: municipio,
      rDescripcion: rDescripcion,
      recomendaciones: recomendaciones,
      tipo: tipo,
      url: url,
    };

    const refColeccion = collection(db, "rutas");
    const nuevoDocRef = doc(refColeccion);
    setDoc(nuevoDocRef, datosFormulario)
      .then(() => {
        console.log("Datos guardados en Firestore");
        // Limpiar el formulario
        setAlmuerzo("No");
        setDescripcion("");
        setDistancia("");
        setGrado("");
        setNombre("");
        setAlbum("");
        setAtractivos("");
        setIncluye("");
        setMunicipio("");
        setRDescripcion("");
        setRecomendaciones("");
        setTipo("");
        setUrl("");
        // Consider redirecting or displaying a success message
      })
      .catch((error) => {
        console.error("Error al guardar datos:", error);
        // Handle error appropriately (display message, log details, etc.)
        alert("Error al guardar la actividad. Inténtalo de nuevo.");
      });
    
  };
  async function getCategorias(){
    const CategoriaRuta = await getDocs(categoriasRutas);
    setCategorias(CategoriaRuta.docs[0].data()); 
    console.log(categorias)
  }
  const handleChange = (e) => {
    setValorSeleccionado(e.target.value);
    console.log("Ingresa "+ e.target.value)
    // Implement filtering logic here based on 'valorSeleccionado'
  };
  const categoriasArray = Object.keys(categorias);
  const opcionesSelect = categoriasArray.map((categoria) => (
    <option key={categoria} value={categoria}>
      {categorias[categoria]}
    </option>
  ));

  useEffect(()=>{
   
    getCategorias();
    
  },[])
    
  return (
    
    <div ><br></br><br></br>
    
        <center class="centroNueva">
            <input class="formularioRutas" value={nombre} type="text" id="Nombre" name="Nombre" onChange={e => setNombre(e.target.value)} placeholder="Nombre" required></input><br/><br/>

            <select class="formularioRutas" id="ciudad" name="ciudad" required>
                <option value="carolinaprincipe" checked>Carolina del Príncipe</option>
                <option value="gomezplata">Gómez Plata</option>
                <option value="guadalupe">Guadalupe</option>
            </select><br/><br/>

            <select class="formularioRutas" value={valorSeleccionado} onChange={handleChange}>
                <option value="">Categoría</option>
                {opcionesSelect}
            </select><br/><br/>

            
            <textarea class="formularioRutas" rows="5" id="Description" value={descripcion} name="Description" onChange={e => setDescripcion(e.target.value)} placeholder="Descripción Completa" required></textarea><br/><br/>

            <textarea class="formularioRutas" rows="5" id="rDescripcion" value={rDescripcion} name="rDescripcion" onChange={e => setRDescripcion(e.target.value)} placeholder="Descripción Resumida" required></textarea><br/><br/>

            <input class="formularioRutas" type="number" id="Distancia" value={distancia} name="Distancia" onChange={e => setDistancia(e.target.value)} placeholder="Distancia en Kilometros" required></input><br/><br/>

            <input class="formularioRutas" type="number" id="GradoDificultad" value={grado} name="GradoDificultad" onChange={e => setGrado(e.target.value)} placeholder="Grado de dificultad (1-5)" required></input><br/><br/>

            <textarea class="formularioRutas" rows="5" id="Album" name="Album" value={album} onChange={e => setAlbum(e.target.value)} placeholder="Link de 10 fotos separados por <->" required></textarea><br/><br/>
            
            <textarea class="formularioRutas" rows="5" id="Atractivos" name="Atractivos" value={atractivos} onChange={e => setAtractivos(e.target.value)} placeholder="Atractivos separados por un espacio y un guion ( -)" required></textarea><br/><br/>

            <textarea class="formularioRutas" rows="5" id="Incluye" name="Incluye" value={incluye} onChange={e => setIncluye(e.target.value)}placeholder="Lo que incluye separados por un espacio y un guion ( -)" required></textarea><br/><br/>

            <textarea class="formularioRutas" rows="5" id="Recomendaciones" name="Recomendaciones" value={recomendaciones} onChange={e => setRecomendaciones(e.target.value)} placeholder="Recomendaciones separados por un espacio y un guion ( -)" required></textarea><br/><br/>

            <input class="formularioRutas" type="text" id="Url" name="Url" value={url} onChange={e => setUrl(e.target.value)} placeholder="Url de la imagen principal de la actividad" required></input><br/><br/>
            
            <div class="col-md-6">
                <label for="aceptaTerminos">Almuerzo &nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="checkbox" id="Almuerzo" name="Almuerzo" required></input>
            </div>
            <div class="col-md-6">
                <label for="aceptaTerminos">Activar &nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="checkbox" id="Activar" name="Activar" required></input>
            </div>
            <br/><br/>
            <button onClick={handleSubmit} class="formularioRutas">Guardar</button>

            

        </center> 
        <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    
  );
};
export default NuevaActividad;