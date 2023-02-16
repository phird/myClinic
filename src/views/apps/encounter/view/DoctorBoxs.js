import React, { useState } from "react";
import "@styles/react/libs/tables/react-dataTable-component.scss";
// ** Reactstrap Imports
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  Container,
} from 'reactstrap'

const DoctorBoxs = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSymptom = e.target.elements.symptom.value;
    setSymptoms((prevSymptoms) => [
      ...prevSymptoms,
      { text: newSymptom, completed: false },
    ]);
    e.target.reset();
  };

  const handleCheckbox = (index) => {
    setSymptoms((prevSymptoms) =>
      prevSymptoms.map((symptom, i) =>
        i === index ? { ...symptom, completed: !symptom.completed } : symptom
      )
    );
  };

  const handleDelete = (index) => {
    setSymptoms((prevSymptoms) =>
      prevSymptoms.filter((symptom, i) => i !== index)
    );
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const newNote = event.target.elements.note.value;
    setNotes((prevNotes) => [...prevNotes, newNote]);
    event.target.reset();
  };

  const handleNoteDelete = (index) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note, i) => i !== index)
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-start align-items-center" >
          <div className="d-flex justify-content-end align-items-center">
            
            <form onSubmit={handleSubmit}>
              <input type="text" name="symptom" placeholder="Add symptom" />
              <button type="submit">Add</button>
            </form>
            <ul>
              {symptoms.map((symptom, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={symptom.completed}
                    onChange={() => handleCheckbox(index)}
                  />
                  <span
                    style={{
                      textDecoration: symptom.completed ? "line-through" : "none",
                    }}
                  >
                    {symptom.text}
                  </span>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>

        </Col>

        <Col className="d-flex justify-content-end align-items-center" >
          <div className="d-flex justify-content-end align-items-center">
            
            <form onSubmit={handleNoteSubmit}>
              <input type="text" name="note" placeholder="Add note" />
              <button type="submit">Add</button>
            </form>
            <ul>
              {notes.map((note, index) => (
                <li key={index}>
                  {note}
                  <button onClick={() => handleNoteDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>


  );
}

export default DoctorBoxs
