import { Link } from "react-router-dom";
import "./Navbar.css";

const tabs = [
  { name: "home", label: "Home🏠" },
  { name: "explorer", label: "Explorer🌐" },
  { name: "search", label: "Search🔎" },
  { name: "message", label: "Message💬" },
  // { name: "notification", label: "Notification🔔" },
  { name: "bookmark", label: "Bookmark📑" },
  { name: "profile", label: "Profile👤" },
  // { name: "logout", label: "Logout" },
];

function Navbar({ tab, setTab }) {
  return (

    <div className="Navbar-container">
       <h2>
              <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_SimuGl_rhQI7rBCMhQBsZ0eKI98kWZExA&s" 
            alt="Yamaha Logo" 
            style={{ width: '210px', height: 'auto', marginRight: '10px' }} 
          />
        </h2>
      {tabs.map(({ name, label }) => (
        <Link key={name} to={`/${name}`}>
          <button
            className={`btn ${
              tab === name ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => setTab(name)}
          >
            {label}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default Navbar;

