import React from "react";

const Avance = () => {
  return (
    <>
      <h1 className="text-center mt-4 mb-3">AVANCES</h1>
      <h2 className="mb-3">Total General</h2>
      <div className="container d-flex justify-content-center mb-3">
      <iframe title="total" width="301" height="187" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS8YxcviiyXdIm462yQ4A2FARnQHnSgG2X_DxT845SNnXtgy1Svg3jDviX_cg83BzIShNS2x6_JzqE1/pubchart?oid=314178475&amp;format=interactive"></iframe>
      </div>
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/pisoMenos2">
          <h3>Piso -2</h3>
        </a>
      </button>
      </div>
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/pisoMenos1">
          <h3>Piso -1</h3>
        </a>
      </button>
      </div>
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/piso0tj">
          <h3>Piso 0 TJ</h3>
        </a>
      </button>
      </div>
      
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/piso0vs">
          <h3>Piso 0 VS</h3>
        </a>
      </button>
      </div>
      
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/piso1">
          <h3>Piso +1</h3>
        </a>
      </button>
      </div>
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/piso2">
          <h3>Piso +2</h3>
        </a>
      </button>
      </div>
      <div class="d-grid mb-2">
      <button class="btn btn-lg btn-primary p-3" type="button">
        <a className="text-decoration-none" href="/piso8">
          <h3>Piso +8</h3>
        </a>
      </button>
      </div>
    </>
  );
};

export default Avance;
