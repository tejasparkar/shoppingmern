import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  return (
    <>
      <Alert
        show={show}
        variant={variant}
        onClick={() => setShow(false)}
      >
        {children}
      </Alert>
    </>
  );
};

export default Message;
