import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'test': return 'FileText';
      case 'grade': return 'Award';
      case 'reminder': return 'Bell';
      case 'announcement': return 'Megaphone';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'test': return 'text-blue-600';
      case 'grade': return 'text-green-600';
      case 'reminder': return 'text-orange-600';
      case 'announcement': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffMinutes = Math.floor((now - notificationDate) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button 
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            iconName="CheckCheck"
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filter === 'all' ?'bg-blue-100 text-blue-700' :'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filter === 'unread' ?'bg-blue-100 text-blue-700' :'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} color="#D1D5DB" />
            <p className="text-gray-500 mt-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                notification.read 
                  ? 'border-gray-200 bg-white' :'border-blue-200 bg-blue-50'
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                  <Icon name={getNotificationIcon(notification.type)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className={`text-sm font-medium ${
                      notification.read ? 'text-gray-900' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  
                  <p className={`text-sm mt-1 ${
                    notification.read ? 'text-gray-600' : 'text-gray-700'
                  }`}>
                    {notification.message}
                  </p>
                  
                  {notification.actionRequired && (
                    <div className="mt-2">
                      <span className="inline-flex items-center text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                        <Icon name="AlertCircle" size={12} className="mr-1" />
                        Action Required
                      </span>
                    </div>
                  )}
                </div>
                
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;