import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserInfo = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user, getAccessTokenSilently]);

  if (!userInfo) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h3>User Information</h3>
      <p>First Name: {userInfo.first_name}</p>
      <p>Last Name: {userInfo.last_name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Handle: {userInfo.handle}</p>
      <p>Occupation: {userInfo.occupation}</p>
      <p>Gender: {userInfo.gender}</p>
      <p>License: {userInfo.license}</p>
      <p>Points: {userInfo.points}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserInfo;
