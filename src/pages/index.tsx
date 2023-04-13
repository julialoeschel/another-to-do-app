import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoEntry from "@/components/ToDoEntries";
import DeletedEntires from "@/components/DeletedEntries";
import styled from "styled-components";

export default function Home() {
  const [toDos, setTodos] = useState<
    { id: string; name: FormDataEntryValue }[]
  >([]);

  const [deletedTodos, setDeletedTodos] = useState<
    { id: string; name: FormDataEntryValue }[]
  >([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const newToDo: { id: string; name: FormDataEntryValue } = {
      id: uuidv4(),
      name: data.todo,
    };

    setTodos([...toDos, newToDo]);
    event.currentTarget.reset();
  }

  function handleDelete(id: string) {
    const updatedToDos = toDos.filter((todo) => todo.id !== id);
    setTodos(updatedToDos);
    const newDeletedTodo: { id: string; name: FormDataEntryValue } | undefined =
      toDos.find((todo) => todo.id === id);
    newDeletedTodo && setDeletedTodos([...deletedTodos, newDeletedTodo]);
  }

  function handleReactivate(id: string) {
    setTodos([
      ...toDos,
      deletedTodos.find((todo) => todo.id === id) as {
        id: string;
        name: FormDataEntryValue;
      },
    ]);
    setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <h1>ToDO</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="todo">your task: </label>
        <input type="text" name="todo" id="todo" autoComplete="off" />
        <button>add</button>
      </Form>
      <List>
        {toDos.map((todo) => {
          return (
            <ToDoEntry
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
            ></ToDoEntry>
          );
        })}
      </List>
      <Heading2>recently deleted</Heading2>
      <List>
        {deletedTodos.map((todo) => {
          return (
            <DeletedEntires
              key={todo.id}
              todo={todo}
              onReactivate={handleReactivate}
            ></DeletedEntires>
          );
        })}
      </List>
    </>
  );
}

const List = styled.ul`
  list-style: none;
  padding: 1rem;
  min-height: 12rem;
`;

const Heading2 = styled.h2`
  color: gray;

  font-weight: lighter;
`;

const Form = styled.form`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;
