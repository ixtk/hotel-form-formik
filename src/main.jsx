import React from "react";
import ReactDOM from "react-dom/client";
import WithHook from "./WithHook.jsx";
import WithComponents from "./WithComponents.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WithComponents />
  </React.StrictMode>,
);
