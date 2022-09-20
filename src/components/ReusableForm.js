import React from "react";

const ReusableForm = () => {
  return(
    <React.Fragment>
    <h1>Reusable Form</h1>
    <ReusableForm />
    </React.Fragment>
  )
}

export default ReusableForm;