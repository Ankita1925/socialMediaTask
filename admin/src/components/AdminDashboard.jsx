import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import './styles/Dashboard.css';

const UserCardDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all users on component mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/submissions') // Replace with your API endpoint
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Open modal and set selected user
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <nav>
        <div className="logo">
          <h2>Admin Panel</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link> {/* Use Link to navigate to the login page */}
          </li>
          <li>
            <a href="#all-listings">All Listings</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1>User Submissions</h1>
        <div className="card-container">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <img
                src={`http://localhost:5000/${user.images[0]}`}
                alt="User Thumbnail"
                className="card-image"
                onClick={() => handleViewProfile(user)}
              />
              <div className="card-details">
                <h3>{user.name}</h3>
                <p>@{user.socialMediaHandle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing user profile */}
        {showModal && selectedUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{selectedUser.name}</h2>
              <p>Social Media Handle: @{selectedUser.socialMediaHandle}</p>
              <div className="modal-images">
                {selectedUser.images.map((image, index) => (
                  <div key={index} className="image-wrapper">
                    <img
                      src={`http://localhost:5000/${image}`}
                      alt={`User Image ${index + 1}`}
                      className="modal-image"
                    />
                    <a
                      href={`http://localhost:5000/${image}`} // Image URL
                      download={`User_Image_${index + 1}`} // Image file name for download
                      className="download-icon"
                    >
                      ⬇ Download
                    </a>
                  </div>
                ))}
              </div>
              <button onClick={handleCloseModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCardDashboard;
