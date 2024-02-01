import React from 'react';
import Nav from '../Nav';
import Modal from '../Modal';
import CalendarComponent from '../CalendarComponent';
import MapPage from '../MapPage';
import MonthlyChart from '../profile/MonthlyChart';
import IncentivesPieChart from '../profile/IncentivesPieChart';
import '../styles/ProfilePage.css';
import { useApplicationData } from '../hooks/useApplicationData'; 
import './ProfilePage.css';


function ProfilePage() {
  const { userData } = useApplicationData(); 

  // Assuming `userData` is an object with user's current info
  // You can use useState to manage form inputs with initial values from userData

  // Example of form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, like sending data to a backend server
  };

  // Example of cancel button handler
  const handleCancel = () => {
    // Logic to handle cancellation, like reverting to previous page or state
  };

  return (
    <div className="settings-container">
      <aside className="sidebar">
        {/* Add sidebar links here */}
        <a href="#edit-profile">Edit profile</a>
        {/* ... other links ... */}
      </aside>
      <main className="profile-content">
        <header className="settings-header">
          <h1>Edit profile</h1>
        </header>
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            {/* ... form groups for first name, last name, email ... */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" defaultValue={userData.address} />
            </div>
            {/* ... additional form groups for contact number, city, state, password ... */}
            <div className="form-actions">
              <button type="button" onClick={handleCancel}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}


export default ProfilePage;