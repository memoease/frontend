import "../css/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./layout/Navigation";

import About from "./About/About";
import Contact from "./Contact/Contact";
import HomePage from "./HomePage/HomePage";
import Login from "./Login_/Login";
import Register from "./Register/Register";

import Error from "./Error/Error";
import { Box } from "./createSet/createSet";
import HomeLoggedIn from "./homeLoggedIn/HomeLoggedIn";
import EditSet from "./Edit-set/EditSet";
import DashBoard_login from "./Dashborad_Loggend_in/DashBoard_login";

import FlipCardExample from "./FlipCards/FlipCards";
import PrivateRoute from "../utilities/service/PrivateRoute";
import { LearnModus } from "./LearnModus/LearnModus";
import Setting from "./Setting/Setting";
import { AuthProvider } from "../utilities/hooks/useAuth.jsx";
import { CardProvider } from "../utilities/hooks/useCards.jsx";
import Imprint from "./Imprint/Imprint";
import PublicLearnSession from "./PublicLearnSession/PublicLearnSession";
import ReadSet from "./ReadSet/ReadSet";
import GroupCreation from "./CreateGroup/CreateGroup";

function App() {
  return (
    <>
      <AuthProvider>
        <CardProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Navigation />}>
                <Route path="/:groupId?/:setId?" element={<HomePage />} />
                {/* <Route path="/:groupId/:setId" element={<HomePage />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/imprint" element={<Imprint />} />
                <Route
                  path="/publicsession/:setId"
                  element={<PublicLearnSession />}
                />

                <Route element={<PrivateRoute />}>
                  <Route
                    path="/creategroup/:flashcardSetId"
                    element={<GroupCreation />}
                  />
                  <Route path="/create" element={<Box />} />
                  <Route path="/home" element={<HomeLoggedIn />} />
                  <Route path="/editset/:setId" element={<EditSet />} />
                  <Route path="/readset/:setId" element={<ReadSet />} />

                  <Route path="/flipcard" element={<FlipCardExample />} />
                  <Route path="/dashboard" element={<DashBoard_login />} />
                  <Route path="/session/:setId" element={<LearnModus />} />
                  <Route path="/setting/:userId" element={<Setting />} />
                </Route>
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </CardProvider>
      </AuthProvider>
    </>
  );
}

export default App;
