import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoEntry from "@/components/ToDoEntries";

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

  return (
    <>
      <h1>ToDO</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo"></label>
        <input type="text" name="todo" id="todo" autoComplete="off" />
        <button>add</button>
      </form>
      <ul>
        {toDos.map((todo) => {
          return (
            <ToDoEntry
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
            ></ToDoEntry>
          );
        })}
      </ul>
      <h2>recently deleted</h2>
      <ul>
        {deletedTodos.map((todo) => {
          return <ToDoEntry key={todo.id} todo={todo}></ToDoEntry>;
        })}
      </ul>
    </>
  );
}
