
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Carrusel = ({ imagenes }) => {
  // Número de imágenes a mostrar por slide (opcional)
  const itemsPorSlide = 1;

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === imagenes.length - 1 ? 0 : prevSlide + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? imagenes.length - 1 : prevSlide - 1));
  };

  const slides = imagenes.map((imagen, index) => {
    const isActive = index >= currentSlide && index < currentSlide + itemsPorSlide;
    return (
      <div key={index} className={`carousel-item ${isActive ? 'active' : ''}`}>
        <img src={imagen.src} className="d-block w-100"  />
        {imagen.caption && (
          <div className="carousel-caption d-none d-md-block">
            <h3>{imagen.caption}</h3>
          </div>
        )}
      </div>
    );
  });
  useEffect(() => {
    // Función que se ejecuta al cargar la página
  }, []);

  return (
    <div id="miCarrusel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">{slides}</div>
      <a className="carousel-control-prev" href="#miCarrusel" role="button" data-bs-slide="prev" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Anterior</span>
      </a>
      <a className="carousel-control-next" href="#miCarrusel" role="button" data-bs-slide="next" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Siguiente</span>
      </a>
    </div>
  );
};

export default Carrusel;
