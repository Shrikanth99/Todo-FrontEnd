import React from "react";
import { Container, Grid } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../helpers/taskSlice";
import './todo.css'

const TodoForm = () => {
  const dipatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [formErrors, setFormErros] = useState({});

  const errors = {};

  const serverErr = useSelector((state) => state.tasks.serverErr);

  const runValidatons = () => {
    if (name.length === 0) {
      errors.name = "Name is required";
    }
    if (description.length === 0) {
      errors.description = "description should not be empty";
    }
  };

  // function errMsg(){
  //         serverErr.map((ele) => {
  //             toast.error(ele.msg,{
  //                 position : 'top-right'
  //             })
  //         })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    runValidatons();

    if (Object.keys(errors).length === 0) {
      const fData = { name, description, isCompleted };

      dipatch(addTask(fData));
      setName("");
      setDescription("");
    } else {
      setFormErros(errors);
      if(errors.name){
        toast.error(errors.name, {position:'top-right'});
      }
      if(errors.description) {
          toast.error(errors.description,{position:'top-right'});
      }
    }
  };

  return (
    <Container className="form_main_component"
    >
      <form>
        <Grid container className="form_Grid_container">
          <Grid item className="form_field_container">
            <div>
              <div>name</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form_input_fields"
              />
            </div>
            <div>
              <div> Description </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form_input_fields"
              ></textarea>
            </div>
          </Grid>
          <Grid item>
            <button onClick={handleSubmit} className="button">Add</button>
          </Grid>
        </Grid>
      </form>
      <Toaster />
    </Container>
  );
};

export default TodoForm;
