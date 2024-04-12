import React, { useState } from "react";
import { X } from "react-feather";
import "./Edit.css";

export default function Edit(props) {
    const [inputValue, setInputValue] = useState(props.default || "");
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit $${props.editClass ? props.editClass : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (props.onSubmit) props.onSubmit(inputValue);
            setShowEdit(false);
            setInputValue("");
          }}
        >
          <input
            autoFocus
            type="text"
            value= {inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            placeholder={props.placeholder || "Enter Item"}
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <X
              onClick={() => {
                setShowEdit(false);
              }}
            />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display  ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => {setShowEdit(true); }}
        >
          {props.text || "Add item"}
        </p>
      )}
    </div>
  );
}
