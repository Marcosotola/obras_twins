import React from "react";
import Badge from "../components/Badge";

const Home = () => {
  return (
    <>
      <div className="container">
        <Badge />
        <div className="m-5">
          <h5 className="text-center">Progreso General</h5>
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "3%" }}
            ></div>
          </div>
        </div>
        <div class="d-grid gap-4 mb-5">
        <button class="btn btn-lg btn-primary p-3" type="button">
            <a className="text-decoration-none" href="/Planos">
              <h3>Planos</h3>
            </a>
          </button>
          <button class="btn btn-lg btn-primary p-3" type="button">
            <a className="text-decoration-none" href="/Tareas">
              <h3>Tareas Diarias</h3>
            </a>
          </button>
          <button class="btn btn-lg btn-primary p-3" type="button">
            <a className="text-decoration-none" href="/Materiales">
              <h3>Movimiento Materiales</h3>
            </a>
          </button>
          <button class="btn btn-lg btn-primary p-3" type="button">
            <a className="text-decoration-none" href="/Remitos">
              <h3>Remitos</h3>
            </a>
          </button>
          <button class="btn btn-lg btn-primary p-3" type="button">
            <a className="text-decoration-none" href="/Recordatorios">
              <h3>Recordatorios</h3>
            </a>
          </button>
          <button class="btn btn-lg btn-primary p-3" type="button">
            <a className="text-decoration-none" href="/Avance">
              <h3>Avance</h3>
            </a>
          </button>
        </div>
        <div className="d-flex justify-content-center"></div>
        <hr />
        <hr />
        <div className="text-center mt-5">
          <iframe
            style={{ borderRadius: "10px" }}
            title="versiculo"
            width="90%"
            scrolling="no"
            height="200vh"
            frameborder="0"
            src="https://www.bibliatodo.com/es/online/versiculo-del-dia-texto"
          ></iframe>
        </div>
      </div>
      <div className="text-center mt-5">
        <a className="text-decoration-none " href="/Remito">
          Cr Re
        </a>
      </div>
    </>
  );
};

export default Home;
