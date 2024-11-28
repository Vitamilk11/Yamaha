import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./Confirm.css";

const Confirm = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isImageValid, setIsImageValid] = useState(false);  // สถานะการตรวจสอบภาพ
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const model = await cocoSsd.load();
      const img = document.createElement("img");
      img.src = imageUrl;

      img.onload = async () => {
        const predictions = await model.detect(img);
        const hasMotorbike = predictions.some((p) => p.class === "motorcycle");
        const hasPerson = predictions.some((p) => p.class === "person");

        if (hasMotorbike && hasPerson) {
          setMessage("รูปภาพถูกต้อง! มีทั้งคนและจักรยานยนต์.");
          setIsImageValid(true); // การตรวจสอบสำเร็จ
        } else {
          setMessage("รูปภาพไม่ถูกต้อง! กรุณาตรวจสอบให้มั่นใจว่ามีทั้งคนและจักรยานยนต์.");
          setIsImageValid(false); // การตรวจสอบไม่สำเร็จ
        }
      };
    }
  };

  const handleButtonClick = () => {
    if (isImageValid) {
      setMessage("ตรวจสอบสำเร็จ! กำลังเปลี่ยนหน้า...");
      setTimeout(() => {
        navigate("/login"); // ไปที่หน้า login หลังจากตรวจสอบสำเร็จ
      }, 1500); // รอ 1.5 วินาทีก่อนเปลี่ยนหน้า
    } else {
      alert("กรุณาอัปโหลดรูปภาพที่ถูกต้อง!");
    }
  };

  return (
    <div className="confirm-container">
        <div className="logo"></div>
      <h1>การยืนยัน</h1>
      <p>คุณได้ลงทะเบียนสำเร็จแล้ว</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-input"
      />
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      {message && <p className="result-message">{message}</p>}
      <button onClick={handleButtonClick} className="comfirm-button">
      Confirm
      </button>
    </div>
  );
};

export default Confirm;





// import React, { useState } from 'react';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs';
// import { useNavigate } from 'react-router-dom';
// import './Comfirm.css';

// const Comfirm = () => {
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);

//       // โหลดโมเดล Coco-SSD
//       const model = await cocoSsd.load();
//       const img = document.createElement('img');
//       img.src = imageUrl;

//       // รอให้โหลดภาพเสร็จก่อนวิเคราะห์
//       img.onload = async () => {
//         const predictions = await model.detect(img);
//         const hasMotorbike = predictions.some((p) => p.class === 'motorcycle');
//         const hasPerson = predictions.some((p) => p.class === 'person');

//         if (hasMotorbike && hasPerson) {
//           setMessage('ภาพถูกต้อง! มีทั้งคนและรถมอเตอร์ไซค์');
//         } else {
//           setMessage('ไม่สำเร็จ! ต้องมีคนและรถมอเตอร์ไซค์ในภาพ');
//         }
//       };
//     }
//   };

//   const handleButtonClick = () => {
//     if (message === 'ภาพถูกต้อง! มีทั้งคนและรถมอเตอร์ไซค์') {
//       navigate('/login'); // เปลี่ยนหน้าไปยัง Login
//     } else {
//       alert('กรุณาอัปโหลดรูปภาพที่มีคนและรถมอเตอร์ไซค์!');
//     }
//   };

//   return (
//     <div className="confirm-container">
//       <h1>Confirm!</h1>
//       <p>You have successfully registered.</p>

//       {/* อัปโหลดรูป */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="upload-input"
//       />

//       {/* แสดงรูปภาพ */}
//       {image && <img src={image} alt="Uploaded" className="uploaded-image" />}

//       {/* แสดงข้อความผลลัพธ์ */}
//       {message && <p className="result-message">{message}</p>}

//       {/* ปุ่มเปลี่ยนหน้า */}
//       <button onClick={handleButtonClick} className="comfirm-button">
//         ตกลง
//       </button>
//     </div>
//   );
// };

// export default Comfirm;





// import React, { useState } from 'react';
// import './Comfirm.css';

// const Comfirm = () => {
//   const [image, setImage] = useState(null);

//   const handleImageUpload = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl); // Set the image URL to display it
//     }
//   };

//   return (
//     <div className="confirm-container">
//       <h1>Confirm!</h1>
//       <p>You have successfully registered.</p>

//       {/* Image Upload Section */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="upload-input"
//       />

//       {/* Display Uploaded Image */}
//       {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
//     </div>
//   );
// };

// export default Comfirm;
