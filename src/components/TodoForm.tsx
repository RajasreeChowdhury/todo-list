import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (text: string, priority: 'High' | 'Medium' | 'Low') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, priority);
      setText('');
      setPriority('Medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center space-x-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow shadow-lg border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
      />
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all w-40"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all hover:shadow-2xl"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;