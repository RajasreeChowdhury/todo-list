import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Incomplete' | 'High' | 'Medium' | 'Low'>('All');

  const addTodo = (text: string, priority: 'High' | 'Medium' | 'Low') => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const updateTodoText = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Incomplete') return !todo.completed;
    return todo.priority === filter;
  });

  const filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Completed Tasks', value: 'Completed' },
    { label: 'Incomplete Tasks', value: 'Incomplete' },
    { label: 'High Priority', value: 'High' },
    { label: 'Medium Priority', value: 'Medium' },
    { label: 'Low Priority', value: 'Low' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-xl font-bold text-white">Filters</h2>
        </div>
        <nav className="mt-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`w-full text-left px-4 py-2 transition-colors duration-200 ease-in-out
                ${filter === option.value
                  ? 'bg-blue-100 text-white-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-extrabold text-white text-center">
                To-Do List
              </h1>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8">
              <TodoForm addTodo={addTodo} />

              <TodoList 
                todos={filteredTodos} 
                toggleTodo={toggleTodo} 
                deleteTodo={deleteTodo} 
                editTodo={editTodo}
                updateTodoText={updateTodoText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;