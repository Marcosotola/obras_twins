import React from "react";
import bgLogo from "./bgLogo.png";

const Home = () => {
  return (
    <>
      <div
        className="bg-image text-center"
        style={{
          backgroundImage: `url(${bgLogo})`,
          backgroundAttachment: "fixed",
          backgroundSize: "90%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-center bg-secondary text-warning rounded mt-5 mb-5">P O C I T O</h1>
        <div class="d-grid gap-4">
          <button class="btn btn-lg btn-primary" type="button">
            <a className="text-decoration-none" href="/Tareas">
              Tareas Diarias
            </a>
          </button>
          <button class="btn btn-lg btn-primary" type="button">
            <a className="text-decoration-none" href="/Materiales">
              Movimiento Materiales
            </a>
          </button>
          <button class="btn btn-lg btn-primary" type="button">
            <a className="text-decoration-none" href="/Recordatorios">
              Recordatorios
            </a>
          </button>
          <button class="btn btn-lg btn-primary" type="button">
            Avance Obra
          </button>
          <button class="btn btn-lg btn-primary" type="button">
            Planos PDF
          </button>
        </div>
        <hr />

      </div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum corrupti, labore eum iusto velit temporibus magnam. Recusandae, ex dolorem nihil id iure officiis sint consectetur delectus. Praesentium cupiditate placeat debitis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit sapiente, perferendis quisquam quasi porro molestiae sunt similique saepe voluptate ratione ipsum soluta harum libero tenetur doloribus aperiam quod delectus?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis quasi maxime itaque eum velit iste blanditiis reiciendis. Molestiae deleniti quos, suscipit sequi vitae incidunt maiores necessitatibus ullam accusantium blanditiis quo?
    </>
  );
};

export default Home;
