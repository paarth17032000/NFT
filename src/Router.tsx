import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Router = () => {
  let user = localStorage.getItem("user") || null;
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/my-templates" element={<MyTemplates />} />
          <Route path="/preview" element={<Preview />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;