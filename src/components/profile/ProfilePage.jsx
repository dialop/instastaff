import React from 'react';
import Nav from '../Nav';
import Modal from '../Modal';
import CalendarComponent from '../CalendarComponent';
import MapPage from '../MapPage';
import MonthlyChart from '../profile/MonthlyChart';
import IncentivesPieChart from '../profile/IncentivesPieChart';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const { userData, badgesData, graphData } = useApplicationData();

  const monthlyPerformanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },

  ];

  const incentivesData = [
    { name: 'Incentive 1', value: 400 },
    { name: 'Incentive 2', value: 300 },

  ];

  return (
    <div>
      <Nav />
      <div className="profile-page-container">
        <div className="profile-header">
          {/* Profile Photo and Info */}
        </div>
        <div className="profile-content">
          <div className="badges-section">
            {/* Render badges */}
          </div>
          <div className="graphs-section">
            {/* Render graphs */}
            <MonthlyChart data={monthlyPerformanceData} />
            <IncentivesPieChart data={incentivesData} />
          </div>
        </div>
        <Modal />
      </div>
    </div>
  );
}

export default ProfilePage;
