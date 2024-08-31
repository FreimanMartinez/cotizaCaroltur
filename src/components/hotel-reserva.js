import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {collection, getDocs, getDoc, deleteDoc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './css/cotizaciones.css';
import DatePicker from "react-datepicker";
const MySwal= withReactContent(Swal)



const HotelReserva = () => {
    
    const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };



  return (
    <div >
        <center>
            <h1>Carolina del Príncipe</h1>            
            <div className="ReservaRutas">
            <div>
      <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
      <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
      <h1>El rango de fechas es {fechaInicio} a {fechaFin}</h1>
    </div>
                <button >Reservar</button>
            </div>            
        </center>
    </div>    
  );
};
export default HotelReserva;