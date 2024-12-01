
// import React from "react";
// import "./Aboutdev.css";
// import Navbar from "../../layouts/Navbar/Navbar"
// function Aboutdev() {
//   return (
//     <div className="aboutdev-wrapper">
//         <Navbar tab="aboutdev" setTab={() => {}} /> 
//       <div className="aboutdev-container">
//         {/* ด้านซ้าย - ข้อความ */}
//         <div className="aboutdev-text">
//           <h2>Our Story</h2>
//           <p>
//             เว็บไซต์นี้ถูกออกแบบมาเพื่อเป็นพื้นที่ให้ผู้ใช้รถ Yamaha ทุกคน 
//             สามารถโพสต์รูปภาพ แลกเปลี่ยนความคิดเห็น แชร์ไลฟ์สไตล์ และพูดคุยกันในเรื่องที่เกี่ยวกับมอเตอร์ไซค์ที่พวกเขารัก 
//             ทีมงานของเราตั้งใจสร้างพื้นที่นี้เพื่อชุมชนที่หลงใหลใน Yamaha ได้รวมตัวกัน!
//           </p>
//           <p>สมาชิกทีมผู้พัฒนา:</p>
//           <ul>
//             <li>66045650 นายสิทธิภาพ โอสถ</li>
//             <li>66048864 นายจิระพัฒน์ เรืองหิรัญ</li>
//             <li>66053976 นายณัฐภัทร มารวย</li>
//             <li>66065761 นายภูวนาท ศรุตติ์ตานนทร์</li>
//           </ul>
//         </div>

//         {/* ด้านขวา - รูปสมาชิกทีม */}
//         <div className="aboutdev-images">
//           <div className="image-row">
//             <img
//               src="/images/image-1.png"
//               alt="สิทธิภาพ โอสถ"
//               className="team-member"
//             />
//             <img
//               src="/images/image-2.png"
//               alt="จิระพัฒน์ เรืองหิรัญ"
//               className="team-member"
//             />
//           </div>
//           <div className="image-row">
//             <img
//               src="/images/image-3.png"
//               alt="ณัฐภัทร มารวย"
//               className="team-member"
//             />
//             <img
//                src="/images/image-4.png"
//               alt="ภูวนาท ศรุตติ์ตานนทร์"
//               className="team-member"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Aboutdev;


import React from "react";
import "./Aboutdev.css";
import Navbar from "../../layouts/Navbar/Navbar";

function Aboutdev() {
  return (
    <div className="aboutdev-wrapper">
      <Navbar tab="aboutdev" setTab={() => {}} />
      <div className="aboutdev-container">
        {/* กรอบข้อความ */}
        <div className="aboutdev-text">
          <h2>Our Story</h2>
          <p>
            เว็บไซต์นี้ถูกออกแบบมาเพื่อเป็นพื้นที่ให้ผู้ใช้รถ Yamaha ทุกคน
            สามารถโพสต์รูปภาพ แลกเปลี่ยนความคิดเห็น แชร์ไลฟ์สไตล์ และพูดคุยกันในเรื่องที่เกี่ยวกับมอเตอร์ไซค์ที่พวกเขารัก
            ทีมงานของเราตั้งใจสร้างพื้นที่นี้เพื่อชุมชนที่หลงใหลใน Yamaha ได้รวมตัวกัน!
          </p>
          <p>สมาชิกทีมผู้พัฒนา:</p>
          <ul>
            <li>66045650 นายสิทธิภาพ โอสถ</li>
            <li>66048864 นายจิระพัฒน์ เรืองหิรัญ</li>
            <li>66053976 นายณัฐภัทร มารวย</li>
            <li>66065761 นายภูวนาท ศรุตติ์ตานนทร์</li>
          </ul>
        </div>

        {/* กรอบรูปสมาชิกทีม */}
        <div className="aboutdev-images">
          <img
            src="/images/image-1.png"
            alt="สิทธิภาพ โอสถ"
            className="team-member"
          />
          <img
            src="/images/image-2.png"
            alt="จิระพัฒน์ เรืองหิรัญ"
            className="team-member"
          />
          <img
            src="/images/image-3.png"
            alt="ณัฐภัทร มารวย"
            className="team-member"
          />
          <img
            src="/images/image-4.png"
            alt="ภูวนาท ศรุตติ์ตานนทร์"
            className="team-member"
          />
        </div>
      </div>
    </div>
  );
}

export default Aboutdev;
