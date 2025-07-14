import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const QuestionBankSidebar = ({ questionBanks, onQuestionSelect, selectedQuestions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Geography'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions = questionBanks.filter(question => {
    const matchesSearch = question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || question.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const isQuestionSelected = (questionId) => {
    return selectedQuestions.some(q => q.id === questionId);
  };

  return (
    <div className="bg-surface border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-onSurface mb-4">Question Bank</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search questions..."
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

        {/* Filters */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-onSurface mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-onSurface mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Question List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredQuestions.map(question => (
            <div
              key={question.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                isQuestionSelected(question.id)
                  ? 'border-primary bg-primary bg-opacity-10' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onQuestionSelect(question)}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  question.difficulty === 'Medium'? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {question.difficulty}
                </span>
                {isQuestionSelected(question.id) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
              
              <p className="text-sm text-onSurface mb-2 line-clamp-3">
                {question.content}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{question.subject}</span>
                <span>{question.source}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No questions found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600">
          <div className="flex justify-between mb-1">
            <span>Available Questions:</span>
            <span className="font-medium">{filteredQuestions.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected Questions:</span>
            <span className="font-medium text-primary">{selectedQuestions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankSidebar;