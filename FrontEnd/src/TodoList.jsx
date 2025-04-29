import React, { useEffect, useState } from "react";
import { Todos } from "./Todos";
import { toast } from "react-toastify";

export const TodoList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);

  const apiURL = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() !== "" && description.trim() !== "") {
      await fetch(apiURL + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }).then((res) => {
        if (res.ok) {
          setTodos([...todos, { title, description }]);
          setTitle("");
          setDescription("");
          toast.success("Todos Added Successfully");
        } else {
          toast.error("Unable to Create Todos");
        }
      });
    } else {
      toast.warning("Enter the Required Filed");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL + "/todos");
        const data = await response.json();

        setList(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [todos]);

  return (
    <div className="m-8 text-center">
      <div className="my-8">
        <h3 className="text-3xl font-medium">Add Items:</h3>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-2.5 justify-center"
        >
          <input
            className=" w-50 p-1.5 bg-gray-100 rounded-sm"
            type="text"
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className=" w-50 p-1.5 bg-gray-100 rounded-sm"
            type="text"
            value={description}
            placeholder="decription"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="p-2 bg-gray-600 text-white rounded-md cursor-pointer	 ">
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center text-left gap-3 flex-wrap ">
        {list.map((li) => (
          <li className="flex" key={li._id}>
            <Todos li={li} todos={todos} setTodos={setTodos} list={list} />
          </li>
        ))}
      </div>
    </div>
  );
};
