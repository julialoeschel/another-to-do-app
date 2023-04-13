import styled from "styled-components";

type toDoProps = {
  todo: { id: string; name: FormDataEntryValue };
  onDelete: (id: string) => void;
};

export default function ToDoEntry({ todo, onDelete }: toDoProps) {
  return (
    <li>
      <Entry>
        {todo.name as string}
        {onDelete ? (
          <button
            onClick={() => {
              onDelete(todo.id);
            }}
          >
            x
          </button>
        ) : null}
      </Entry>
    </li>
  );
}

const Entry = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;

  button {
    height: 3rem;
    width: 3rem;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 1.5rem;

    :hover {
      background-color: green;
    }
  }
`;
