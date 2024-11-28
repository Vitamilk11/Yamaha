import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("19%🫀:)👻");
  const [name, setName] = useState(""); // เพิ่ม state สำหรับชื่อ
  const [updatedProfilePic, setUpdatedProfilePic] = useState(null); // สร้าง state สำหรับเก็บรูปใหม่
  const [updatedName, setUpdatedName] = useState(""); // สร้าง state สำหรับเก็บชื่อใหม่

  // ใช้ useEffect เพื่อดึงข้อมูลจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedProfilePic = localStorage.getItem("profilePic");
    const savedName = localStorage.getItem("profileName");
    if (savedProfilePic) setProfilePic(savedProfilePic);
    if (savedName) setName(savedName);
  }, []);

  // ฟังก์ชันสำหรับเปลี่ยนรูปโปรไฟล์
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUpdatedProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ฟังก์ชันยืนยันการเปลี่ยนแปลง
  const handleConfirmChanges = () => {
    const newProfilePic = updatedProfilePic || profilePic;
    // ถ้า updatedName เป็นค่าว่างให้ใช้ name เดิม
    const newName = updatedName.trim() !== "" ? updatedName : name;

    // เก็บข้อมูลใน localStorage
    localStorage.setItem("profilePic", newProfilePic);
    localStorage.setItem("profileName", newName);

    // อัปเดต state และไปยังหน้าโปรไฟล์
    setProfilePic(newProfilePic);
    setName(newName);
    setUpdatedName(newName);  // รีเซ็ต updatedName ให้ตรงกับ newName
    navigate("/profile"); // นำทางไปหน้าโปรไฟล์
  };

  const handleBackToProfile = () => navigate("/profile");

  return (
    <div className="profile-edit">
      <h1>แก้ไขโปรไฟล์</h1>
      <div className="profile-pic-container">
        <img
          className="profile-pic"
          src={updatedProfilePic || profilePic || "default-profile.jpg"}
          alt="Profile"
        />
        <label htmlFor="profile-pic-input" className="change-photo-btn">
          เปลี่ยนรูปภาพ
        </label>
        <input
          id="profile-pic-input"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="profile-info">
        <div className="input-group">
          <label>ชื่อ</label>
          <input
            type="text"
            value={updatedName} // ใช้ชื่อใหม่หากมีการเปลี่ยนแปลง
            onChange={(e) => setUpdatedName(e.target.value)} // แก้ไขชื่อใหม่ใน state
            placeholder="ชื่อ"
          />
        </div>
        <div className="input-group">
          <label>เกี่ยวกับตัวเอง</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength="150"
            placeholder="เขียนเกี่ยวกับตัวเอง"
          />
        </div>
      </div>

      <button onClick={handleConfirmChanges} className="confirm-btn">
        ยืนยัน
      </button>
{/* 
      <button onClick={handleBackToProfile} className="back-btn">
        กลับไปที่โปรไฟล์
      </button> */}
    </div>
  );
};

export default EditProfile;






