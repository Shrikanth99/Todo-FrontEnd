import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { deleteTask, updateTask } from "../helpers/taskSlice";
import "./todo.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.task);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleUpdate = (id) => {
    dispatch(updateTask(id));
  };

  return (
    <div>
      <Container className="listing_main_container">
        <ul style={{ listStyleType: "none" }}>
          {taskList.map((ele) => (
            <li key={ele._id}>
              <span
                style={{
                  textDecoration: ele.isCompleted ? "line-through" : "none",
                  opacity: ele.isCompleted ? 0.5 : 1,
                }}
              >
                <h3 className="listing_title">{ele.name}</h3>
              </span>

              <p
                style={{
                  textDecoration: ele.isCompleted ? "line-through" : "none",
                  opacity: ele.isCompleted ? 0.5 : 1,
                }}
                className="listing_description"
              >
                {ele.description}
              </p>
              <button
                onClick={() => handleDelete(ele._id)}
                className="listing_buttons delete"
                >
                Delete
              </button>
              {!ele.isCompleted && (
                <button onClick={() => handleUpdate(ele._id)} className="listing_buttons complete">Complete</button>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default TodoList;
