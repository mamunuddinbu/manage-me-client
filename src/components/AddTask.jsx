import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { key } from "localforage";
import News from "./News";
import HorizontalLine from "./HorizontalLine";
import HorizontalTimeLine from "./HorizontalLine";
import TimeLine from "./HorizontalLine";

const AddTask = () => {
  const { register, handleSubmit } = useForm();
  const [activeTab, setActiveTab] = useState("extra");

  const [data, setData] = useState([]);
  const [routineData, setRoutineData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  //////////////////Select Country////////////////////
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/extra-task")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);

  useEffect(() => {
    fetch("http://localhost:5000/routine-task")
      .then((res) => res.json())
      .then((data) => setRoutineData(data));
  }, [routineData]);

  //--------------------------------
  const onSubmitExtraTask = (data) => {
    axios
      .post("http://localhost:5000/extra-task", data)
      .then((response) => {
        console.log("Extra task added successfully:", response.data);
        Swal.fire("Task added successfully");
        // setData((prevData) => [...prevData, response.data]); // Update the UI by adding the new task to the existing data
      })
      .catch((error) => {
        console.error("Failed to add extra task:", error);
        Swal.fire("Failed to add task");
      });
  };

  const onSubmitRoutineTask = (data) => {
    axios
      .post("http://localhost:5000/routine-task", data)
      .then((response) => {
        console.log("Routine task added successfully:", response.data);
        Swal.fire("Task added successfully");

        // setRoutineData((prevData) => [...prevData, response.data]); // Update the UI by adding the new task to the existing data
      })
      .catch((error) => {
        console.error("Failed to add routine task:", error);
        Swal.fire("Failed to add task");
      });
  };

  //--------------------------------

  return (
    <div>
      <div className="flex space-x-4">
        <button
          className={`py-2 px-4 rounded ${
            activeTab === "extra"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("extra")}
        >
          Add Extra Task
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeTab === "routine"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("routine")}
        >
          Add Routine Task
        </button>
      </div>
      {activeTab === "extra" ? (
        <form
          className="mt-4 flex gap-1"
          onSubmit={handleSubmit(onSubmitExtraTask)}
        >
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Title"
            {...register("title")}
          />

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Start Date"
            type="date"
            {...register("startDate")}
          />

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="End Date"
            type="date"
            {...register("endDate")}
          />

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Location"
            {...register("location")}
          />

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Imoprtance of task(Rating)"
            type="number"
            min="1"
            max="5"
            {...register("importance")}
          />

          <button
            className="py-2 px-4 bg-blue-500 text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <form
          className="mt-4 flex gap-1"
          onSubmit={handleSubmit(onSubmitRoutineTask)}
        >
          <input
            defaultValue={"title"}
            className="w-full border border-gray-300 rounded px-2 py-1"
            {...register("title")}
          />

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            type="time"
            {...register("startTime")}
          />

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            type="time"
            {...register("endTime")}
          />

          <select
            className="w-full border border-gray-300 rounded px-2 py-1"
            {...register("day")}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            type="number"
            min="1"
            max="5"
            {...register("importance")}
          />

          <button
            className="py-2 px-4 bg-blue-500 text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
      <div>
        <p>Number of data: {data.length}</p>

        <div className="flex bg-slate-400 p-3 overflow-x-auto">
          {data.map((singleData) => (
            <div key={singleData._id}>
              

              <div className="overflow-x-auto">
                <ul className="steps">
                  <li className="step">{singleData.title}</li>
                  <li className="step step-secondary">2</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* <HorizontalLine></HorizontalLine> */}
        <HorizontalTimeLine></HorizontalTimeLine>
        {/* <TimeLine></TimeLine> */}
      </div>

      <div>
        <p>Number of data: {routineData.length}</p>
        <div className="flex bg-slate-400 p-3">
          {routineData.map((singleRoutineData) => (
            <p className="bg-red-200 mx-2 " key={singleRoutineData._id}>
              {singleRoutineData.title}
            </p>
          ))}
        </div>
      </div>
      <News></News>
    </div>
  );
};

export default AddTask;
