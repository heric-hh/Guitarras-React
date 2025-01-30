import Footer from "./components/Footer";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/guitarras.js";
import { useEffect, useState } from "react";
export default function App() {
  const [guitars] = useState(db);
  const [carrito, setCarrito] = useState(cargarStorage());

  useEffect(guardarStorage, [carrito]);

  function cargarStorage() {
    const storageData = localStorage.getItem("carrito");
    return storageData ? JSON.parse(storageData) : [];
  }

  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function agregarCarrito(guitar) {
    console.log(`agregando al carrito ${guitar.id}, ${guitar.nombre}`);
    const carritoNuevo = [...carrito];
    const idExiste = carritoNuevo.findIndex((g) => g.id === guitar.id);
    if (idExiste === -1) {
      carritoNuevo.push({ ...guitar, cantidad: 1 });
    } else {
      carritoNuevo[idExiste].cantidad++;
    }
    setCarrito(carritoNuevo);
  }

  function quitarUno(id) {
    const carritoNuevo = [...carrito];
    const idCarrito = carritoNuevo.findIndex((guitar) => guitar.id === id);
    if (carritoNuevo[idCarrito].cantidad > 1) {
      carritoNuevo[idCarrito].cantidad--;
    }
    setCarrito(carritoNuevo);
  }

  function quitarGuitarra(id) {
    console.log(`Quitar guitarra ${id}`);
    setCarrito(carrito.filter((guitar) => guitar.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }
  return (
    <>
      <Header
        carrito={carrito}
        agregarCarrito={agregarCarrito}
        quitarUno={quitarUno}
        quitarGuitarra={quitarGuitarra}
        vaciarCarrito={vaciarCarrito}
        guitar={guitars[3]}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              agregarCarrito={agregarCarrito}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
