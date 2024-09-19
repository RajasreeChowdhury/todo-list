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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg py-6 px-12 w-full text-white text-center font-bold text-3xl">
       Todo List
      </header>
      <main className="max-w-4xl w-full mt-10">
        <TodoForm addTodo={addTodo} />
        <div className="my-6 flex justify-center space-x-4">
          <button
            onClick={() => setFilter('All')}
            className={`py-2 px-6 rounded-lg ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} transition-all`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Completed')}
            className={`py-2 px-6 rounded-lg ${filter === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} transition-all`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('Incomplete')}
            className={`py-2 px-6 rounded-lg ${filter === 'Incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} transition-all`}
          >
            Incomplete
          </button>
          <button
            onClick={() => setFilter('High')}
            className={`py-2 px-6 rounded-lg ${filter === 'High' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} transition-all`}
          >
            High
          </button>
          <button
            onClick={() => setFilter('Medium')}
            className={`py-2 px-6 rounded-lg ${filter === 'Medium' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} transition-all`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('Low')}
            className={`py-2 px-6 rounded-lg ${filter === 'Low' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} transition-all`}
          >
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
      </main>
    </div>
  );
};

export default App;