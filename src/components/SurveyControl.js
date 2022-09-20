import React, { useState, useEffect } from 'react';
import EditSurveyForm from './EditSurveyForm';
import SurveyDetail from './SurveyDetail';
import NewSurveyForm from './NewSurveyForm';
import SurveyList from './SurveyList';

import { db, auth } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const SurveyControl = () => {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainSurveyList, setMainSurveyList] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "surveys"), 
      (collectionSnapshot) => {
        const surveys = collectionSnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          };
        });
        setMainSurveyList(surveys);
      }, 
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedSurvey != null) {
      setFormVisibleOnPage(false);
      setSelectedSurvey(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewSurveyToList = async (newSurveyData) => {
    await addDoc(collection(db, "surveys"), newSurveyData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedSurvey = (id) => {
    const selection = mainSurveyList.filter(survey => survey.id === id)[0];
    setSelectedSurvey(selection);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingSurveyInList = async (surveyToEdit) => {
    await updateDoc(doc(db, "surveys", surveyToEdit.id), surveyToEdit);
    setEditing(false);
    setSelectedSurvey(null);
  }

  const handleDeletingSurvey = async (id) => {
    await deleteDoc(doc(db, "surveys", id));
    setSelectedSurvey(null);
  } 

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null; 

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {      
      currentlyVisibleState = <EditSurveyForm survey = {selectedSurvey} onEditSurvey = {handleEditingSurveyInList} />
      buttonText = "Return to Survey List";
    } else if (selectedSurvey != null) {
      currentlyVisibleState = <SurveyDetail 
      survey={selectedSurvey} 
      onClickingDelete={handleDeletingSurvey}
      onClickingEdit = {handleEditClick} />
      buttonText = "Return to Survey List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewSurveyForm onNewSurveyCreation={handleAddingNewSurveyToList}/>;
      buttonText = "Return to Survey List"; 
    } else {
      currentlyVisibleState = <SurveyList onSurveySelection={handleChangingSelectedSurvey} surveyList={mainSurveyList} />;
      buttonText = "Add Survey"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>} 
      </React.Fragment>
    );
  }
}


export default SurveyControl;