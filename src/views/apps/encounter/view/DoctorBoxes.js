import React, { useState } from "react";
import "@styles/react/libs/tables/react-dataTable-component.scss";


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardHeader,
  Button,
  Input,
} from 'reactstrap'

//* Imports Icons
import { X } from 'react-feather'



const MOCKDISEASE = {
  Diabetes: ['ผิวแห้ง', 'เป็นแผลแล้วหายยาก', 'ชาบริเวณปลายมือปลายเท้า'],
  Pressure: [],
  Muscle: ['มีอาการตึง'],
  Beriberi: ['อ่อนเพลีย', 'เหนื่อยง่าย', 'เบื่ออาหาร', 'ท้องผูก', 'ท้องอืดเฟ้อ', 'รู้สึกชา'],
}

const DoctorBoxs = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState([]);
  const [disease, setDisease] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const newSymptom = e.target.elements.symptom.value;
    setSymptoms((prevSymptoms) => [
      ...prevSymptoms,
      newSymptom,
    ]);
    console.log("here is ")
    console.log(symptoms)
    e.target.reset();
  };

  const handleDelete = (index) => {
    setSymptoms((prevSymptoms) =>
      prevSymptoms.filter((symptom, i) => i !== index)
    );
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const newNote = event.target.elements.note.value;
    setNotes((prevNotes) => [
      ...prevNotes,
      newNote,
    ]);
    event.target.reset();
  };

  const handleNoteDelete = (index) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note, i) => i !== index)
    );
  };

  const handleDiseaseClick = (disease) => {
    setSymptoms(MOCKDISEASE[disease]);
  };

  return (
    <div className="shadow">
      <Card>
        <CardBody className="mx-2">
          <Row className="justify-content-between">
            <Col sm="6" className="align-items-center justify-content-center " style={{ display: 'inline-block', textOverflow: 'ellipsis' }} >
              <Card>
                <CardHeader>
                  <CardTitle> อาการ </CardTitle>
                </CardHeader>
                <div className="my-2 mx-1 align-items-center justify-content-center">
                  {/* Here is list of Symptom Shows */}
                  <div>
                    <ul className='list-unstyled align-items-center justify-content-between' >
                      {symptoms.map((symptom, index) => (
                        <li className='mb-75' key={index}>
                          <Row className="align-items-center justify-content-between">
                            <Col xs="8" md="8" sm="10" style={{ textOverflow: "ellipsis", overflow: "hidden", }}>
                              <div className="d-flex align-items-center justify-content-start">
                                <span style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>
                                  {symptom}
                                </span>
                              </div>
                            </Col>
                            <Col xs="auto" md="4">
                              <div className="d-flex align-items-center justify-content-end">
                                <Button.Ripple
                                  className='btn-icon rounded-circle'
                                  color='flat-danger'
                                  onClick={() => handleDelete(index)}
                                >
                                  <X size={16} />
                                </Button.Ripple>
                              </div>
                            </Col>
                          </Row>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="my-3">
                    {/*  Here is submit Button */}
                    <form onSubmit={handleSubmit}>
                      <div className='d-flex form-floating align-items-center justify-content-center'>
                        <Input
                          type='text'
                          name="symptom"
                          id='floatingInput'
                          placeholder='เพิ่มอาการ'
                          style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}
                        />
                        <label htmlFor='floatingInput' style={{ maxWidth: "90%" }} >เพิ่มอาการ</label>


                      </div>
                      <div>
                        <Button className="my-2" type="submit" color='relief-success' block>เพิ่ม</Button>
                      </div>
                    </form>
                  </div>
                </div>

              </Card>
            </Col>



            <Col sm="6" className="align-items-center justify-content-center" style={{ display: 'inline-block', textOverflow: 'ellipsis', }} >
              <Card className="shadow" outline>
                <CardHeader>
                  <CardTitle> บันทึก </CardTitle>
                </CardHeader>

                <div className="my-2 mx-1 align-items-center justify-content-center">
                  {/* Here is list of Symptom Shows */}
                  <div>
                    <ul className='list-unstyled align-items-center justify-content-between' >
                      {notes.map((note, index) => (
                        <li className='mb-75' key={index}>
                          <Row className="align-items-center justify-content-between">
                            <Col xs="8" md="8" sm="10" style={{ textOverflow: "ellipsis", overflow: "hidden", }}>
                              <div className="d-flex align-items-center justify-content-start">
                                <span style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>
                                  {note}
                                </span>
                              </div>
                            </Col>
                            <Col xs="auto" md="4">
                              <div className="d-flex align-items-center justify-content-end">
                                <Button.Ripple
                                  className='btn-icon rounded-circle'
                                  color='flat-danger'
                                  onClick={() => handleNoteDelete(index)}
                                >
                                  <X size={16} />
                                </Button.Ripple>
                              </div>
                            </Col>
                          </Row>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="my-3">
                    {/*  Here is submit Button */}
                    <form onSubmit={handleNoteSubmit}>
                      <div className='d-flex form-floating align-items-center justify-content-center'>
                        <Input
                          type='text'
                          name="note"
                          id='floatingInput'
                          placeholder='เพิ่มโน้ต'
                          style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}
                        />
                        <label htmlFor='floatingInput'>เพิ่มบันทึก</label>
                      </div>
                      <div>
                        <Button className="my-2" type="submit" color='relief-success' block>เพิ่ม</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            </Col>


          </Row>

        </CardBody>

        <CardFooter>
          <div>
            <CardTitle>
              💡 โรคที่พบบ่อย
            </CardTitle>
            <CardBody>
              <Row>
                <Col sm="auto">
                  <Button.Ripple
                    color='success'
                    outline
                    onClick={() => handleDiseaseClick("Diabetes")}
                    block
                  >
                    เบาหวาน
                  </Button.Ripple>
                </Col>
                <Col sm="auto">
                  <Button.Ripple
                    color='success'
                    outline
                    onClick={() => handleDiseaseClick("Pressure")}
                    block
                  >
                    ความดัน
                  </Button.Ripple>
                </Col>
                <Col sm="auto">
                  <Button.Ripple
                    color='success'
                    outline
                    onClick={() => handleDiseaseClick("Muscle")}
                    block
                  >
                    ปวดเมื่อยกล้ามเนื้อ
                  </Button.Ripple>
                </Col>
                <Col sm="auto">
                  <Button.Ripple
                    color='success'
                    outline
                    onClick={() => handleDiseaseClick("Beriberi")}
                    block
                  >
                    เหน็บชา
                  </Button.Ripple>
                </Col>
              </Row>
            </CardBody>

          </div>

        </CardFooter>

      </Card >

    </div>

  );
};

export default DoctorBoxs
