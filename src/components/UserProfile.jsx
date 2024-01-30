import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [dataSent, setDataSent] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !dataSent) {
      sendUserDataToBackend();
    }
  }, [isAuthenticated, user, dataSent]);

  const sendUserDataToBackend = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const userData = {
        email: user.email,
        first_name: user.given_name,
        last_name: user.family_name,
      };

      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setDataSent(true);
      } else {
        throw new Error('Failed to send user data to backend');
      }
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  return (
    <div>
      {/* User profile content */}
    </div>
  );
};

export default UserProfile;