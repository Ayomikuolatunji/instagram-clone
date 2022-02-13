import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContextApi from "./components/contextApi/ContextApi"

ReactDOM.render(
    <ContextApi>
        <App/>
    </ContextApi>,
    document.querySelector("#root")
)