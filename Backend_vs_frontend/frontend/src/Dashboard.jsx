import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaAmazon,
  FaGoogle,
  FaMicrosoft
} from "react-icons/fa";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [customerCount, setCustomerCount] = useState(0);
  const counted = useRef(false); // ref to prevent multiple counting

  /* DATA */
  const products = [
    { id: 1, name: "Luxury Chair", price: "$120", image: "https://picsum.photos/400/300?1" },
    { id: 2, name: "Modern Sofa", price: "$320", image: "https://picsum.photos/400/300?2" },
    { id: 3, name: "Wooden Table", price: "$210", image: "https://picsum.photos/400/300?3" },
    { id: 4, name: "Stylish Lamp", price: "$90", image: "https://picsum.photos/400/300?4" }
  ];

  const testimonials = [
    { name: "Ayesha", text: "Furniture quality is amazing.", rating: 5, image: "https://i.pravatar.cc/150?img=1" },
    { name: "Ali", text: "Modern design & fast delivery.", rating: 4, image: "https://i.pravatar.cc/150?img=2" },
    { name: "Sara", text: "Best interior store in town.", rating: 5, image: "https://i.pravatar.cc/150?img=3" }
  ];

  const brandIcons = [
    { icon: FaApple, color: "#A2AAAD" },
    { icon: FaAmazon, color: "#FF9900" },
    { icon: FaGoogle, color: "#4285F4" },
    { icon: FaMicrosoft, color: "#F65314" }
  ];

  const staffMembers = [
    { name: "Hassan", position: "Manager", image: "https://i.pravatar.cc/200?img=10" },
    { name: "Fatima", position: "Designer", image: "https://i.pravatar.cc/200?img=11" },
    { name: "Ali", position: "Developer", image: "https://i.pravatar.cc/200?img=12" },
    { name: "Sara", position: "Marketing", image: "https://i.pravatar.cc/200?img=13" }
  ];

  /* AUTH */
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) navigate("/register");
    else setUser(u);
  }, [navigate]);

  /* HAPPY CUSTOMERS COUNTER */
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".happy-customers");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && !counted.current) {
        counted.current = true; // prevent multiple counting
        let count = 0;
        const target = 2500;

        const interval = setInterval(() => {
          count += 50;
          if (count >= target) {
            count = target;
            clearInterval(interval);
          }
          setCustomerCount(count);
        }, 25);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on load if already in view
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!user) return null;

  return (
    <>
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="dashboard-container header-inner">
          <h2>FurniLux</h2>
          <nav>
            <span className="welcome-user">Hello, {user.name}</span>
            <a href="#brands">Brands</a>
            <a href="#products">Products</a>
            <a href="#staff">Staff</a>
            <a href="#reviews">Reviews</a>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="dashboard-container">
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Modern Interior Design Studio</h1>
            <p>Premium furniture to transform your living spaces beautifully.</p>
            <button className="hero-btn">Explore Collection</button>
          </div>
          <img src="https://picsum.photos/700/450?interior" alt="Interior" />
        </section>

        {/* BRANDS */}
        <section className="brands-section" id="brands">
          <h2>Trusted Brands</h2>
          <div className="brands-grid">
            {brandIcons.map(({ icon: Icon, color }, i) => (
              <div className="brand-card" key={i} style={{ backgroundColor: "#000" }}>
                <Icon color={color} />
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section" id="products">
          <h2>Trending Products</h2>
          <div className="products-grid">
            {products.map(p => (
              <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <span>{p.price}</span>
                <button className="product-btn">View</button>
              </div>
            ))}
          </div>
        </section>

        {/* STAFF MEMBERS */}
        <section className="staff-section" id="staff">
          <h2>Our Staff</h2>
          <div className="staff-grid">
            {staffMembers.map((s, i) => (
              <div className="staff-member" key={i}>
                <img src={s.image} className="staff-avatar" alt={s.name} />
                <h4>{s.name}</h4>
                <p>{s.position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HAPPY CUSTOMERS */}
        <section className="happy-customers">
          <h2>Happy Customers</h2>
          <div className="customer-counter">{customerCount.toLocaleString()}+</div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section" id="reviews">
          <h2>What Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <img src={t.image} className="testimonial-avatar" alt={t.name} />
                <p>“{t.text}”</p>
                <h4>{t.name}</h4>
                <div className="rating">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL */}
        <section className="icons-section">
          <div className="icons-grid">
            <div className="icon-circle"><FaFacebookF /></div>
            <div className="icon-circle"><FaTwitter /></div>
            <div className="icon-circle"><FaInstagram /></div>
            <div className="icon-circle"><FaLinkedin /></div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner dashboard-container">
          <div>
            <h3>FurniLux</h3>
            <p>Premium furniture & interior solutions.</p>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div>
            <h3>Support</h3>
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
            <a href="#">FAQs</a>
          </div>
          <div>
            <h3>Legal</h3>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 FurniLux — All Rights Reserved</div>
      </footer>
    </>
  );
}
