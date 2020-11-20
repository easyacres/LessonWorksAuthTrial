import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function LessonOnly(props) {
  const [lessononly, setLessonOnly] = useState({})

  // When this component mounts, grab the Lesson with the _id of props.match.params.id
  // e.g. localhost:3000/lessonsmain/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getLessonOnly(id)
      .then(res => setLessonOnly(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {lessononly.title} by {lessononly.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {lessononly.synopsis}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to your Profile</Link>
          </Col>
        </Row>
      </Container>
    );
  }


export default LessonOnly;
