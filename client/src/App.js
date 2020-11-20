import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LessonsMain from "./pages/LessonsMain";
// modif^^                 ^^^
import LessonOnly from "./pages/LessonOnly";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/lessonmain"]}>
            <LessonsMain />
          </Route>
          <Route exact path="/lessonmain/:id">
            <LessonOnly />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
