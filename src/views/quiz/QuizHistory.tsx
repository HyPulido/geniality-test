import React, { useEffect, useState } from "react";
import * as GenialityService from "../../services/GenialityService";
import { Col, Container, Row } from "react-bootstrap";
import { Quices } from "../../models/Quices";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../../utilities/BaseApp";
import { ToastContainer } from "react-toastify";
interface QuizHistoryProps {}

export const QuizHistory: React.FC<
  QuizHistoryProps
> = ({}: QuizHistoryProps) => {
  const [quices, setQuices] = useState<Quices[]>([]);

  useEffect(() => {
    getQuicesByUser();
  }, []);

  const getQuicesByUser = async () => {
    const user_id = parseInt(localStorage.getItem("user_id") + "");
    const response = await GenialityService.getQuicesByUser(user_id);
    if (response.status == 200) {
      setQuices(response.data);
    }else{
      showToast("quiz history is empty", "top-center", 2000, "info");
      setQuices([]);
    }
  };

  const deleteQuiz = async (quiz_id: number) => {
    const user_id = parseInt(localStorage.getItem("user_id") + "");
    const response = await GenialityService.deleteUserQuiz(quiz_id, user_id);
    if (response.status == 200) {
      showToast("Quiz delete successfully", "top-center", 2000, "success");
    }
    getQuicesByUser();
  };

  return (
    <Container className="w-25 p-2 bg-light h-100vh text-center">
      <ToastContainer />
      <Row xs={1} md={12}>
        <Col className="text-start" xs={4}>
          <Link to="/quiz" className="btn btn-light mb-5 mt-1">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back
          </Link>
        </Col>
        <Col className="text-start" xs={4}>
          <h4 className="text-center mb-5 p-1">History</h4>
        </Col>
      </Row>

      {quices.map((quiz, index) => {
        return (
          <Row
            key={index}
            xs={1}
            md={12}
            className="p-1 border border-success rounded my-2 shadow m-1"
          >
            <Col className="text-start p-0" xs={2}>
              <FontAwesomeIcon
                icon={faTrash}
                className="m-2 text-danger cursor-pointer"
                title="Delete quiz of my history"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuiz(quiz.id);
                }}
              />
            </Col>
            <Col xs={10} className="p-0">
              <Link
                key={index}
                to={"/quiz/" + quiz.id + "/answers"}
                className="text-decoration-none text-dark cursor-pointer"
              >
                <Row xs={1} md={12}>
                  <Col className="text-start" xs={7}>
                    <h5 className="mt-1 mb-0">{quiz.name + " #" + quiz.id}</h5>
                  </Col>
                  <Col xs={5}>
                    <h6 className="mt-2">{quiz.created_at.substring(0, 10)}</h6>
                  </Col>
                </Row>
              </Link>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
