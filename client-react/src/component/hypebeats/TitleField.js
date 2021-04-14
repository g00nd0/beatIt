import { useState, useEffect } from "react";
import axios from "axios";

// props = props.title, props.handleTitleChange

const TitleField = (props) => {
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(props.title); //default is untitled

  const handleEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    // initial name
    setTextValue(props.title);
  }, [props.title]);

  const handleKeyDown = (event) => {
    //press Enter => Axios
    if (event.code === "Enter") {
      console.log("pressed enter for name change");
      props.handleTitleChange(textValue);
      setEditing(false);
    }
  };

  const handleBlur = (event) => {
    // blur => Axios
    props.handleTitleChange(textValue);
    setEditing(false);
  };

  const titleblock = () => {
    if (editing === true) {
      //click edit button
      return (
        <>
          Title:{" "}
          <input
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            onBlur={(event) => handleBlur(event)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </>
      );
    } else {
      return (
        <>
          Title: <span>{textValue} </span>
        </>
      );
    }
  };

  return (
    <span>
      {titleblock()}
      <button onClick={handleEditClick}>Edit</button>
    </span>
  );
};

export default TitleField;
