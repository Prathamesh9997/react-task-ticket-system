import React, { useState, useEffect, useContext } from "react";
import "./CreateTicket.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import TicketContext from "../TicketContext";
import AddQueryModal from "./AddQueryModal";
import { Button } from "react-bootstrap";

const CreateTicket = () => {
  let url = "https://6065c6c1b8fbbd00175675a3.mockapi.io/queries";
  let typeUrl = "https://6065c6c1b8fbbd00175675a3.mockapi.io/query-type";
  const history = useHistory();
  let { value1, value2 } = useContext(TicketContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [queryData, setQueryData] = value2;
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    qtype: "",
    status: "Active",
  });

  const getTypeData = async () => {
    const response = await fetch(typeUrl);
    const data = await response.json();
    setQueryData(data);
  };

  const handleShow = () => setShowAddModal(true);
  const handleClose = () => setShowAddModal(false);

  const saveData = async (newObj) => {
    setShowAddModal(false);
    if (newObj.option !== "") {
      const resp = await fetch(typeUrl, {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await resp.json();
    }
    getTypeData();
  };

  const handleChange = (e) => {
    let type = e.target.name;
    let newVal = e.target.value;
    setTicketData((prevVal) => {
      return {
        ...prevVal,
        [type]: newVal,
      };
    });
  };

  const handleSubmit = async () => {
    console.log(ticketData);
    if (ticketData.title !== "" && ticketData.description !== "") {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await resp.json();
    }

    history.push("/tickets");
  };
  return (
    <div className="create-ticket">
      <h2 className="create-ticket-heading">
        <strong>Create Ticket</strong>
      </h2>
      <div className="create-ticket-form">
        <div className="form-group">
          <label htmlFor="qtype">Query Type</label>

          <select
            className="form-control"
            id="qtype"
            name="qtype"
            onChange={handleChange}
          >
            <option>Select type</option>
            {queryData.map((type) => {
              return (
                <option key={type.id} value={type.option}>
                  {type.option}
                </option>
              );
            })}
          </select>
          <button
            className="add-query-type btn btn-sm btn-dark m-2"
            onClick={handleShow}
          >
            add +
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={ticketData.title}
            onChange={handleChange}
            className="form-control"
            id="title"
            placeholder="Enter Title"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            className="form-control"
            id="desc"
            value={ticketData.description}
            name="description"
            onChange={handleChange}
            rows="4"
            placeholder="Put your description here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="create-btn btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <AddQueryModal
        show={showAddModal}
        handleClose={handleClose}
        saveData={saveData}
      />
    </div>
  );
};

export default CreateTicket;
