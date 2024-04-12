import React, { useState } from "react";
import "./Card.css";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Chips from "../Chips/Chips";
import Dropdown from "../Dropdow/Dropdown";
import CardInfo from "./CardInfo/CardInfo";

export default function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <CardInfo
          card={props.card}
          onClose={() => setShowModal(false)}
          updateCard={props.updateCard}
          boardId={props.boardId}
        />)
      }

      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onClick={(e)=> setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item, ind) => {
              return <Chips key={ind} text={item.text} color={item.color} />;
            })}
          </div>
          <div
            className="card_top_title_more" 
            onClick={(e) => {

              e.stopPropagation();
              setShowDropdown(true)
            }
            }
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props.card?.id, props.boardId)
                    }
                  >
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">
          <p>{props.card?.title}</p>
        </div>
        <div className="card_footer">
          {props.card?.date && (
            <p>
              <Clock />
              {props.card?.date}
            </p>
          )}
          {props.card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {props.card?.tasks?.filter((item) => item.completed).length}/
              {props.card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
