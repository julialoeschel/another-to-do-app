type toDoProps = {
  todo: { id: string; name: FormDataEntryValue };
  onDelete?: (id: string) => void;
};

export default function ToDoEntry({ todo, onDelete }: toDoProps) {
  return (
    <li>
      <p>
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
      </p>
    </li>
  );
}
