import React, { useEffect, useState } from "react";
import * as GenialityService from "../../services/GenialityService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { LoginModel } from "../../models/Login";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}: LoginProps) => {
  const [validated, setValidated] = useState(false);
  const [login, setLogin] = useState<LoginModel | null>(null);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const response = await GenialityService.login(formData);
      setLogin(response);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (login) {
      if (login.status == 200) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("user_id", login.data.id + "");
        window.location.href = "/quiz";
      }
    }
  }, [login]);

  return (
    <Container className="w-25 p-4 bg-light my-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <h4 className="mb-4">Enter your email to get started.</h4>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={formData.email}
              placeholder="example@email.com"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};