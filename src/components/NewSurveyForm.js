import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

const NewSurveyForm = () => {
  return (
    <React.Fragment>
      <h1>New Survey</h1>
      <ReusableForm />
    </React.Fragment>
  ); 
}

export default NewSurveyForm;