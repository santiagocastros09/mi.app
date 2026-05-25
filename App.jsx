import React, { useState } from "react";
import "./App.css";
import emailjs from "@emailjs/browser";

import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

// ---------------- LOGIN ----------------
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      onLogin();
    } else {
      alert("Completa todos los campos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>👟 Sneaker Store</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

// ---------------- MAPA ----------------
function MapComponent() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpQBC57FBlrgZJmVUR-xu4BybKfqYDLxs",
  });

  const center = {
    lat: 4.675329,
    lng: -74.144468,
  };

  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <GoogleMap
      zoom={14}
      center={center}
      mapContainerClassName="map"
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
function SubscribeSection() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const templateParams = {
      user_email: email,
    };

    emailjs
      .send(
        "service_sd4w57k",
        "template_49898sv",
        templateParams,
        "jVXkzWtelBT8oyHCF"
      )

      .then(() => {

        setMessage("✅ ¡Suscripción exitosa!");

        setEmail("");

      })

      .catch((error) => {

        console.log(error);

        setMessage("❌ Error al enviar el correo");

      });
  };

  return (

    <div className="subscribe-section">

      <h2>📩 Suscríbete a UrbanKicks</h2>

      <p>
        Recibe ofertas, nuevos lanzamientos y descuentos exclusivos.
      </p>

      <form onSubmit={handleSubmit} className="subscribe-form">

        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Suscribirme
        </button>

      </form>

      {message && (
        <p className="message">
          {message}
        </p>
      )}

    </div>
  );
}
// ---------------- ECOMMERCE ----------------
function Ecommerce({ products }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // -------- COMPRAR --------
  const handleBuy = () => {

    if (cart.length === 0) {
      alert("Tu carrito está vacío 😢");
      return;
    }

    alert("Compra exitosa 🎉");

    setCart([]);
  };

  return (
    <div className="ecommerce-container">
    <SubscribeSection />
      {/* HEADER */}
      <header className="header">

        <h1>⚡ UrbanKicks</h1>

        <input
          type="text"
          placeholder="Buscar tenis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="cart-box">
          🛒 {cart.length}
        </div>
      </header>

      {/* PRODUCTOS */}
      <main className="product-grid">

        {filteredProducts.map((product) => (

          <div key={product.id} className="product-card">

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p className="price">${product.price}</p>

            <button onClick={() => addToCart(product)}>
              Añadir al carrito
            </button>

          </div>
        ))}
      </main>

      {/* CARRITO */}
      <div className="cart">

        <h2>🛒 Carrito</h2>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cart.map((item, index) => (

            <div key={index} className="cart-item">

              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>

              <button onClick={() => removeItem(index)}>
                ✖
              </button>

            </div>
          ))
        )}

        <h3>Total: ${total}</h3>

        {/* BOTÓN COMPRAR */}
        <button className="buy-cart-btn" onClick={handleBuy}>
          Comprar
        </button>

      </div>

      {/* MAPA */}
      <div className="map-section">

        <h2>📍 Nuestra ubicación</h2>

        <MapComponent />

      </div>

    </div>
  );
}

// ---------------- APP ----------------
export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      description:"Comodidad y estilo urbano para el día a día.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },

    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 150,
      description:"Máximo confort y retorno de energía al caminar.",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    },

    {
    id:3,
    name:"Puma RS-X",
    price:110,
    description:"Diseño moderno con detalles deportivos únicos.",
    image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5"
  },

  {
    id:4,
    name:"Jordan Retro 4",
    price:220,
    description:"Un clásico premium inspirado en el basketball.",
    image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782"
  },

  {
    id:5,
    name:"New Balance 550",
    price:130,
    description:"Estilo retro con excelente comodidad diaria.",
    image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
  },

  {
    id:6,
    name:"Converse Chuck 70",
    price:95,
    description:"Diseño clásico que combina con cualquier outfit.",
    image:"https://images.unsplash.com/photo-1491553895911-0055eca6402d"
  },

  {
    id:7,
    name:"Nike Dunk Low",
    price:170,
    description:"Tenis icónicos con un look streetwear moderno.",
    image:"https://images.unsplash.com/photo-1605348532760-6753d2c43329"
  },

  {
    id:8,
    name:"Yeezy Boost",
    price:260,
    description:"Exclusividad y comodidad en cada paso.",
    image:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28"
  },

  {
    id:9,
    name:"Reebok Classic",
    price:89,
    description:"Diseño urbano que no pasa desapercibido",
    image:"https://images.unsplash.com/photo-1543508282-6319a3e2621f"
  },

  {
    id:10,
    name:"Vans Old Skool",
    price:80,
    description:"Amortiguacion ligera para todo el dia",
    image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
  },

  {
    id:11,
    name:"Air Force 1",
    price:145,
    description:"Agarre firma, paso seguro en cualquier terreno",
    image:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
  },

  {
    id:12,
    name:"Asics Gel Lyte",
    price:118,
    description:"Material transpirable para maxima frescura",
    image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
  },

  {
    id:13,
    name:"Jordan 1 High",
    price:240,
    description:"Estilo clasico con un toque moderno",
    image:"https://images.unsplash.com/photo-1552346154-21d32810aba3"
  },

  {
    id:14,
    name:"Nike Blazer",
    price:135,
    description:"Soporte y confort sin sacrificar el look",
    image:"https://images.unsplash.com/photo-1607522370275-f14206abe5d3"
  },

  {
    id:15,
    name:"Puma Suede",
    price:92,
    description:"Durabilidad que aguanta tu ritmo diario",
    image:"https://images.unsplash.com/photo-1560769629-975ec94e6a86"
  },

  {
    id:16,
    name:"Adidas Campus",
    price:105,
    description:"Versatiles para calle, gym y mas",
    image:"https://images.unsplash.com/photo-1605348532760-6753d2c43329"
  }
  ];

  return (
    <>
      {isLoggedIn ? (
        <Ecommerce products={products} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}