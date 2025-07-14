import React from 'react';
import Button from '../../../components/ui/Button';


const NavigationControls = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onMarkForReview, 
  isMarkedForReview,
  onSubmit 
}) => {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            iconName="ChevronLeft"
            iconPosition="left"
            className="min-w-24"
          >
            Previous
          </Button>
          
          <Button
            variant={isMarkedForReview ? "warning" : "outline"}
            onClick={onMarkForReview}
            iconName="Flag"
            iconPosition="left"
          >
            {isMarkedForReview ? 'Unmark' : 'Mark for Review'}
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          {!isLastQuestion ? (
            <Button
              variant="primary"
              onClick={onNext}
              iconName="ChevronRight"
              iconPosition="right"
              className="min-w-24"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={onSubmit}
              iconName="Send"
              iconPosition="right"
            >
              Submit Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;