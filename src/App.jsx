import React, {useState} from "react";

function App() {
  const [input, setInput] = useState("");
  
  return (
    <div>
      <div>Enter some text</div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <h3>Your Text</h3>
      <p>{input}</p>
    </div>
  );
}
//second commit
//third commit
//fourth commit

export default App;
