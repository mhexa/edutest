import React from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving }) => {
  const formatLastSaved = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInSeconds = Math.floor((now - saved) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    return saved.toLocaleTimeString();
  };

  return (
    <div className="flex items-center space-x-2 text-xs text-gray-500">
      {isSaving ? (
        <>
          <div className="animate-spin">
            <Icon name="Loader2" size={14} />
          </div>
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Icon name="Check" size={14} className="text-green-500" />
          <span>Last saved: {formatLastSaved(lastSaved)}</span>
        </>
      )}
    </div>
  );
};

export default AutoSaveIndicator;