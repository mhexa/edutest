import React from 'react';
import Icon from '../../../components/AppIcon';

const TestHeader = ({ studentName, testTitle, timeRemaining, onSubmit }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 300) return 'text-red-600'; // 5 minutes
    if (timeRemaining <= 900) return 'text-yellow-600'; // 15 minutes
    return 'text-green-600';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{studentName}</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <h1 className="text-lg font-semibold text-gray-900">{testTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className={getTimerColor()} />
            <span className={`text-lg font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Submit Test
          </button>
        </div>
      </div>
    </header>
  );
};

export default TestHeader;