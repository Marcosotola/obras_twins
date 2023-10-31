import React from "react";
import bgLogo from "./bgLogo.png";

const Home = () => {
  return (
    <>
      <div class="container">

        <div
          className="bg-image text-center pt-3"
          style={{
            backgroundImage: `url(${bgLogo})`,
            backgroundAttachment: "fixed",
            backgroundSize: "60%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
             <h1 className="text-center bg-secondary rounded mb-5">P O C I T O</h1>
          <div class="d-grid gap-4 mt-3">
            <button class="btn btn-lg btn-primary" type="button">
             <a className="text-decoration-none" href="/Tareas">Tareas Diarias</a> 
            </button>
            <button class="btn btn-lg btn-primary" type="button">
            <a className="text-decoration-none" href="/Materiales">Movimiento Materiales</a> 
            </button>
            <button class="btn btn-lg btn-primary" type="button">
              Avance Obra
            </button>
            <button class="btn btn-lg btn-primary" type="button">
              Planos PDF
            </button>
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, cupiditate. Quisquam rem porro minima quos laboriosam in cupiditate itaque voluptatum possimus enim esse exercitationem veniam illo maiores, at, odio ullam!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor quaerat labore iure numquam sapiente voluptatem ipsa ducimus repudiandae odio est saepe voluptas, perferendis voluptates consectetur similique velit doloremque dolorem ipsum!
        </div>
      </div>
    </>
  );
};

export default Home;
