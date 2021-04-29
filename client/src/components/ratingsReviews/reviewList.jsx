import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import ReviewSortSearch from './reviewSortSearch.jsx';
import Review from './review.jsx';
import ReviewActions from './reviewActions.jsx';

const ReviewList = (props) => {
  const reviews = useSelector((state) => state.app.reviews);
  const numReviewsToShow = useSelector((state) => state.reviews.reviewsCount);
  const ratingsToShow = useSelector((state) => state.reviews.filter);
  let shownReviews = [...reviews].slice(0, numReviewsToShow + 1);

  return (
    <Grid container spacing={1} >
      <Grid item xs={12}>
        <ReviewSortSearch />
      </Grid>
      <Grid container spacing={1}
        style={{
          maxHeight: '75vh',
          boxSizing: 'border-box',
          padding: '1em',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
        {shownReviews.map((review, index) => {
          return (
            <Box
              item
              component={Grid}
              xs={12}
              key={index}
              index={index}
              style={index > numReviewsToShow - 1 ||
                (ratingsToShow.indexOf(review.rating) === -1 && ratingsToShow.length > 0) ?
                { display: 'none' } : {}}
            >
              <Review review={review}/>
            </Box>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <ReviewActions />
      </Grid>
    </Grid>
  );
};

export default ReviewList;
