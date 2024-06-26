import React, { useState } from "react";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Edit from "../Editable/Edit";
import Dropdown from "../Dropdow/Dropdown";

export default function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title}
          <span>{` ${props.board?.cards?.length}`}</span>
        </p>
        <div
          className="board_top_title_more"
          onClick={() => {
            setShowDropdown(true);
          }}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className="board_dropdown">
                <p onClick={()=> props.removeBoard(props.board?.id)}>Delete Board</p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card 
            key={item.id} 
            card={item} 
            removeCard ={props.removeCard} 
            boardId = {props.board?.id}
            handleDragEnd = {props.handleDragEnd}
            handleDragEnter = {props.handleDragEnter}
            updateCard = {props.updateCard}
          />
        ))}

        <Edit
          displayClass="board_card_add"
          text="+ Add Card"
          placeholder="Enter Card Title"
          onSubmit = {(value) =>{props.addCard(value, props.board?.id)}}
        />
      </div>
    </div>
  );
}
