import Overview from './overview/overview.jsx';
import RatingsReviews from './ratingsReviews/ratingsReviews.jsx';
import QuestionsAnswers from './questionsAnswers/questionsAnswers.jsx';
import RelatedItemsComparison from './relatedItemsComparison/relatedItemsComparison.jsx';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';


var App = () => {
  //declaring a new state variable, called stateVariable, and corresponding set function
  const [stateVariable, setStateVariable] = useState('initial value');

  //Use Effect is similiar to component did mount
  useEffect(() => {
    document.title = `Let's OverReact!`;
  });


  return (
    <div>
      <CssBaseline />
      <Overview state={stateVariable}/>
      <RatingsReviews setState={setStateVariable}/>
      <QuestionsAnswers setState={setStateVariable}/>
      <RelatedItemsComparison />
    </div>
  );
};

export default App;
