/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core/';

import Question from './Question.jsx';
import { fetchQuestions } from './qaSlice.js';

const Questions = props => {
  const productId = useSelector((state) => state.app.productId);
  const dispatch = useDispatch();

  const currentQuestions = useSelector((state) => state.qa.data);

  const answers = currentQuestions.map(question => {
    return Object.values(question.answers);
  });

  const Qcount = useSelector((state) => state.qa.Qcount);

  useEffect(() => {
    dispatch(fetchQuestions(productId));
  }, [productId]);

  return (
    <div>
      <Grid>
        {currentQuestions.filter(question =>
          question.question_body.toLowerCase().includes(props.searchValue.toLowerCase())
        )
          .map((question, index) => {
            if (Qcount === 4) {
              while (index < Qcount) {
                return (
                  <Question
                    key={`${question.question_id}`}
                    index={index}
                    question={question}
                    answers={answers}
                  />
                );
              }
            } else {
              while (index < Qcount) {
                return (
                  <Question
                    key={`${question.question_id}`}
                    index={index}
                    question={question}
                    answers={answers}
                  />
                );
              }
            }
          })}
      </Grid>
    </div>
  );
};

export default Questions;
