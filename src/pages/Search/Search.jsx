// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Search.css";

// // Define the tabs for the navbar
// const tabs = [
//   { name: "home", label: "Home🏠" },
//   { name: "explorer", label: "Explorer🌐" },
//   { name: "search", label: "Search🔎" },
//   { name: "message", label: "Message💬" },
//   { name: "notification", label: "Notification🔔" },
//   { name: "bookmark", label: "Bookmark📑" },
//   { name: "profile", label: "Profile👤" },
//   { name: "logout", label: "Logout" },
// ];

// const Search = () => {
//   const [history, setHistory] = useState([
//     "Puvanart Saruttanontha",
//     "Jirapuay Huacut",
//     "Sittipab Rumyai",
//     "Puvanart Saruttanontha",
//   ]);
//   const [others, setOthers] = useState([
//     "Natapat Meejai",
//     "Natapat Meejai",
//     "Natapat Meejai",
//     "Natapat Meejai",
//     "Natapat Meejai",
//     "Natapat Meejai",
//   ]);

//   const [searchTerm, setSearchTerm] = useState(""); // สถานะสำหรับคำค้นหา
//   const [visibleHistoryCount, setVisibleHistoryCount] = useState(3);
//   const [visibleOthersCount, setVisibleOthersCount] = useState(3);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // กรองรายการตามคำค้นหา
//   const filteredHistory = history.filter((name) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const filteredOthers = others.filter((name) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSeeMoreHistory = () => {
//     setVisibleHistoryCount((prev) => prev + 3);
//   };

//   const handleSeeMoreOthers = () => {
//     setVisibleOthersCount((prev) => prev + 3);
//   };

//   return (
//     <div className="container">
//       {/* Navbar */}
//       <div className="navbar">
//         <div className="Navbar-container">
//           {tabs.map(({ name, label }) => (
//             <Link key={name} to={`/${name}`}>
//               <button className="btn">
//                 {label}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Search Box */}
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="input"
//           value={searchTerm}
//           onChange={handleSearchChange} // เมื่อผู้ใช้พิมพ์ในช่องค้นหา
//         />
//       </div>

//       {/* Section: History */}
//       <div className="section">
//         <h3 className="heading">History</h3>
//         <div className="list">
//           {filteredHistory.length > 0 ? (
//             filteredHistory.slice(0, visibleHistoryCount).map((name, index) => (
//               <div key={index} className="item">
//                 <span className="icon">👤</span>
//                 <span className="text">{name}</span>
//               </div>
//             ))
//           ) : (
//             <div className="no-results">ไม่พบผลลัพธ์</div>
//           )}
//           {visibleHistoryCount < filteredHistory.length && (
//             <button className="see-more" onClick={handleSeeMoreHistory}>
//               See more...
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Section: อื่นๆ */}
//       <div className="section">
//         <h3 className="heading">อื่นๆ</h3>
//         <div className="list">
//           {filteredOthers.length > 0 ? (
//             filteredOthers.slice(0, visibleOthersCount).map((name, index) => (
//               <div key={index} className="item">
//                 <span className="icon">👤</span>
//                 <span className="text">{name}</span>
//               </div>
//             ))
//           ) : (
//             <div className="no-results">ไม่พบผลลัพธ์</div>
//           )}
//           {visibleOthersCount < filteredOthers.length && (
//             <button className="see-more" onClick={handleSeeMoreOthers}>
//               See more...
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar/Navbar"; // นำเข้า Navbar
import "./Search.css";

const Search = () => {
  const [history, setHistory] = useState([
    "Puvanart Saruttanontha",
    "Jirapuay Huacut",
    "Sittipab Rumyai",
    "Puvanart Saruttanontha",
  ]);
  const [others, setOthers] = useState([
    "Natapat Meejai",
    "Natapat Meejai",
    "Natapat Meejai",
    "Natapat Meejai",
    "Natapat Meejai",
    "Natapat Meejai",
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // สถานะสำหรับคำค้นหา
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(3);
  const [visibleOthersCount, setVisibleOthersCount] = useState(3);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHistory = history.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOthers = others.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeeMoreHistory = () => {
    setVisibleHistoryCount((prev) => prev + 3);
  };

  const handleSeeMoreOthers = () => {
    setVisibleOthersCount((prev) => prev + 3);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar tab="search" setTab={() => {}} /> {/* เพิ่ม Navbar */}

      <div className="container">
        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Section: History */}
        <div className="section">
          <h3 className="heading">History</h3>
          <div className="list">
            {filteredHistory.length > 0 ? (
              filteredHistory.slice(0, visibleHistoryCount).map((name, index) => (
                <div key={index} className="item">
                  <span className="icon">👤</span>
                  <span className="text">{name}</span>
                </div>
              ))
            ) : (
              <div className="no-results">ไม่พบผลลัพธ์</div>
            )}
            {visibleHistoryCount < filteredHistory.length && (
              <button className="see-more" onClick={handleSeeMoreHistory}>
                See more...
              </button>
            )}
          </div>
        </div>

        {/* Section: อื่นๆ */}
        <div className="section">
          <h3 className="heading">อื่นๆ</h3>
          <div className="list">
            {filteredOthers.length > 0 ? (
              filteredOthers.slice(0, visibleOthersCount).map((name, index) => (
                <div key={index} className="item">
                  <span className="icon">👤</span>
                  <span className="text">{name}</span>
                </div>
              ))
            ) : (
              <div className="no-results">ไม่พบผลลัพธ์</div>
            )}
            {visibleOthersCount < filteredOthers.length && (
              <button className="see-more" onClick={handleSeeMoreOthers}>
                See more...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
