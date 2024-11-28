import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [action, setAction] = useState("");  // ใช้เพื่อเปลี่ยนสถานะระหว่างการสมัครและล็อกอิน
  const [username, setUsername] = useState("");  // เก็บชื่อผู้ใช้
  const [email, setEmail] = useState("");  // เก็บอีเมล
  const [password, setPassword] = useState("");  // เก็บรหัสผ่าน
  const [termsAccepted, setTermsAccepted] = useState(false);  // ตรวจสอบว่าผู้ใช้ยอมรับข้อตกลงหรือไม่
  const navigate = useNavigate();

  // ฟังก์ชันเมื่อผู้ใช้สมัครสมาชิก
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must agree to the terms and conditions!");
      return;
    }

    // เก็บข้อมูลผู้ใช้ใน localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // เปลี่ยนเส้นทางไปหน้าการยืนยันหรือหน้า Home หลังจากสมัครสำเร็จ
    navigate("/confirm");
  };

  // ฟังก์ชันเมื่อผู้ใช้ล็อกอิน
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    // ตรวจสอบข้อมูลล็อกอิน
    if (username === savedUsername && password === savedPassword) {
      navigate("/home");  // ถ้าข้อมูลตรงกัน นำไปที่หน้า Home
    } else {
      alert("Invalid login credentials!");
    }
  };

  return (
    <div className={`wrapper ${action}`}>
      {/* ฟอร์มล็อกอิน */}
      <div className={`form-box login ${action === "" ? "active" : ""}`}>
        <form onSubmit={handleLoginSubmit} autoComplete="off"> {/* ปิดการเก็บข้อมูลอัตโนมัติในฟอร์ม */}
          <div className="logo"></div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off" 
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" 
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => setAction("active")}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* ฟอร์มสมัครสมาชิก */}
      <div className={`form-box register ${action === "active" ? "active" : ""}`}>
        <form onSubmit={handleRegisterSubmit} autoComplete="off"> 
          <div className="logo"></div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"  
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"  
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" 
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              I agree to the terms & conditions
            </label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
        
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setAction("")}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;





// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ใช้ useNavigate สำหรับการนำทาง
// import "./Login.css";
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

// const Login = () => {
//   const [action, setAction] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const navigate = useNavigate(); // สร้าง instance ของ useNavigate

//   const registerLink = () => {
//     setAction("active");
//   };

//   const loginLink = () => {
//     setAction("");
//   };

//   // Handle the register form submission
//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();

//     // Check if terms and conditions are accepted
//     if (!termsAccepted) {
//       alert("You must agree to the terms and conditions!");
//       return;
//     }

//     navigate("/comfirm");
//   };

//   return (
//     <div className={`wrapper ${action}`}>
//       <div className="form-box login">
//         <form>
//           <div className="logo"></div>
//           <div className="input-box">
//             <input type="text" placeholder="Username" required />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="Password" required />
//             <FaLock className="icon" />
//           </div>
//           <button type="submit">Login</button>
//           <div className="register-link">
//             <p>
//               Don't have an account?{" "}
//               <a href="#" onClick={registerLink}>
//                 Register
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//       <div className="form-box register">
//         <form onSubmit={handleRegisterSubmit}>
//           {" "}
//           {/* ใช้ onSubmit สำหรับการส่งฟอร์ม */}
//           <div className="logo"></div>
//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Username"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="email"
//               placeholder="Email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <FaEnvelope className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock className="icon" />
//           </div>
//           <div className="remember-forgot">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={() => setTermsAccepted(!termsAccepted)}
//               />
//               I agree to the terms & conditions
//             </label>
//           </div>
//           <Link to="/Comfirm">
//             <button onClick={() => navigate({ handleRegisterSubmit })}>
//               Register
//             </button>
//           </Link>
//           <div className="register-link">
//             <p>
//               Already have an account?{" "}
//               <a href="#" onClick={loginLink}>
//                 Login
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// โค้ดหลัก
// import React, { useState } from 'react';
// import './Login.css';
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

// const Login = () => {
//   const [action, setAction] = useState('');

//   const registerLink = () => {
//     setAction('active');
//   };

//   const loginLink = () => {
//     setAction('');
//   };

//   return (
//     <div className={`wrapper ${action}`}>
//       <div className="form-box login">
//         <form action="">
//          <div className='logo'></div>
//          <h4>สมัครใช้งานเพื่อดูรูปภาพและวิดีโอใหม่ๆ จาก YAMAHA</h4>
//           <div className="input-box">
//             <input type="text" placeholder="Username" required />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="Password" required />
//             <FaLock className="icon" />
//           </div>

//           <div className="remember-forgot">
//             <label>
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="#">Forgot Password?</a>
//           </div>
//           <button type="submit">Login</button>
//           <div className="register-link">
//             <p>
//               Don't have an account? <a href="#" onClick={registerLink}>Register</a>
//             </p>
//           </div>
//         </form>
//       </div>
//       <div className="form-box register">
//         <form action="">
//          <div className='logo'></div>
//           <div className="input-box">
//             <input type="text" placeholder="Username" required />
//             <FaUser className="icon"/>
//           </div>
//           <div className="input-box">
//             <input type="email" placeholder="Email" required />
//             <FaEnvelope className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="Password" required />
//             <FaLock className="icon" />
//           </div>
//           <div className="remember-forgot">
//             <label>
//               <input type="checkbox" /> I agree to the terms & conditions
//             </label>
//           </div>

//           <button type="submit">Register</button>

//           <div className="register-link">
//             <p>
//               Already have an account? <a href="#" onClick={loginLink}>Login</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
