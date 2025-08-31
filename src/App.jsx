import { useState } from "react";

const botonInicioStyle = {
  padding: "1rem 2rem",
  fontSize: "1.2rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#8B5E3C",
  color: "#fff",
  fontWeight: "bold",
  transition: "transform 0.3s",
};

function Inicio({ irATienda, irAContacto, imagenFondo }) {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${imagenFondo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Overlay oscuro */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)"
      }}></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "2rem", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
          Bienvenidos a Dulce Hogar
        </h1>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
          <button 
            onClick={irATienda} 
            style={botonInicioStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Entrar a la tienda
          </button>
          <button 
            onClick={irAContacto} 
            style={{ ...botonInicioStyle, background: "#5C3A21" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Contacto
          </button>
        </div>
      </div>
    </div>
  );
}

function Tienda({ carrito, setCarrito, volverInicio }) {
  const productos = [
    { nombre: "Criollo", precio: 700, img: "/criollo.jpg" },
    { nombre: "Mafalda", precio: 1300, img: "mafalda.jpg" },
    { nombre: "Factura", precio: 1000, img: "factura.jpg" },
    { nombre: "Chipa", precio: 600, img: "chipa.jpg" },
  ];

  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [alias] = useState("joa.marengo88");
  const numeroWhats = "+543541653229";

  const agregarAlCarrito = (producto) => setCarrito([...carrito, producto]);
  const eliminarDelCarrito = (index) => {
    const copia = [...carrito];
    copia.splice(index, 1);
    setCarrito(copia);
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  const mensajeWhatsApp = `Hola, quiero enviar mi comprobante de transferencia:\n` +
    carrito.map(p => `${p.nombre} - $${p.precio}`).join("\n") +
    `\nTotal: $${total}\nNúmero: ${numeroWhats}`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
      {/* HEADER */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#8B5E3C",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        color: "#fff"
      }}>
        <h1 style={{ margin: 0 }}>Dulce Hogar</h1>
        <div style={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          🛒 {carrito.length}
        </div>
      </header>

      {/* PRODUCTOS */}
      <section style={{ padding: "3rem 1rem", background: "#c3955aff" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem", color: "#5C3A21" }}>Nuestros Productos</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem"
        }}>
          {productos.map((p) => (
            <div
              key={p.nombre}
              style={{
                width: "550px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                background: "#fdc794ff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)"; }}
            >
              <img src={p.img} alt={p.nombre} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              <h3 style={{ margin: "0.5rem 0", color: "#5C3A21" }}>{p.nombre}</h3>
              <p style={{ margin: "0.5rem 0", fontWeight: "bold", color: "#5C3A21" }}>${p.precio}</p>
              <button
                style={{
                  marginBottom: "1rem",
                  padding: "0.6rem 1.2rem",
                  background: "#8B5E3C",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#fff",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#6B4528")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#8B5E3C")}
                onClick={() => agregarAlCarrito(p)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CARRITO DESLIZANTE */}
      {mostrarCarrito && (
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "250px",
          height: "50vh",
          background: "#F5F1EB",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
          padding: "1rem",
          overflowY: "auto",
          zIndex: 2000
        }}>
          <h2 style={{ color: "#5C3A21", textAlign: "center" }}>Tu Carrito</h2>
          <button
            onClick={() => setMostrarCarrito(false)}
            style={{ marginBottom: "1rem", padding: "0.5rem 1rem", border: "none", borderRadius: "5px", background: "#8B5E3C", color: "#fff", cursor: "pointer" }}
          >
            Cerrar carrito
          </button>

          <ul>
            {carrito.map((p, i) => (
              <li key={i} style={{ marginBottom: "0.5rem", color: "#5C3A21", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {p.nombre} - ${p.precio}
                <button onClick={() => eliminarDelCarrito(i)} style={{ background: "#C0392B", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", padding: "0 5px" }}>X</button>
              </li>
            ))}
          </ul>

          <p style={{ fontWeight: "bold", color: "#5C3A21" }}>Total: ${total}</p>

          {/* MÉTODO DE PAGO */}
          <div style={{ marginTop: "1rem" }}>
            <p style={{ fontWeight: "bold", color: "#5C3A21" }}>Método de pago:</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.5rem" }}>
              {["efectivo", "transferencia"].map((m) => (
                <div
                  key={m}
                  onClick={() => setMetodoPago(m)}
                  style={{
                    padding: "0.8rem 1rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: metodoPago === m ? "#5C3A21" : "#E1C9B3",
                    color: metodoPago === m ? "#fff" : "#5C3A21",
                    fontWeight: "bold",
                    boxShadow: metodoPago === m ? "0 5px 15px rgba(0,0,0,0.2)" : "none",
                    transition: "all 0.3s",
                    textAlign: "center"
                  }}
                >
                  {m === "efectivo" ? "Efectivo" : "Transferencia"}
                </div>
              ))}
            </div>

            {metodoPago === "transferencia" && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <p>Alias para transferencia: <strong>{alias}</strong></p>
                <a
                  href={`https://wa.me/543541653229?text=${encodeURIComponent(mensajeWhatsApp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "1rem",
                    display: "inline-block",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#25D366",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  Enviar comprobante por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTÓN VOLVER AL INICIO */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={volverInicio}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "5px",
            border: "none",
            background: "#8B5E3C",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Volver al inicio
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#8B5E3C",
        color: "#fff",
        marginTop: "2rem"
      }}>
        <div> Villa Carlos Paz</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="https://www.tiktok.com/@dulcehogar_vcp?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
            <img
              src="tiktok.png"
              alt="TikTok"
              style={{ width: "30px", height: "30px", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </a>
          <a href="https://www.facebook.com/dulcehogarvcp" target="_blank" rel="noopener noreferrer">
            <img
              src="facebook.png"
              alt="Facebook"
              style={{ width: "30px", height: "30px", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

function Contacto({ volverInicio }) {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      background: "#F5F1EB",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      boxSizing: "border-box",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#5C3A21", marginBottom: "2rem" }}>Contacto</h1>
      <div style={{ color: "#5C3A21", lineHeight: "1.8", fontSize: "1.2rem" }}>
        <p><strong>Dirección:</strong> Villa Carlos Paz</p>
        <p><strong>Teléfono:</strong> +54 3541653229</p>
        <p><strong>Email:</strong> dulcehogar@gmail.com</p>
      </div>
      <div style={{ marginTop: "3rem" }}>
        <button 
          onClick={volverInicio} 
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "5px",
            border: "none",
            background: "#8B5E3C",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [pagina, setPagina] = useState("inicio");
  const [carrito, setCarrito] = useState([]);
  const imagenInicio = "fondo.jpg"; // tu imagen de fondo

  if (pagina === "tienda") return <Tienda carrito={carrito} setCarrito={setCarrito} volverInicio={() => setPagina("inicio")} />;
  if (pagina === "contacto") return <Contacto volverInicio={() => setPagina("inicio")} />;

  return <Inicio irATienda={() => setPagina("tienda")} irAContacto={() => setPagina("contacto")} imagenFondo={imagenInicio} />;
}
