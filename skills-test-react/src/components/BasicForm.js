import React from "react";
import { Formik, Field, Form } from "formik";
import { Box, Button, Stack, TextField } from "@mui/material";

const BasicForm = ({ handleAddTodo }) => {
  return (
    <div>
      <h1>TODO</h1>
      <Formik
        initialValues={{
          todo: "",
        }}
        onSubmit={({ todo }) => {
          handleAddTodo(todo);
        }}
      >
        <Form>
          <Stack direction="row" spacing={2}>
            <Field id="todo" name="todo">
              {({ field, meta }) => (
                <TextField
                  label="Add Todo"
                  size="small"
                  {...field}
                  error={!!meta.touched && !!meta.error}
                  helperText={meta.error}
                />
              )}
            </Field>
            <Box>
              <Button variant="contained" size="medium" type="submit">
                Submit
              </Button>
            </Box>
          </Stack>
        </Form>
      </Formik>
    </div>
  );
};

export default BasicForm;
