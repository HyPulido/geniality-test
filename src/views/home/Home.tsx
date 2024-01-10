import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}: HomeProps) => {
  return (
    <Container className="w-25 p-4 bg-light h-100vh d-flex flex-column justify-content-between text-center">
      <h3 className="text-center">
        Welcome to the <br /> Trivia Challenge!
      </h3>

      <h4 className="text-center">
        You will be presented <br /> with 10 True or False questions
      </h4>
      <h4 className="text-center">Can you score 100%?</h4>
      <Link to={"/login"}>
        <Button type="submit" className="w-100">
          BEGIN
        </Button>
      </Link>
    </Container>
  );
};
