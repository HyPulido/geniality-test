import React, { useEffect, useState } from "react";
import * as GenialityService from "../../services/GenialityService";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AnswersGetDataModel } from "../../models/Answers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
interface AnswerProps {}

export const Answer: React.FC<AnswerProps> = ({}: AnswerProps) => {
  const { id } = useParams();
  const quiz_id = parseInt(id + "");

  const [answers, setAnswers] = useState<AnswersGetDataModel>();

  useEffect(() => {
    getAnswersByQuiz();
  }, []);

  const getAnswersByQuiz = async () => {
    const response = await GenialityService.getAnswersByQuiz(quiz_id);
    if (response.status == 200) {
      setAnswers(response.data);
    }
  };

  const calculateScore = (): number => {
    if (answers) {
      if (answers.answers.length === 0) return 0;

      const totalQuestions = answers.correct_answers + answers.wrong_answers;
      const score = (answers.correct_answers / totalQuestions) * 100;
      return score;
    }
    return 0;
  };

  const calculateCorrectAnswers = (): string => {
    if (answers) {
      if (answers.answers.length === 0) return "0";
      return `${answers.correct_answers} of ${
        answers.correct_answers + answers.wrong_answers
      }`;
    }
    return "0 of 0";
  };

  return (
    <Container className="w-50 p-2 bg-light h-100vh">
      <Row xs={1} md={12}>
        <Col className="text-start" xs={2}>
          <Link to="/quices" className="btn btn-light mb-5 mt-2">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back
          </Link>
        </Col>
        <Col className="text-start" xs={8}>
          <h1
            className={`mb-5 text-center ${
              calculateScore() > 50 ? "text-success" : "text-danger"
            }`}
          >
            Answers for Quiz # {quiz_id}
          </h1>
        </Col>
      </Row>

      <Container>
        <Row xs={1} md={12}>
          <Col className="text-start" xs={6}>
            <h5>Final score</h5>
            <p>{calculateScore() + "%"}</p>
          </Col>
          <Col className="text-end" xs={6}>
            <h5>Correct answer</h5>
            <p>{calculateCorrectAnswers()}</p>
          </Col>
        </Row>
      </Container>
      {answers?.answers.map((answer, index) => {
        return (
          <Container
            key={index}
            className={`p-3 rounded my-2 shadow cursor-pointer border border-3 border-${
              answer.points == 1
                ? "success bg-success-light"
                : "danger bg-danger-light"
            }`}
          >
            <Row xs={1} md={12}>
              <Col className="text-start" xs={10}>
                {answer.question}
              </Col>
              <Col className="text-end" xs={2}>
                <h3>{answer.points}</h3>
              </Col>
            </Row>
          </Container>
        );
      })}
    </Container>
  );
};
