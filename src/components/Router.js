import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./Home";
import Portafolio from "./Portafolio";

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={Portafolio} />
    </div>
  </BrowserRouter>
);

export default Router;