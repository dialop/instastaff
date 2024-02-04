import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip } from '@mui/material';

const ProfileCard = () => {

  // Sample data, replace with userData from backend.
  const profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    occupation: 'Registered Nurse',
    isHero: true,
    profilePicture: 'https://i.pravatar.cc/300',
  };

  return (
    <Card className="max-w-sm mx-auto mt-10 bg-white shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex justify-center mt-4">
        <Avatar alt="User" src={profile.profilePicture} sx={{ width: 100, height: 100 }} />
      </div>
      <CardContent>
        <Typography className="text-center text-xl font-semibold mb-2">
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography className="text-center text-gray-600 mb-2">
          {profile.occupation}
        </Typography>
        <Typography className="text-center text-gray-500 mb-4">
          {profile.email}
        </Typography>
        {profile.isHero && (
          <div className="flex justify-center">
            <Chip label="Emergency Hero" color="primary" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
