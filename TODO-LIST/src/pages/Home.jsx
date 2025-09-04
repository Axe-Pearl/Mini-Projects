import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Todo from "../components/Todo";

const getTodos = () => {
  let todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};

const Home = () => {
  const [todos, setTodos] = useState(getTodos());
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (title && todos.findIndex((t) => t.title === title) === -1) {
      setTodos((prev) => [
        ...prev,
        {
          id: nanoid(),
          title,
          desc,
          createdAt: new Date().toISOString(),
          completed: false,
        },
      ]);
      setTitle("");
      setDesc("");
    }
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id, newTitle, newDesc) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: newTitle, desc: newDesc } : t
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const moveUp = (id) => {
    let index = todos.findIndex((t) => t.id === id);
    if (index > 0) {
      let temp = todos[index];
      todos[index] = todos[index - 1];
      todos[index - 1] = temp;
      setTodos([...todos]);
    }
  };

  const moveDown = (id) => {
    let index = todos.findIndex((t) => t.id === id);
    if (index < todos.length - 1) {
      let temp = todos[index];
      todos[index] = todos[index + 1];
      todos[index + 1] = temp;
      setTodos([...todos]);
    }
  };

  // Filtering
  const filteredTodos = todos.filter((t) => {
    if (!t.createdAt) return true;
    const now = new Date();
    const created = new Date(t.createdAt);

    if (filter === "today") {
      return created.toDateString() === now.toDateString();
    }
    if (filter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return created >= oneWeekAgo;
    }
    if (filter === "custom" && customDate) {
      return created.toDateString() === new Date(customDate).toDateString();
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="home">
      <div className="container">
        {/* Add Todo */}
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Task Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button type="submit" className="btn-addTodo">
            Add Task
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "today" ? "active" : ""}
            onClick={() => setFilter("today")}
          >
            Today
          </button>
          <button
            className={filter === "week" ? "active" : ""}
            onClick={() => setFilter("week")}
          >
            This Week
          </button>
          <button
            className={filter === "custom" ? "active" : ""}
            onClick={() => setFilter("custom")}
          >
            Custom Date
          </button>
          {filter === "custom" && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          )}
        </div>

        {/* Todo List */}
        {filteredTodos.length ? (
          <div className="todo-list">
            {filteredTodos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
                moveUp={moveUp}
                moveDown={moveDown}
                total={filteredTodos.length}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="no-tasks">No tasks...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
