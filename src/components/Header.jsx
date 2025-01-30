import { useMemo } from "react";

export default function Header({
  carrito,
  agregarCarrito,
  quitarUno,
  quitarGuitarra,
  vaciarCarrito,
  guitar,
}) {
  const total = useMemo(
    () => carrito.reduce((t, g) => t + g.cantidad * g.precio, 0),
    [carrito],
  );
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {carrito.length === 0 ? (
                  <p className="text-center m-0">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {carrito.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={"/img/" + guitar.imagen + ".jpg"}
                                alt={"imagen " + guitar.nombre}
                              />
                            </td>
                            <td>{guitar.nombre}</td>
                            <td className="fw-bold">${guitar.precio}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => quitarUno(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.cantidad}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => agregarCarrito(guitar)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => quitarGuitarra(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${total}</span>
                    </p>
                    <button
                      className="btn btn-dark w-100 mt-3 p-2"
                      onClick={() => vaciarCarrito()}
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 text-center text-md-start pt-5">
            <h1 className="display-2 fw-bold">Modelo {guitar.nombre}</h1>
            <p className="mt-5 fs-5 text-white">{guitar.descripcion}</p>
            <p className="text-primary fs-1 fw-black">${guitar.precio}</p>
            <button
              type="button"
              className="btn fs-4 bg-primary text-white py-2 px-5"
              onClick={() => agregarCarrito(guitar)}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      <img
        className="header-guitarra"
        src="/img/header_guitarra.png"
        alt="imagen header"
      />
    </header>
  );
}
