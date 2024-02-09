import React from 'react';
// Import Material-UI components if needed for additional styling

const PointsProgress = ({ currentPoints, totalPoints, nextRewardPoints }) => {
  // Calculate the percentage of progress
  const progressPercent = (currentPoints / totalPoints) * 100;

  return (
    <div className="flex flex-col items-center space-y-2 p-4">
      <div className="text-lg font-medium">
        {`${currentPoints}/${totalPoints} points`}
      </div>
      {/* Tailwind styled linear progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="text-sm">
        {`${nextRewardPoints} points to your next reward`}
      </div>
    </div>
  );
};

export default PointsProgress;
