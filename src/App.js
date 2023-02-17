import React, { useState, useEffect } from "react";

function App() {
  const [nodeContent, setNodeContent] = useState([]);

  useEffect(() => {
    fetch("https://api.met.no/weatherapi/metalerts/1.1?show=all")
      .then((resp) => resp.text())
      .then((result) => {
        let xmlData = new window.DOMParser().parseFromString(result, "text/xml");

        let titleArray = xmlData.getElementsByTagName("item");

        let nodes = [];
        let elem = titleArray[0];
        elem.childNodes.forEach((node) => {
          nodes.push(node.textContent);
        });
        setNodeContent(nodes);
      });
  }, []);

  return (
    <div>
      {nodeContent.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </div>
  );
}

export default App
