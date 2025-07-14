import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TestConfiguration = ({ config, onConfigChange, onSaveTest, onScheduleTest }) => {
  const handleToggle = (field) => {
    onConfigChange(field, !config[field]);
  };

  return (
    <div className="bg-surface rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-onSurface mb-6">Test Configuration</h3>

      <div className="space-y-6">
        {/* Basic Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-onSurface mb-2">Instructions</label>
            <textarea
              value={config.instructions}
              onChange={(e) => onConfigChange('instructions', e.target.value)}
              placeholder="Enter test instructions for students..."
              className="w-full px-3 py-2 bg-surface border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="4"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">Passing Marks (%)</label>
              <Input
                type="number"
                value={config.passingMarks}
                onChange={(e) => onConfigChange('passingMarks', parseInt(e.target.value) || 0)}
                placeholder="60"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">Max Attempts</label>
              <select
                value={config.maxAttempts}
                onChange={(e) => onConfigChange('maxAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-surface border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={1}>1 Attempt</option>
                <option value={2}>2 Attempts</option>
                <option value={3}>3 Attempts</option>
                <option value={-1}>Unlimited</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-medium text-onSurface mb-4">Advanced Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-onSurface">Randomize Questions</label>
                  <p className="text-xs text-gray-500">Shuffle question order for each student</p>
                </div>
                <button
                  onClick={() => handleToggle('randomizeQuestions')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.randomizeQuestions ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.randomizeQuestions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-onSurface">Randomize Options</label>
                  <p className="text-xs text-gray-500">Shuffle answer options for each question</p>
                </div>
                <button
                  onClick={() => handleToggle('randomizeOptions')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.randomizeOptions ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.randomizeOptions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-onSurface">Show Results Immediately</label>
                  <p className="text-xs text-gray-500">Display results after test completion</p>
                </div>
                <button
                  onClick={() => handleToggle('showResultsImmediately')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.showResultsImmediately ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.showResultsImmediately ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-onSurface">Allow Review</label>
                  <p className="text-xs text-gray-500">Let students review answers before submission</p>
                </div>
                <button
                  onClick={() => handleToggle('allowReview')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.allowReview ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.allowReview ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-onSurface">Auto Submit</label>
                  <p className="text-xs text-gray-500">Automatically submit when time expires</p>
                </div>
                <button
                  onClick={() => handleToggle('autoSubmit')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.autoSubmit ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.autoSubmit ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-onSurface">Prevent Tab Switching</label>
                  <p className="text-xs text-gray-500">Monitor and restrict tab switching during test</p>
                </div>
                <button
                  onClick={() => handleToggle('preventTabSwitching')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.preventTabSwitching ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.preventTabSwitching ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduling */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-medium text-onSurface mb-4">Test Scheduling</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">Start Date & Time</label>
              <Input
                type="datetime-local"
                value={config.startDateTime}
                onChange={(e) => onConfigChange('startDateTime', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">End Date & Time</label>
              <Input
                type="datetime-local"
                value={config.endDateTime}
                onChange={(e) => onConfigChange('endDateTime', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">Time Zone</label>
              <select
                value={config.timeZone}
                onChange={(e) => onConfigChange('timeZone', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Asia/Kolkata">India Standard Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <Icon name="Info" size={16} className="inline mr-1" />
              Test will be saved as draft until scheduled
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onSaveTest} iconName="Save">
                Save as Draft
              </Button>
              <Button variant="primary" onClick={onScheduleTest} iconName="Calendar">
                Schedule Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConfiguration;