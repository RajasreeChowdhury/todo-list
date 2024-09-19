import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  updateTodoText: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo, updateTodoText }) => {
  const [editedText, setEditedText] = useState<string>('');

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const handleEdit = (todo: Todo) => {
    if (todo.isEditing) {
      updateTodoText(todo.id, editedText);
    } else {
      setEditedText(todo.text);
      editTodo(todo.id);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Tasks</h2>
      <div className="overflow-y-auto max-h-[300px] pr-2 space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="text-blue-500 focus:ring-blue-400 transition-all"
              />
              {todo.isEditing ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                />
              ) : (
                <span className={`${todo.completed ? 'line-through text-gray-500' : ''} text-lg`}>
                  {todo.text}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className={`${getPriorityColor(todo.priority)} font-semibold`}>
                {todo.priority}
              </span>
              {todo.isEditing ? (
                <button
                  onClick={() => updateTodoText(todo.id, editedText)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-lg text-sm transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default TodoList;