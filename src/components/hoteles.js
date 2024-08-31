import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {collection, getDocs, getDoc, deleteDoc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './css/portafolio.css';
const MySwal= withReactContent(Swal)



const Hoteles = () => {
  const [hoteles, setHoteles]=useState([])
  const hotelesColection= collection(db,"Hoteles")

  const getHoteles=async()=>{
    const data = await getDocs(hotelesColection)
    setHoteles(
      data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    )
    console.log("Entra a esta parte ")
    console.log(data.docs)
  }

  useEffect(()=>{
    getHoteles()
  },[])
  return (
    <div >
      <center>
        <h1>Carolina del Príncipe</h1>
        <table className="table table-dark table-hover mer-le">
          
          <tbody>
            {hoteles.map((hoteles)=>(
              
              <tr key={hoteles.id}>
                <table>
                  <tr>
                    <td colSpan={2} ><center> <h3><b>{hoteles.nombre}</b></h3> </center></td>
                  </tr>
                  <tr>
                    <td>
                    <img src={hoteles.foto} alt="Imagen de ejemplo" class='image-ruta'/>
                    </td>
                    <td id="descrip" className="class-descip "> {hoteles.Descripción} 
                      <ul>
                        <li>Ubicación: {hoteles.address} 
                        </li>
                        <li> Grado de Dificultad: {hoteles.nombre} </li>
                      </ul><a href="#"> Ver mas</a> </td>
                  </tr>
                </table>
                
              </tr>
            ))}
          </tbody>
          
        </table>
      </center>
      

      
    
  
    </div>
    
  );
};
export default Hoteles;