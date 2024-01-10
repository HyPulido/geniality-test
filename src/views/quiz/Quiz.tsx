import React, { useEffect, useState } from "react";
import * as GenialityService from "../../services/GenialityService";
import { Col, Container, Row } from "react-bootstrap";
import { Quices } from "../../models/Quices";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../../utilities/BaseApp";
import { ToastContainer } from "react-toastify";

interface QuizProps {}

export const Quiz: React.FC<QuizProps> = ({}: QuizProps) => {
  const [quices, setQuices] = useState<Quices[]>([]);

  useEffect(() => {
    getQuices();
  }, []);

  const getQuices = async () => {
    const response = await GenialityService.getQuices();
    if (response.status == 200) {
      setQuices(response.data);
    }
  };

  const createQuiz = async () => {
    const response = await GenialityService.createQuiz();
    if (response.status == 200) {
      window.location.href = "/quiz/"+response.data.id+"/questions";
    }
  };

  return (
    <Container className="w-25 p-2 bg-light h-100vh text-center">
      <Row xs={1} md={12}>
        <Col className="text-start" xs={4}>
          <Link to="/" className="btn btn-light mb-0 mt-1">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back
          </Link>
        </Col>
        <Col className="text-start" xs={4}>
          <Link to={"/quices"} className="text-decoration-none text-dark ">
            <div className="border border-success rounded mb-3 mt-2 shadow cursor-pointer">
              <h6 className="text-center mb-0 p-1">Show my history</h6>
            </div>
          </Link>
        </Col>
      </Row>
      <div className="p-2 bg-success rounded mb-3 mt-2 shadow text-light cursor-pointer">
        <h4 className="text-center" onClick={createQuiz}>
          Create new quiz
        </h4>
      </div>
      Or
      {quices.map((quiz, index) => {
        return (
          <Link
            key={index}
            to={quiz.id + "/questions"}
            className="text-decoration-none text-dark "
          >
            <div className="d-flex justify-content-between p-2 border border-success rounded my-2 shadow cursor-pointer">
              <h5>{quiz.name + " #" + quiz.id}</h5>
              <h6>{quiz.created_at.substring(0, 10)}</h6>
            </div>
          </Link>
        );
      })}
    </Container>
  );
};