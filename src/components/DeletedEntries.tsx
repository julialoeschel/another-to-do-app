import styled from "styled-components";

type toDoProps = {
  todo: { id: string; name: FormDataEntryValue };
  onReactivate: (id: string) => void;
};

export default function DeletedEntires({ todo, onReactivate }: toDoProps) {
  return (
    <li>
      <ToDo onClick={() => onReactivate(todo.id)}>{todo.name as string}</ToDo>
    </li>
  );
}

const ToDo = styled.p`
  text-decoration: line-through;
  color: gray;
  padding: 0.4rem;
`;
