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


  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCancel = () => {
  };

  return (
    <div className="settings-container">
      <aside className="sidebar">
     
        <a href="#edit-profile">Edit profile</a>
   
      </aside>
      <main className="profile-content">
        <header className="settings-header">
          <h1>Edit profile</h1>
        </header>
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
    
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" defaultValue={userData.address} />
            </div>
           
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