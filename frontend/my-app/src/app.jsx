import React, { Fragment } from "react";
import Date_now from "./header";
import Input_todo from "./inputtodo";
import List_todos from "./listtodos";

function App() {
  return (
    <Fragment>
      <div>
        <Date_now />
        <Input_todo />
        <List_todos/>
      </div>
    </Fragment>
  );
}

export default App;
