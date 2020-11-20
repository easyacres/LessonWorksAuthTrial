import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
// import LessonMainSeed from "../../../scripts/seedDB"; NO IMPORT OUTSIDE OF src

function LessonsMain() {
  //      ^^ Chg to File Name 

  // Setting our component's initial state
  const [lessonsmain, setLessonsMain] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadLessonsMain()
  }, [])

  // Loads all books and sets them to books
  function loadLessonsMain() {
    API.getLessonsMain()
      .then(res => 
        setLessonsMain(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteLessonFromMain(id) {
    API.deleteLessonFromMain(id)
      .then(res => loadLessonsMain())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
    //                  method     
  };

  // When the form is submitted, use the API.saveLessontoMain method to save the Lesson data
  // Then reload Lessons from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveLessontoMain({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadLessonsMain())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create your own lesson</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Lesson
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Lessons On My List</h1>
            </Jumbotron>
            {lessonsmain.length ? (
              <List>
                {lessonsmain.map(lessonsmain => (
                  <ListItem key={lessonsmain._id}>
                    <Link to={"/lessonmain/" + lessonsmain._id}>
                      <strong>
                        {lessonsmain.title} by {lessonsmain.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteLessonFromMain(lessonsmain._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
              //  Terniary Opeator for Rendering Result
            )}
          </Col>
        </Row>
        <Row>
          <Jumbotron>
            <h1>Search for Lessons</h1>
            <h3>(Lessons that I didnt create)</h3>
          </Jumbotron>
        </Row>
      </Container>
    );
  }

export default LessonsMain;
  //            ^^ Chg to File Name 
