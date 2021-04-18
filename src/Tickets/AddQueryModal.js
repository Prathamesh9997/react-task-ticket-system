import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function AddQueryModal(props) {
  const [newQuery, setNewQuery] = useState({
    option: "",
  });

  const addData = (event) => {
    let type = event.target.name;
    let newVal = event.target.value;
    let newOpt = newVal.charAt(0).toUpperCase() + newVal.slice(1);
    console.log(newOpt);
    setNewQuery((prevValue) => {
      return {
        ...prevValue,
        [type]: newOpt,
      };
    });
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Query Type</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Query Type</label>
              <div className="col-sm-10">
                <input
                  name="option"
                  className="form-control"
                  id="option"
                  value={newQuery.option}
                  onChange={addData}
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.saveData(newQuery);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddQueryModal;
