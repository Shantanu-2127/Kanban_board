import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import "./CardInfo.css";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import Edit from "../../Editable/Edit";
import Chips from "../../Chips/Chips";

function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [activeColor, setActiveColor] = useState("");
  const [values, setValues] =useState({...props.card});

  const calculatePercent = ()=>{
    if (!values.tasks?.length) return '0';
    const completed = values.tasks?.filter(item =>item.completed)?.length;
    return (completed/(values.tasks?.length))*100 + ""
  }

  const addLabel=(value, color)=>{
    const index= values.labels?.findIndex((item) => item.text === value)
    if(index > -1) return;
    const label ={
        text: value,
        color
    }

    setValues({...values, labels: [...values.labels, label]})
    setActiveColor("");
  }


  const removeLabel =(text)=>{
    const tempLabels = values.labels?.filter(item=> item.text!==text)

    setValues({...values, labels: tempLabels});
  }

  const addTask =(value)=>{
    const task = {
        id: Date.now() + Math.random(),
        text: value,
        completed: false
    }

    setValues((values)=>({
        ...values,
        tasks: [...values.tasks, task]
    }));
    console.log("task added");
  }

  const removeTask =(id)=>{
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  }

  const updateTask =(id, completed)=>{
    const index=  values.tasks?.findIndex((item)=> item.id === id)
    if(index<0) return;

    const tempTasks = [...values.tasks]
    tempTasks[index].completed =completed;
    setValues((values)=>({
        ...values,
        tasks: tempTasks
    }));
  }

  useEffect(()=>{
    props.updateCard(props.card.id, props.boardId, values)
  },[values])




  return (
    <div>
      <Modal onClose={() => props.onClose()}>
        <div className="cardinfo">
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Type />
              Title
            </div>
            <div className="cardinfo_box_body">
              <Edit
                text={values.title}
                default={values.title}
                placeholder="Enter Title"
                buttonText="Set Title"
                onSubmit = {(value)=> setValues({...values, title: value})}
              />
            </div>
          </div>
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List />
              Description
            </div>
            <div className="cardinfo_box_body">
              <Edit
                text={values.desc}
                default={values.desc}
                placeholder="Enter Description"
                buttonText="Set Description"
                onSubmit={(value)=> setValues({...values, desc: value})}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Calendar />
              Date
            </div>
            <div className="cardinfo_box_body">
              <input
                type="date"
                defaultvalues={
                  values.date ? new Date(values.date).toISOString().substr(0, 10) : ""
                }
                onChange={(e)=> setValues({...values, date: e.target.value})}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Tag />
              Labels
            </div>
            <div className="cardinfo_box_labels">
              {values.labels?.map((item, index) => (
                <Chips
                  close
                  onClose={() => removeLabel(item.text)}
                  key={item.text + index}
                  color={item.color}
                  text={item.text}
                />
              ))}
            </div>
            <div className="cardinfo_box_colors">
              {colors.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className={item === activeColor ? "active" : ""}
                  onClick={() => setActiveColor(item)}
                />
              ))}
            </div>
            <div className="cardinfo_box_body">
              <Edit
                text="Add Label"
                placeholder="Enter Lable"
                buttonText="Add Label"
                onSubmit ={(value)=> addLabel(value, activeColor)}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <CheckSquare />
              Tasks
            </div>
            <div className="cardinfo_box_progress-bar">
              <div className={`cardinfo_box_progress ${calculatePercent() === "100"? "cardinfo_box_progress-active":""}`} style={{ width: calculatePercent()+ "%" }} />
            </div>
            <div className={`cardinfo_box_list`}>
              {values.tasks?.map((item) => (
                <div key={item.id} className="cardinfo_task">
                  <input type="checkbox" defaultChecked={item.completed}
                    onChange={(e)=> updateTask(item.id, e.target.checked)} />
                  <p className={item.completed?"text-with-line": ""}>{item.text}</p>
                  <Trash onClick={()=>removeTask(item.id)} />
                </div>
              ))}
            </div>
            <div className="cardinfo_box_body">
              <Edit
                text={"Add new task"}
                placeholder="Enter Task"
                buttonText="Add Task"
                onSubmit={(value) => addTask(value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardInfo;
