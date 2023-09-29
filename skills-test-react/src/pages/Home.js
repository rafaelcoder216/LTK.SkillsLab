import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountMenu from "../AccountMenu";
import BasicForm from "../components/BasicForm";
import BasicTable from "../components/BasicTable";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, selectTodoList } from "../store/todoSlice";

const Home = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const todoList = useSelector(selectTodoList);
  const dispatch = useDispatch();

  const handleOnClick = (page) => {
    if (!openForm) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  };

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleRemvoeTodo = (todoIndex) => {
    dispatch(removeTodo(todoIndex));
  };

  return (
    <Container maxWidth="sm">
      <AccountMenu onClick={handleOnClick} />
      {openForm && <BasicForm handleAddTodo={handleAddTodo} />}
      {!!todoList && !!todoList.length && (
        <BasicTable todoList={todoList} removeTodo={handleRemvoeTodo} />
      )}
    </Container>
  );
};

export default Home;
