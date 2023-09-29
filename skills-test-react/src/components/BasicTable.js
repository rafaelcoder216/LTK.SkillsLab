import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BasicTable = ({ todoList, removeTodo }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Todo List</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todoList.map((todo, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{todo}</TableCell>
              <TableCell>
                <IconButton onClick={() => removeTodo(index)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BasicTable;
