import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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
  }

  return (
    <div>
      {/* dashboard content */}
    </div>
  );
};

export default withAuthenticationRequired(UserProfile, {
  onRedirecting: () => <div>Loading...</div>,
});
