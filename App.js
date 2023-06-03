import React from "react";
import ReactDOM from "react-dom/client";

const heading = (
    <h1 className="head">Hello World!</h1>
);

const HeadingComponent = () => { // This is return method
    return <h1>This is return functional component</h1>
};

const title = (
    <h1>hello this is normal variable</h1>
);

const HeadingComponentWithoutReturn = () => ( // This is return method
    <h1>This is without return functional component</h1>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
const root1 = ReactDOM.createRoot(document.getElementById("root1"));
root.render(<HeadingComponentWithoutReturn />);
root1.render(title);
