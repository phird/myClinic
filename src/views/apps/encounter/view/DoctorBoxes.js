import React, { useState, useEffect, useCallback } from "react";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useDispatch, useSelector } from "react-redux";
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

//* Imports Store
import { getSymptoms, getDiseaseSymptom } from "../store";

const MOCKDISEASE = {
  Diabetes: [{ name: 'ผิวแห้ง' }, { name: 'เป็นแผลแล้วหายยาก' }, { name: 'ชาบริเวณปลายมือปลายเท้า' }],
  Pressure: [],
  Muscle: [{ name: 'มีอาการตึง' }],
  Beriberi: [{ name: 'อ่อนเพลีย' }, { name: 'เหนื่อยง่าย' }, { name: 'เบื่ออาหาร' }, { name: 'ท้องผูก' }, { name: 'ท้องอืดเฟ้อ' }, { name: 'รู้สึกชา' }],
}

const DoctorBoxs = (props) => {
  // ** Dispatch 
  const dispatch = useDispatch();
  const [notes, setNotes] = useState('');
  const [noteRetrive, setNoteRetrive] = useState('');
  const [disease, setDisease] = useState('');
  const [symptoms, setSymptoms] = useState([]); //* Retrive Things
  const [inputSymptoms, setInputSymptoms] = useState([]);
  const store = useSelector(state => state.encounters)
  const enID = props.selectedEncounter.encounterID
  const enStatus = props.selectedEncounter.eStatus
  const suggestDisease = props.suggestDisease
  const arraySymp = store.symptoms


  useEffect(() => {
    dispatch(getSymptoms(enID));
  }, [enID, dispatch]);

  useEffect(() => {
    setSymptoms(arraySymp);
    setNoteRetrive(props.selectedEncounter.Tnote)
  }, [arraySymp, arraySymp, props]);

  useEffect(() => {
    props.onSymptomChange(inputSymptoms);
    props.onNoteAdded(notes);
  }, [inputSymptoms, notes])


  const handleSubmit = (e) => {  //* for add symtoms
    e.preventDefault();
    const newSymptom = e.target.elements.symptom.value;
    if (inputSymptoms.length === 0) {
      setInputSymptoms([{ name: newSymptom }]);
    } else {
      setInputSymptoms((prevSymptoms) => [
        ...prevSymptoms,
        { name: newSymptom }
      ]);
    }
    /* props.onSymptomChange(symptoms); */
    e.target.reset();
  };



  const handleDelete = (index) => {
    setInputSymptoms((prevSymptoms) =>
      prevSymptoms.filter((symptom, i) => i !== index)
    );
  };

  const handleNoteChange = (event) => {
    event.preventDefault();
    const newNote = event.target.value;
    setNotes(newNote);
  };

  const handleDiseaseClick = async (id) => {
    const data = await dispatch(getDiseaseSymptom(id))
    setInputSymptoms(data.payload)

  };

  console.log("here are suggest disease")
  console.log(suggestDisease)

  if (enStatus == 1) {
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
                        {inputSymptoms.map((symptom, index) => (
                          <li className='mb-75' key={index}>
                            <Row className="align-items-center justify-content-between">
                              <Col xs="8" md="8" sm="10" style={{ textOverflow: "ellipsis", overflow: "hidden", }}>
                                <div className="d-flex align-items-center justify-content-start">
                                  <span style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>
                                    {symptom.name}
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

                            required
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
                  <div className=" mx-1 align-items-center justify-content-center">
                    {/* Here is list of Symptom Shows */}

                    {/*  Here is submit Button */}
                    <form>
                      <div className='d-flex form-floating align-items-center justify-content-center'>
                        <Input
                          id="doctorNote"
                          type="textarea"
                          name="note"
                          placeholder='เพิ่มโน้ต'
                          rows='5'
                          style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%", minHeight: "150px" }}
                          onChange={handleNoteChange}
                          value={notes}
                        />
                      </div>

                    </form>

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
                <div style={{ maxHeight: '200px', overflowY: 'scroll', width: '100%' }}>
                  <Row className="justify-content-between flex-nowrap">
                    {suggestDisease.map((disease, index) => (
                      <Col className="d-flex justify-content-between" key={index} sm="auto" style={{ minWidth: '150px', }}>
                        <Button.Ripple
                          color='success'
                          outline
                          onClick={() => handleDiseaseClick(disease.diseaseID)}
                          style={{ maxWidth: '150px', whiteSpace: 'nowrap' }}
                          block
                        >
                          {disease.name}
                        </Button.Ripple>
                      </Col>
                    ))}
                  </Row>

                </div>

              </CardBody>

            </div>

          </CardFooter>

        </Card >
      </div>
    );
  }
  else {
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
                                    {symptom.name}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </Card>
              </Col>

              <Col sm="6" className="align-items-center justify-content-center" style={{ display: 'inline-block', textOverflow: 'ellipsis', }} >
                <Card className="shadow" outline>
                  <CardHeader>
                    <CardTitle> บันทึก </CardTitle>
                  </CardHeader>

                  <div className=" mx-1 align-items-center justify-content-center">
                    {/* Here is list of Symptom Shows */}

                    {/*  Here is submit Button */}
                    <form>
                      <div className='d-flex form-floating align-items-center justify-content-center'>
                        <Input
                          type="textarea"
                          name="note"
                          placeholder='เพิ่มโน้ต'
                          rows='5'
                          style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%", minHeight: "150px" }}
                          value={noteRetrive}
                          disabled={true}
                        />
                      </div>
                    </form>
                  </div>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card >
      </div>
    );
  }

};


export default DoctorBoxs
