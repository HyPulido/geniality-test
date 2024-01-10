import React, { useEffect, useState } from "react";
import * as GenialityService from "../../services/GenialityService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Questions } from "../../models/Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface QuestionProps {}

export const Question: React.FC<QuestionProps> = ({}: QuestionProps) => {
  const { id } = useParams();
  const quiz_id = parseInt(id + "");

  const [questions, setQuestions] = useState<Questions[]>([]);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    getQuestionsByQuiz();
    existsQuizForUser();
  }, []);

  const getQuestionsByQuiz = async () => {
    const response = await GenialityService.getQuestionsByQuiz(quiz_id);
    if (response.status == 200) {
      setQuestions(response.data);
    }
  };

  const existsQuizForUser = async () => {
    const user_id = parseInt(localStorage.getItem("user_id") + "");

    const response = await GenialityService.existsQuizForUser(quiz_id, user_id);
    if (response.status == 200) {
      setExists(response.data.exists);
    }
  };

  const [formData, setFormData] = useState<{
    email: string;
    quiz_id: number;
    answers: { questions_id: number; answer: boolean }[];
  }>({
    email: localStorage.getItem("email") || "",
    quiz_id: quiz_id,
    answers: [],
  });

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const updatedAnswers = formData.answers.map((answer) => {
      if (answer.questions_id === questionId) {
        return {
          ...answer,
          answer: event.target.value === "1", // Assuming the value is "1" for True and "0" for False
        };
      }
      return answer;
    });

    // If the answer for this question doesn't exist yet, add it to the answers array
    if (!updatedAnswers.find((answer) => answer.questions_id === questionId)) {
      updatedAnswers.push({
        questions_id: questionId,
        answer: event.target.value === "1", // Assuming the value is "1" for True and "0" for False
      });
    }

    setFormData({
      ...formData,
      answers: updatedAnswers,
    });
  };

  const handleSubmit = async () => {
    var response = null;
    if (exists) {
      response = await GenialityService.processUpdateAnswers(formData);
    } else {
      response = await GenialityService.processAnswers(formData);
    }
    window.location.href = "/quiz/" + quiz_id + "/answers";
  };

  useEffect(() => {
    var email = localStorage.getItem("email");
    if (email) {
      formData.email = email;
      formData.quiz_id = quiz_id;
    }
  }, []);

  return (
    <Container className="w-50 p-2 bg-light h-100vh text-center">
      <Row xs={1} md={12}>
        <Col className="text-start" xs={2}>
          <Link to="/quiz" className="btn btn-light mb-5 mt-2">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back
          </Link>
        </Col>
        <Col className="text-start" xs={8}>
          <h1 className="mb-5">Questions for Quiz # {quiz_id}</h1>
        </Col>
      </Row>

      {questions.map((question, index) => {
        return (
          <div
            key={index}
            className="p-2 rounded my-2 shadow cursor-pointer border border-primary"
          >
            <p>{question.question}</p>
            <div className=" w-25 d-flex justify-content-between text-center m-auto">
              <Form.Check
                inline
                label="True"
                name={"group-" + question.id}
                type="radio"
                value={1}
                onChange={(e) => handleAnswerChange(e, question.id)}
              />
              <Form.Check
                inline
                label="False"
                name={"group-" + question.id}
                type="radio"
                value={0}
                onChange={(e) => handleAnswerChange(e, question.id)}
              />
            </div>
          </div>
        );
      })}
      <Button
        type="submit"
        className="mb-5 mt-3"
        onClick={handleSubmit}
        disabled={formData.answers.length !== 10}
      >
        Submit Questionaire
      </Button>
    </Container>
  );
};