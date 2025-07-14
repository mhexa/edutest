import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClassAssignment = ({ classes, selectedClasses, onClassToggle, onAssignTest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      filteredClasses.forEach(classItem => {
        if (!selectedClasses.includes(classItem.id)) {
          onClassToggle(classItem.id);
        }
      });
    } else {
      filteredClasses.forEach(classItem => {
        if (selectedClasses.includes(classItem.id)) {
          onClassToggle(classItem.id);
        }
      });
    }
  };

  const getSelectedStudentCount = () => {
    return classes
      .filter(classItem => selectedClasses.includes(classItem.id))
      .reduce((total, classItem) => total + classItem.studentCount, 0);
  };

  return (
    <div className="bg-surface rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-onSurface">Assign to Classes</h3>
        <div className="text-sm text-gray-600">
          {selectedClasses.length} classes selected ({getSelectedStudentCount()} students)
        </div>
      </div>

      {/* Search and Select All */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={handleSelectAll}
          iconName={selectAll ? "CheckSquare" : "Square"}
        >
          {selectAll ? 'Deselect All' : 'Select All'}
        </Button>
      </div>

      {/* Class List */}
      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {filteredClasses.map(classItem => (
          <div
            key={classItem.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedClasses.includes(classItem.id)
                ? 'border-primary bg-primary bg-opacity-10' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onClassToggle(classItem.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedClasses.includes(classItem.id)
                    ? 'border-primary bg-primary' :'border-gray-300'
                }`}>
                  {selectedClasses.includes(classItem.id) && (
                    <Icon name="Check" size={14} className="text-white" />
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-onSurface">{classItem.name}</h4>
                  <p className="text-sm text-gray-600">{classItem.subject} • Grade {classItem.grade}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-onSurface">
                  {classItem.studentCount} students
                </div>
                <div className="text-xs text-gray-500">
                  {classItem.activeStudents} active
                </div>
              </div>
            </div>

            {/* Class Details */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Teacher: {classItem.teacher}</span>
                <span>Room: {classItem.room}</span>
                <span>Schedule: {classItem.schedule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No classes found matching your search</p>
        </div>
      )}

      {/* Assignment Summary */}
      {selectedClasses.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Assignment Summary</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {selectedClasses.length} classes will receive this test</li>
                  <li>• {getSelectedStudentCount()} students will be notified</li>
                  <li>• Test will be available according to the scheduled time</li>
                  <li>• Students can access the test from their dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Ready to assign test to selected classes
            </div>
            
            <Button
              variant="primary"
              onClick={onAssignTest}
              iconName="Send"
              disabled={selectedClasses.length === 0}
            >
              Assign Test
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAssignment;