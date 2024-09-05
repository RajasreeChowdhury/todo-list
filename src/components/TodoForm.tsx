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
        className="flex-grow shadow-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-32"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
