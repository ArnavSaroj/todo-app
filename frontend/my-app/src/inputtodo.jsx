import React,{ useState} from "react";

function InputTodo() {

  const [addvalue, changevalue] = useState("");
 
  async function submithandler(f) {
    f.preventDefault();
    try {
      const body = { description: addvalue };
      const response = await fetch("http://localhost:5000/puttodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      window.location = "/";
    } catch (err) {
      console.error("Error submitting response:", err);
    }
  }

  return (
    <div className="flex flex-col items-center  ">
      <h1 className="text-center text-4xl font-bold text-red-500 mb-3">TASK HAWK</h1>
      <div className="custom-box  bg-gray-800 p-6 rounded-lg shadow-lg ">
        <form className="flex flex-col" onSubmit={submithandler} method="POST">
          <label htmlFor="description" className="text-gray-400 mb-2 font-serif">
            Enter your task:
          </label>
          <input
            type="text"
            value={addvalue}
            onChange={(e)=>{changevalue(e.target.value)}}
            id="description"
            name="description"
            placeholder="SO WHATS YOUR TASK IN MIND FOR TODAY??"
            required
            className="p-3 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 "
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-200 cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputTodo;