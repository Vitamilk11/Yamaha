// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Message.css";

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

// function Message() {
//   const [contacts, setContacts] = useState([
//     { id: 1, name: "Jame", status: "Online", messages: [] },
//     { id: 2, name: "Fore", status: "Offline", messages: [] },
//     { id: 3, name: "View", status: "Online", messages: [] },
//   ]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [tab, setTab] = useState("message");

//   const selectUser = (user) => {
//     setSelectedUser(user);
//   };

//   const handleSend = () => {
//     if (newMessage.trim() && selectedUser) {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       const updatedContacts = contacts.map((contact) =>
//         contact.id === selectedUser.id
//           ? {
//               ...contact,
//               messages: [
//                 ...contact.messages,
//                 { text: newMessage, sender: "me", time: currentTime },
//               ],
//             }
//           : contact
//       );

//       setContacts(updatedContacts);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="message-page">
      
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="Navbar-container">
//           {tabs.map(({ name, label }) => (
//             <Link key={name} to={`/${name}`}>
//               <button
//                 className={`btn ${
//                   tab === name ? "btn-secondary" : "btn-outline-secondary"
//                 }`}
//                 onClick={() => setTab(name)}
//               >
//                 {label}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="messenger">
//           <div className="contact-list">
//             {contacts.map((contact) => (
//               <div
//                 key={contact.id}
//                 className={`contact-item ${
//                   selectedUser && selectedUser.id === contact.id ? "selected" : ""
//                 }`}
//                 onClick={() => selectUser(contact)}
//               >
//                 <div className="contact-avatar">{contact.name.charAt(0)}</div>
//                 <div className="contact-info">
//                   <div className="contact-name">{contact.name}</div>
//                   <div className="contact-status">{contact.status}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="chat-window">
//             {selectedUser ? (
//               <>
//                 <div className="chat-header">Chat with {selectedUser.name}</div>
//                 <div className="chat-messages">
//                   {selectedUser.messages.map((message, index) => (
//                     <div
//                       key={index}
//                       className={`chat-message ${
//                         message.sender === "me" ? "my-message" : "their-message"
//                       }`}
//                     >
//                       <div>{message.text}</div>
//                       <div className="message-time">{message.time}</div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chat-input">
//                   <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type a message"
//                   />
//                   <button onClick={handleSend}>Send</button>
//                 </div>
//               </>
//             ) : (
//               <div 
//                 className="chat-placeholder" 
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   textAlign: "center",
//                   height: "100%",
//                 }}
//               >
//                 <img 
//                   src="https://downloadr2.apkmirror.com/wp-content/uploads/2020/10/52/5f85c1715b292.png" 
//                   alt="Placeholder" 
//                   style={{ width: "120px", height: "120px", marginBottom: "10px" }} 
//                 />
//                 <div>เริ่มการสนทนา</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Message;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar/Navbar"; // นำเข้า Navbar
import "./Message.css";

const tabs = [
  { name: "home", label: "Home🏠" },
  { name: "explorer", label: "Explorer🌐" },
  { name: "search", label: "Search🔎" },
  { name: "message", label: "Message💬" },
  { name: "notification", label: "Notification🔔" },
  { name: "bookmark", label: "Bookmark📑" },
  { name: "profile", label: "Profile👤" },
  { name: "logout", label: "Logout" },
];

function Message() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Jame", status: "Online", messages: [] },
    { id: 2, name: "Fore", status: "Offline", messages: [] },
    { id: 3, name: "View", status: "Online", messages: [] },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [tab, setTab] = useState("message");

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSend = () => {
    if (newMessage.trim() && selectedUser) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const updatedContacts = contacts.map((contact) =>
        contact.id === selectedUser.id
          ? {
              ...contact,
              messages: [
                ...contact.messages,
                { text: newMessage, sender: "me", time: currentTime },
              ],
            }
          : contact
      );

      setContacts(updatedContacts);
      setNewMessage("");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar tab="message" setTab={setTab} /> {/* เรียก Navbar */}

      {/* Main Content */}
      <div className="message-page">
        <div className="sidebar">
          <div className="Navbar-container">
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
        </div>

        <div className="main-content">
          <div className="messenger">
            <div className="contact-list">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-item ${
                    selectedUser && selectedUser.id === contact.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => selectUser(contact)}
                >
                  <div className="contact-avatar">{contact.name.charAt(0)}</div>
                  <div className="contact-info">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-status">{contact.status}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-window">
              {selectedUser ? (
                <>
                  <div className="chat-header">Chat with {selectedUser.name}</div>
                  <div className="chat-messages">
                    {selectedUser.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`chat-message ${
                          message.sender === "me"
                            ? "my-message"
                            : "their-message"
                        }`}
                      >
                        <div>{message.text}</div>
                        <div className="message-time">{message.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message"
                    />
                    <button onClick={handleSend}>Send</button>
                  </div>
                </>
              ) : (
                <div className="chat-placeholder">
                  <img
                    src="https://downloadr2.apkmirror.com/wp-content/uploads/2020/10/52/5f85c1715b292.png"
                    alt="Placeholder"
                    style={{ width: "120px", height: "120px", marginBottom: "10px" }}
                  />
                  <div>เริ่มการสนทนา</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;



