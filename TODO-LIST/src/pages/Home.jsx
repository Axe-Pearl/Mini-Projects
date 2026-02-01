import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Todo from "../components/Todo";

// Load todos from localStorage
const getTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const Home = () => {
  const [todos, setTodos] = useState(getTodos);
  const [todo, setTodo] = useState("");

  // Add todo
  const addTodo = (e) => {
    e.preventDefault();

    if (!todo.trim()) return;

    const isDuplicate = todos.some((t) => t.text === todo);
    if (isDuplicate) return;

    setTodos((prev) => [
      ...prev,
      { id: nanoid(), text: todo }
    ]);

    setTodo("");
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Move todo up
  const moveUp = (id) => {
    setTodos((prev) => {
      const copy = [...prev];
      const index = copy.findIndex((t) => t.id === id);

      if (index > 0) {
        [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      }

      return copy;
    });
  };

  // Move todo down
  const moveDown = (id) => {
    setTodos((prev) => {
      const copy = [...prev];
      const index = copy.findIndex((t) => t.id === id);

      if (index < copy.length - 1) {
        [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
      }

      return copy;
    });
  };

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="home">
      <div className="container">
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add item..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="btn-addTodo">
            Add
          </button>
        </form>

        {todos.length > 0 ? (
          <div className="todo-list">
            {todos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                index={index}
                total={todos.length}
                deleteTodo={deleteTodo}
                moveUp={moveUp}
                moveDown={moveDown}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
            No todo...
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
