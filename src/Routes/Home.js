import React, { useEffect, useState } from "react";
import "./Home.css";
import Board from "../Components/Board/Board";
import Edit from "../Components/Editable/Edit";
import Navbar from "../Components/Navbar/Navbar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("Curr_user");
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem(user)) || []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to filter cards based on search query
  const filterCards = (query) => {
    const filteredResults = boards.filter((board) =>
      board.cards.some(
        (card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          (card.labels &&
            card.labels.some(
              (label) =>
                label.text.toLowerCase().includes(query.toLowerCase())
            ))
      )
    );
    setSearchResults(filteredResults);
  };


  useEffect(() => {
    filterCards(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const addCard = (title, boardId) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };
    const index = boards.findIndex((item) => item.id === boardId);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (cardId, boardId) => {
    const bInd = boards.findIndex((item) => item.id === boardId);
    if (bInd < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[bInd].cards;

    const cInd = cards.findIndex((item) => item.id === cardId);
    if (cInd < 0) return;

    cards.splice(cInd, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random() * 3,
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (boardId) => {
    const bInd = boards.findIndex((item) => item.id === boardId);
    if (bInd < 0) return;

    // const tempBoards = [...boards];
    // tempBoards.splice(bInd, 1);
    // setBoards(tempBoards);

    const tempBoards = boards.filter((item) => item.id !== boardId);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };

  const handleDragEnd = (cid, bid) => {
    let s_bInd, s_cInd, t_bInd, t_cInd;

    s_bInd = boards.findIndex((item) => item.id === bid);
    if (s_bInd < 0) return;

    s_cInd = boards[s_bInd].cards?.findIndex((item) => item.id === cid);
    if (s_cInd < 0) return;

    t_bInd = boards.findIndex((item) => item.id === target.bid);
    if (t_bInd < 0) return;

    t_cInd = boards[t_bInd].cards?.findIndex((item) => item.id === target.cid);
    if (t_cInd < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bInd].cards[s_cInd];

    tempBoards[s_bInd].cards?.splice(s_cInd, 1);

    tempBoards[t_bInd].cards?.splice(t_cInd, 0, tempCard);

    setBoards(tempBoards);
  };

  const updateCard = (cid, bid, card) => {
    const bInd = boards.findIndex((item) => item.id === bid);
    if (bInd < 0) return;

    const cInd = boards[bInd].cards.findIndex((item) => item.id === cid);
    if (cInd < 0) return;

    const tempBoards = [...boards];
    tempBoards[bInd].cards[cInd] = card;
    setBoards(tempBoards);
  };

  useEffect(() => {
    if (!user) {
      swal("Access Denied !!!", "Please Login to access board", "info");
      navigate("/login")
    } else {
      localStorage.setItem(user, JSON.stringify(boards));
    }
  }, [boards]);

  return (
    <>
      {!user ? ("") : (
        <div className="home container-fluid">
          <div className="home_navbar">
            <Navbar />
          </div>
          <div className="home_outer">
            <div className="row justify-content-center">
              <div className="col-md-12 mb-4">
              <div class="form-outline mt-2" data-mdb-input-init>
                    <input type="search" id="form1" class="form-control" placeholder="Search by title or label..." aria-label="Search" value={searchQuery}
                  onChange={handleSearchChange}/>
              </div>  
              </div>
              {(searchQuery.trim() === "" ? boards : searchResults).map(
                (item) => (
                  <div className="col-md-4 mb-4" key={item.id}>
                    <Board
                      board={item}
                      removeBoard={(id) => removeBoard(id)}
                      addCard={addCard}
                      removeCard={removeCard}
                      handleDragEnd={handleDragEnd}
                      handleDragEnter={handleDragEnter}
                      updateCard={updateCard}
                    />
                  </div>
                )
              )}
              <div className="col-md-4 mb-4">
                <div className="app_boards_board">
                  <Edit
                    displayClass="app_boards_board_add"
                    text="Add Board"
                    placeholder="Enter board title"
                    onSubmit={(value) => addBoard(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
