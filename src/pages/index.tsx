import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [toDos, setTodos] = useState<
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
  console.log(toDos);

  return (
    <>
      <h1>ToDO</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo"></label>
        <input type="text" name="todo" id="todo" />
        <button>add</button>
      </form>
      <ul></ul>
    </>
  );
}
