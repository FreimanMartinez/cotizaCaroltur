import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import $ from 'jquery';
import './css/SideMenu.css';
class Menus extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.menuIconRef = React.createRef();
  }
  componentDidMount() {
    this.initMenu(); 
    document.addEventListener('click', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  mostrarMenu=()=>{
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      $('#wrapper').addClass('mostrar');
      $('#wrapper').removeClass('toggled-2');
      $('#wrapper').removeClass('ocultar');
      $('#menu-icon').css('display', 'none');
    }
  }
  
  handleClickOutside = (event) => {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const elementoProtegido = document.querySelector('#wrapper');
    console.log(elementoProtegido)
    const elementoClickeado = event.target;
    if (isMobile) {
      
      if (elementoProtegido.contains(elementoClickeado)) {
        // Ocultar un menú, por ejemplo
        ///document.querySelector('.menu').classList.add('oculto');
        $('#wrapper').addClass('ocultar');
        $('#wrapper').removeClass('mostrar');
        $('#menu-icon').css('display', 'block');
        $('#sidebar-wrapper').css('width', '0px');

      }
      else if(($('#wrapper').hasClass('mostrar'))&&(elementoClickeado!==document.querySelector('.icon-menu'))){
        
        $('#wrapper').addClass('ocultar');
        $('#wrapper').removeClass('mostrar');
        $('#menu-icon').css('display', 'block');
        $('#sidebar-wrapper').css('width', '0px');
      }
      console.log("El usuario está navegando desde un dispositivo móvil");
      localStorage.setItem("dispositivo", "movile");
    } else {
      console.log("El usuario no está navegando desde un dispositivo móvil");
      localStorage.setItem("dispositivo", "pc");
    }

    
   
    

    
  };
  ocultandoMenu = () => {
    if ($('#menu-icon').hasClass('menu-dinamico2')) {
      $('#wrapper.toggled-2').css('width', '0px');
      $('#sidebar-wrapper').css('width', '0px');
        $('#menu-icon').removeClass('menu-dinamico2');
        $('#menu-icon').addClass('menu-dinamico');
    } else {
        $('#wrapper.toggled-2').css('width', '110px');
        $('#sidebar-wrapper').css('width', '110px');
        $('#menu-icon').removeClass('menu-dinamico');
        $('#menu-icon').addClass('menu-dinamico2');
    }
  };
  initMenu() {
    $("#menu ul").hide();
    // Almacena la referencia al submenú activo
    
    var activeSubMenu = null;

  // Agrega un manejador de eventos para los elementos del menú
    $(document).on("click", function (e) {
      var menu = $("#wrapper"); // Selecciona tu menú por su id
      if (!menu.is(e.target) && menu.has(e.target).length === 0 && activeSubMenu != null) {
        activeSubMenu.slideUp("normal");
        
        // El clic fue fuera del menú
        // Puedes poner aquí la lógica para cerrar el menú si está abierto
        // Por ejemplo: menu.hide();
      }
    });

    $("#menu li a").click(function () {
      
    

    var checkElement = $(this).next();
     // Quita la clase 'active' de todos los elementos 'li' en el menú

    if ($(this).parent().hasClass("active")) {
    // El elemento padre tiene la clase "active"
    // Esto podría indicar que es un elemento de submenú activo
    // Realiza aquí tu lógica específica para elementos de submenú activos
    }
    else{

    
      if (!checkElement.is("ul") && !$(this).hasClass("mi-clase")){
        $("#menu li").removeClass("active");
        // Agrega la clase 'active' solo al 'li' del elemento actual
        $(this).parent().addClass("active");
      }

      if($(this).hasClass("mi-clase")){
        $("#menu li ul li").removeClass("active");
        $("#menu li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parents().eq(2).addClass("active");
      }    
      
    }
    if (checkElement.is("ul") && checkElement.is(":visible")) {
      return false;
    }

    if (checkElement.is("ul") && !checkElement.is(":visible")) {
      if (activeSubMenu) {
        activeSubMenu.slideUp("normal");
      }
      checkElement.slideDown("normal");
      activeSubMenu = checkElement;
      return false;
    }

    if (activeSubMenu) {
      
      activeSubMenu.slideUp("normal");
      activeSubMenu = null;
      
    }
    
  });
}

render() {
  const style = {
    listStyleType: 'none',
    display: 'none',
  };
  return (
    <div style={{ position: 'absolute', zIndex: 100 }}>
      <Helmet>
      <meta charset="UTF-8" />

<link
  rel="apple-touch-icon"
  type="image/png"
  href="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png"
/>

<meta name="apple-mobile-web-app-title" content="CodePen" />

<link
  rel="shortcut icon"
  type="image/x-icon"
  href="https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico"
/>

<link
  rel="mask-icon"
  type="image/x-icon"
  href="https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg"
  color="#111"
/>

<script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-2c7831bb44f98c1391d6a4ffda0e1fd302503391ca806e7fcc7b9b87197aec26.js"></script>

<title>Caroltur2</title>

<link rel="canonical" href="https://codepen.io/hughbalboa/pen/zrgdKq" />

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
/>

<link
  rel="stylesheet"
  href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/172203/font-awesome.min.css"
/>





<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
  crossorigin="anonymous"
></script>
      
      </Helmet>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <div id="menu-icon" className='menu-dinamico' ref={this.menuIconRef} >
      <i class="fa fa-bars icon-menu" onClick={this.mostrarMenu}></i>
    </div>
    <div id="wrapper" class="toggled-2" ref={this.menuRef}>
      <div id="sidebar-wrapper" class="scroll-none">
        
        <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
          <li class="active">
          <Link to="/" >
                <span class="fa-stack fa-lg pull-left">
                  <i class="fa fa-bars fa-stack-1x"></i>
                </span>
                CAROLTUR
            </Link>
          </li>
                 

          <li>
          <Link to="/portafolio" >
            
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-tree fa-stack-1x"></i>
                </span>
                Portafolio
            </Link>
          </li>
          <li>
          <Link to="/eventos" >
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-flag-checkered fa-stack-1x"></i>
                </span>
                Eventos
                </Link>
          </li>
          <li>
          <Link to="/ofertas" >
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-youtube-play fa-stack-1x"></i>
                </span>
                Ofertas
            
            </Link>
          </li>
          <li>
          <Link to="/hoteles-portafolio" >
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-bed fa-stack-1x"></i>
                </span>
                Hoteles
            </Link>
          </li>
          <li>
          <Link to="/cotizaciones" >
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-file-o fa-stack-1x"></i>
                </span>
                Cotizaciones
            </Link>
          </li>
          <li >
            <a href="#" data-target="Reservas">
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-calendar fa-stack-1x"></i>
                </span>
                Reservas
            </a>
            <ul class="nav-pills nav-stacked" style={style}>
              <li>
              <Link to="/hotel" class="mi-clase">
                    <span class="fa-stack fa-lg pull-left">
                        <i class="fa fa-bed fa-stack-1x "></i>
                    </span>
                    Hotel
                </Link>
              </li>
              <li><Link to="/tour" class="mi-clase">
                    <span class="fa-stack fa-lg pull-left">
                        <i class="fa fa-map-signs fa-stack-1x "></i>
                    </span>
                    Tour
                </Link></li>
            </ul>
          </li>
          <li>
            <a href="#" data-target="Nombre">
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-user fa-stack-1x"></i>
                </span>
                Nombre
            </a>
            <ul class="nav-pills nav-stacked" style={style}>
              <li>
              <Link to="/noticias" class="mi-clase">
                    <span class="fa-stack fa-lg pull-left">
                        <i class="fa fa-flag fa-stack-1x "></i>
                    </span>
                    Noticias
                </Link>
              </li>
              <li>
              <Link to="/eventos" class="mi-clase">
                    <span class="fa-stack fa-lg pull-left">
                        <i class="fa fa-flag fa-stack-1x"></i>
                    </span>
                    Eventos
                </Link>
              </li>
            </ul>
          </li>
          <li>
          <Link to="/contacto" >
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-phone fa-stack-1x"></i>
                </span>
                Contacto
            </Link>
          </li>
          <li>
            <a href="#" data-target="Nombre">
                <span class="fa-stack fa-lg pull-left">
                    <i class="fa fa-user fa-stack-1x"></i>
                </span>
                Administrador
            </a>
            <ul class="nav-pills nav-stacked" style={style}>
              <li>
              <Link to="/nuevaRuta" class="mi-clase">
                    <span class="fa-stack fa-lg pull-left">
                        <i class="fa fa-flag fa-stack-1x "></i>
                    </span>
                    Nueva Actividad
                </Link>
              </li>
              <li>
              <Link to="/eventos" class="mi-clase">
                    <span class="fa-stack fa-lg pull-left">
                        <i class="fa fa-flag fa-stack-1x"></i>
                    </span>
                    Eventos
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      
    </div>
    <footer>
    <p>© 2023 Agencia de viajes y operador turístico</p>
  </footer>
    </div>
  );
  
}

}

export default Menus;