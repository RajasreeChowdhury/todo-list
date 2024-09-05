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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center py-10 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          To-Do List
        </h1>

        <TodoForm addTodo={addTodo} />

        {/* Filters */}
        <div className="mt-8 mb-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => setFilter('All')} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
            All
          </button>
          <button onClick={() => setFilter('Completed')} className="px-4 py-2 bg-green-100 text-green-700 rounded-full shadow-md hover:bg-green-200 transition duration-300 ease-in-out">
            Completed
          </button>
          <button onClick={() => setFilter('Incomplete')} className="px-4 py-2 bg-red-100 text-red-700 rounded-full shadow-md hover:bg-red-200 transition duration-300 ease-in-out">
            Incomplete
          </button>
          <button onClick={() => setFilter('High')} className="px-4 py-2 bg-red-100 text-red-700 rounded-full shadow-md hover:bg-red-200 transition duration-300 ease-in-out">
            High
          </button>
          <button onClick={() => setFilter('Medium')} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full shadow-md hover:bg-yellow-200 transition duration-300 ease-in-out">
            Medium
          </button>
          <button onClick={() => setFilter('Low')} className="px-4 py-2 bg-green-100 text-green-700 rounded-full shadow-md hover:bg-green-200 transition duration-300 ease-in-out">
            Low
          </button>
        </div>

        <TodoList 
  todos={filteredTodos} 
  toggleTodo={toggleTodo} 
  deleteTodo={deleteTodo} 
  editTodo={editTodo}
  updateTodoText={updateTodoText}
/>
      </div>
    </div>
  );
};

export default App;