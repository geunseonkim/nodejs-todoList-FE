import React from "react";
import TodoItem from "./TodoItem"

const TodoBoard = ({todoList, checkTask, deleteTask}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {/* {todoList.length >= 0 ? <TodoItem/> : <h2>There is no Item to show</h2>} */}
      {todoList.length >= 0 ? todoList.map((data, idx) => <TodoItem key={idx} data={data} checkTask={checkTask} deleteTask={deleteTask}/>) : <h2>There is no Item to show</h2>}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
