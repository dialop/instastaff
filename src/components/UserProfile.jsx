import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      sendUserDataToBackend();
      fetchUserProfileData();
    }
  }, [isAuthenticated, user]);

  const sendUserDataToBackend = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const userData = {
        email: user.email,
        first_name: user.given_name,
        last_name: user.family_name,
      };

      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to send user data to backend');
      }
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  if (isAuthenticated) {
    sendUserDataToBackend();
  };

  const fetchUserProfileData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch('http://localhost:3000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile data');
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  };

  return (
    <div>
      {profileData ? (
        <div>
          <h2>User Profile</h2>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>First Name:</strong> {profileData.first_name}</p>
          <p><strong>Last Name:</strong> {profileData.last_name}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default withAuthenticationRequired(UserProfile, {
  onRedirecting: () => <div>Loading...</div>,
});
