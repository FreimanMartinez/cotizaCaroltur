import React from "react";
import { Route, Routes } from "react-router-dom";
import Menus from "./components/Menus";
import Home from "./components/Home";
import Portafolio from "./components/Portafolio";
import Cotizaciones from "./components/cotizaciones";
import Eventos from "./components/Eventos";
import Hoteles from "./components/hoteles";
import HotelReserva from "./components/hotel-reserva";
import Login from "./components/login";
import Detalles from "./components/Detalles";
import Album from "./components/album";
import Info from "./components/info";
import NuevaActividad from "./components/nuevaActividad"
function App() {
  

  return (
    <div className="container" >
      
      <Menus/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/portafolio" element={<Portafolio/>} />
        <Route path="/eventos" element={<Eventos/>} />
        <Route path="/cotizaciones" element={<Cotizaciones/>} />
        <Route path="/hoteles-portafolio" element={<Hoteles/>} />
        <Route path="/hotel-reservas" element={<HotelReserva/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/detalles" element={<Detalles/>} />
        <Route path="/planes/:municipio" element={<Portafolio/>} />
        <Route path="/planes/portafolio/:id" element={<Detalles/>} />
        <Route path="/nuevaRuta" element={<NuevaActividad/>} />
        <Route path="/album" element={<Album/>} />
        <Route path="/information" element={<Info/>} />

      </Routes>
      </div>
  );
}

export default App;
