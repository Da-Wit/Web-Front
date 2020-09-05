import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App.js";

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Root;
