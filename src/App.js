import React from "react";
// import Button from "@mui/material/Button";
import MainContent from "./Components/MainContent";
import { Container } from "@mui/material";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
// style={{ display: "flex", justifyContent: "center", width: "100vw" }}
