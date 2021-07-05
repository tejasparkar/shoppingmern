import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <>
      <Spinner animation="border" role="status" style={{width :'100px', height: '100px', margin: 'auto' , display:'block', marginTop:'25%'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default Loader;
