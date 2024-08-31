import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {collection, getDocs, getDoc, deleteDoc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './css/cotizaciones.css';
const MySwal= withReactContent(Swal)



const Cotizacion = () => {
    
  const hoy = new Date()
  const mes=hoy.getMonth()+1
  const [rutas, setRutas]=useState([])
  const rutasColection= collection(db,"rutas")
  const formulasColection= collection(db,"Guianzas")
  const [cotizacion, setCotizacion] = useState([]);
  const tercerosColection= collection(db,"terceros")
  const [terceros, setTerceros] = useState([]);

  const getRutas=async()=>{
    const data = await getDocs(rutasColection)
    setRutas(
      data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    )
    
  }



  function contarRepite(){
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    var tipos=[];
    var transporteRuta=[];
    var contadorEspecial=[0,0];
    for (const checkbox of checkboxes) {
      // checkbox está marcado
      if (checkbox.checked){
        
        tipos.push(checkbox.value);
        if(checkbox.dataset.transporte){
        transporteRuta.push(checkbox.dataset.transporte);  }
        const boolAlmuerzo=checkbox.dataset.almuerzo === "true"; ;
        if(!boolAlmuerzo) {
          contadorEspecial[0]++;
        }    
        else{
          contadorEspecial[1]++;
        }
      }
    }
    const repeticiones = contarRepeticiones(tipos);
    const elementosConRepeticiones = Object.keys(repeticiones);

    return [elementosConRepeticiones, repeticiones, transporteRuta,contadorEspecial];
  }



  async function getCotizacion(){
    const formulas = await getDocs(formulasColection);
    setCotizacion(formulas.docs[0].data()); 
  }


  async function getTerceros(){
    const tercero = await getDocs(tercerosColection);
    setTerceros(tercero.docs[0].data()); 
  }

  
  function contarRepeticiones(arr) {
    const contador = {};
    
    // Iterar sobre el arreglo y contar las repeticiones
    arr.forEach((element) => {
      if (contador[element]) {
        contador[element]++;
      } else {
        contador[element] = 1;
      }
    });
    
    return contador;
  }
  
  const cotizar = async () => {
    
    const formulas = await getDocs(formulasColection);
    var total=0;
    var x=0;
    const repeticion=contarRepite();
    var selCavernas=false;
    for (let i=0; i<repeticion[0].length; i++){
      
      x =  parseInt(document.querySelector("input[type='number']").value);
      
      var y = eval(cotizacion[repeticion[0][i]]);
      if(repeticion[0][i]=="Espeleismo"){
        selCavernas=true;
      }
      
      total+=Math.round(y)*repeticion[1][repeticion[0][i]] 
    }
    if(repeticion[3][0]>1){ 
      
      y = Math.floor((eval(cotizacion["Espeleismo"])+eval(cotizacion["Senderismo"]))*0.3);
      total-=y;
    }
    else if((repeticion[3][0]==1)&&(!selCavernas)){

      total-=eval(cotizacion["Senderismo"])*0.074;
    }
    var otros= (terceros["Almuerzos"])*(Math.floor(repeticion[3][0]/2)+repeticion[3][1])*(x+(Math.floor(x/18)+1));//por cada 18 clientes va un guia
    
    var transporteCalculo=0;
    console.log("repite esta tantas veces: "+repeticion[2].length)
    for(let i=0;i<repeticion[2].length;i++){
      console.log(repeticion[2][i])
      transporteCalculo+=terceros[repeticion[2][i]];
    }
    var personas=parseInt(document.querySelector("input[type='number']").value);
    if(personas%3==0){
      transporteCalculo=((personas+1)/3)*transporteCalculo;
    }
    else{
      transporteCalculo=(Math.floor(personas/3) + 1)*transporteCalculo;
    }
    console.log(total*1000)
    console.log(otros)
    console.log(transporteCalculo)
    //trasnporteCalculo=(personas/3 + 1);
    const totalPorPersona=Math.floor((total*x*1000+transporteCalculo+otros)/(x*1000))*1000;
    const respuesta = window.confirm("El valor del plan es de $"+totalPorPersona*x+ " que equivale a un precio de $"+totalPorPersona+" por persona.");
    if (respuesta) {
      // Elimina el archivo
    } else {
      // No elimina el archivo
    }
  };

  


  const fecha= String(hoy.getFullYear()+"-"+mes+"-"+hoy.getDate())
  const [otraVisible, setOtraVisible] = useState(false);
  const handleOtraCheckboxChange = (e) => {
    setOtraVisible(e.target.checked);
  };


  useEffect(()=>{
    getRutas()
    getCotizacion();
    getTerceros();
  },[])


  return (
    <div >
        <center>
            <h1>Cotizar Actividad</h1>            
            <div className="ReservaRutas">
                
                <div class="form-group" style={{display:'flex',justifyContent: 'center'}}>
                    <label for="cantidad-personas">Cantidad de personas</label>
                    <input type="number" class="form-control" id="cantidad-personas" name="cantidad-personas" required/>
                </div>
                <div class="form-group form-check" >                   
                    <div class="row AlinearIzquierda" >
                    {rutas.map((rutas)=>(
                        <div class="col-md-4">
                            <input type="checkbox"  value={rutas.tipo} name={rutas.Nombre} data-transporte={rutas.Transporte} data-almuerzo={rutas.Almuerzo}/><label className={rutas.tipo}>
                            {rutas.Nombre} </label>
                        </div> 
                    ))}
                                
                </div>
                <button onClick={cotizar} style={{margin:'5% 0'}} >Cotizar</button>
                <div style={{ display:'flex',justifyContent: 'space-between', marginTop:'5%',flexWrap:'wrap'}}>
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(0, 0, 0)', paddingRight:'15px', marginRight:'5px' }}> </span> Senderismo</div>
                    
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(65, 82, 240)', paddingRight:'15px',marginRight:'5px' }}> </span> Espeleismo</div>
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(65, 240, 88)', paddingRight:'15px', marginRight:'5px' }}> </span> Torrentismo</div>
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(192, 178, 50)', paddingRight:'15px',marginRight:'5px' }}> </span> Camping</div>
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(157, 129, 223)', paddingRight:'15px', marginRight:'5px' }}> </span> Pesca</div>
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(235, 122, 29)', paddingRight:'15px',marginRight:'5px' }}> </span> Avistamiento de Aves</div>
                    <div class="color-label rojo" ><span style={{ backgroundColor: 'rgb(160, 160, 160)', paddingRight:'15px',marginRight:'5px' }}> </span> Patrimonio</div>
                    </div>
                    
                    </div>       
            </div>            
        </center>
        
    </div>    
  );
};
export default Cotizacion;