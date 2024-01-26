import { For } from "solid-js/web";
import { createStore, produce } from "solid-js/store";

function App() {
  let input;
  let todoId = 0;
  const [todoItems, setTodoItems] = createStore([]);

  const addItem = (text) => {
    setTodoItems(
      produce((todoItems) => {
        todoItems.push({ id: ++todoId, text, completed: false });
      }),
    );
  };

  const toggleItem = (id) => {
    setTodoItems(
      (todo) => todo.id === id,
      produce((todo) => (todo.completed = !todo.completed)),
    );
  };

  return (
    <div class="flex h-screen flex-col items-center justify-center">
      <div>
        <input
          placeholder="To Do Item"
          ref={input}
          class="mr-1 h-10 rounded border-2 border-cyan-400"
        />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;

            addItem(input.value);
            input.value = "";
          }}
          class="h-10 rounded bg-cyan-400 p-2 text-white"
        >
          Add Todo
        </button>
      </div>

      <For each={todoItems}>
        {(todo) => (
          <div class="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onchange={[toggleItem, todo.id]}
              class="mr-1"
            />
            <span class={todo.completed && "line-through"}>{todo.text}</span>
          </div>
        )}
      </For>
    </div>
  );
}

export default App;
