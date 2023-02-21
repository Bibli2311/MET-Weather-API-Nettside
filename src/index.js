import React, {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Counter from "./Counter"

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Counter></Counter>
    <App />
    
    </StrictMode>
);