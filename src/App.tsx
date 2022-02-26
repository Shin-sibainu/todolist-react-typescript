import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  //todo配列オブジェクトの更新用に用意。プロパティはinputValue, id, checkedの３つを更新する。
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number; //keyを指定するため
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }

    //新しいTodo作成
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    console.log(inputText);
    setInputText(inputText);
  };

  //todo編集
  const handleEdit = (id: number, inputValue: string) => {
    /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
    const deepCopy = todos.map((todo) => ({ ...todo }));
    console.log(deepCopy);

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    // /* シャローコピー */
    // const newTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.inputValue = inputValue;
    //   }
    //   return todo;
    // });

    setTodos(newTodos);
  };

  //完了未完了
  const handleChecked = (id: number, checked: boolean) => {
    /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
    const deepCopy = todos.map((todo) => ({ ...todo }));
    // console.log(deepCopy);

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        //反転
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //削除
  const handleDelete = (id: number) => {
    //idが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        {/* タスク設定が完了したら */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
