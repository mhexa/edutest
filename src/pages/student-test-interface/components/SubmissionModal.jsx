import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubmissionModal = ({ isOpen, onClose, onConfirm, testStats }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onConfirm();
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Submit Test</h3>
              <p className="text-sm text-gray-600">Are you sure you want to submit your test?</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Test Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-medium">{testStats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Answered:</span>
                <span className="font-medium text-green-600">{testStats.answered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Marked for Review:</span>
                <span className="font-medium text-yellow-600">{testStats.markedForReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Not Answered:</span>
                <span className="font-medium text-red-600">{testStats.notAnswered}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Important:</p>
                <p className="text-yellow-700">
                  Once you submit, you cannot make any changes to your answers. 
                  Please review your responses before submitting.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              fullWidth
            >
              Review Answers
            </Button>
            <Button
              variant="danger"
              onClick={handleSubmit}
              loading={isSubmitting}
              fullWidth
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;