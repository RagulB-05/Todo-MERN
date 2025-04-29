import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Todos = ({ li, list, todos, setTodos }) => {
  const [editID, setEditID] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { title, description, _id } = li;
  const apiURL = "http://localhost:3000";

  const handleEdit = () => {
    setEditID(_id);
    setEditTitle(title);
    setEditDescription(description);
  };

  const handleCancel = () => {
    setEditID(null);
  };

  const handleUpdate = async () => {
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      await fetch(apiURL + "/todos/" + editID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      }).then((res) => {
        if (res.ok) {
          list.map((listItem) => {
            if (listItem._id === editID) {
              (listItem.title = editTitle),
                (listItem.description = editDescription);
            }
          });

          toast.success("Todos Updated Successfully");
        } else {
          toast.error("Unable to Update Todos");
        }
        setEditID(null);
      });
    } else {
      toast.warning("Enter the Required Filed");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure want to delete the Todo?")) {
      const updatedTodos = await fetch(apiURL + "/todos/" + _id, {
        method: "DELETE",
      });
      setTodos([...todos, updatedTodos]);
    }
    toast.success("Deleted Successfully");
  };

  return (
    <div>
      <div className="mt-10  bg-blue-200 p-5 rounded-sm min-w-90">
        <h3 className="mb-5 px-2 rounded-2xl text-center  bg-white font-medium  ">
          Tasks:
        </h3>

        <ul>
          <li className="flex justify-between gap-2 mt-2">
            {editID ? (
              <div className="flex flex-col gap-2">
                <input
                  className=" w-50 p-1.5 bg-gray-100 rounded-sm"
                  type="text"
                  value={editTitle}
                  placeholder="title"
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className=" w-50 p-1.5 bg-gray-100 rounded-sm"
                  type="text"
                  value={editDescription}
                  placeholder="decription"
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="font-medium">Title: {title}</span>
                  <span>{description}</span>
                </div>
              </>
            )}

            <div className="flex ml-5 gap-3 ">
              {editID ? (
                <>
                  <button
                    onClick={() => handleUpdate()}
                    className=" px-3 py-1 bg-gray-600 text-white rounded-sm cursor-pointer"
                  >
                    update
                  </button>
                  <button
                    onClick={handleCancel}
                    className=" px-3 py-1 bg-rose-500 text-white rounded-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit()}
                    className=" px-3 py-1 bg-gray-600 text-white rounded-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className=" px-3 py-1 bg-rose-500 text-white rounded-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
