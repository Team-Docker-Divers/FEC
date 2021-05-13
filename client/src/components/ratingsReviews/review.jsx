//React
import React, { useState } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { markHelpful, markNonHelpful, reportReview } from './ratingsReviewsSlice.js';

//Components
import StarRating from '../starRating.jsx';

//Material UI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em'
  },
  modal: {
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Review = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const [photoOpen, openPhoto] = useState(false);
  const [helpfulness, addHelpfulness] = useState(review.helpfulness);
  const [nonHelpfulness, addNonHelpfulness] = useState(0);
  const [reviewReviewed, reviewReview] = useState(false);

  const helpfulReviews = useSelector((state) => state.reviews.markedHelpful);
  const nonHelpfulReviews = useSelector((state) => state.reviews.markedNotHelpful);
  const reportedReviews = useSelector((state) => state.reviews.reported);

  const classes = useStyles();
  const dispatch = useDispatch();

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  };

  let date = new Date(review.date);
  let dateFormat = new Intl.DateTimeFormat('en-us', dateOptions);
  let dateString = dateFormat.format(date);

  const handleOpen = () => {
    openPhoto(true);
  };

  const handleClose = () => {
    openPhoto(false);
  };

  const handleHelpfulClick = (e) => {
    dispatch(markHelpful(review.review_id));
    addHelpfulness(review.helpfulness + 1);
    reviewReview(true);
    e.target.removeAttribute("href");
  };

  const handleNotHelpfulClick = (e) => {
    dispatch(markNonHelpful(review.review_id));
    addNonHelpfulness(nonHelpfulness + 1);
    reviewReview(true);
    e.target.removeAttribute("href");
  };

  const handleReportClick = () => {
    dispatch(reportReview(review.review_id));
  };

  if (reportedReviews.indexOf(review.review_id) !== -1) {
    return <span/>;
  } else {
    return (
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={9}>
            <StarRating rating={review.rating}/>
          </Grid>
          <Grid item xs={3}>
            <div style={{ textAlign: 'right' }}>
              {review.reviewer_name} | {dateString}
            </div>
          </Grid>
        </Grid>

        <Grid container>
          {/*If the review body length > 250 characters & expanded = false*/}
          {review.body.length > 250 && expanded === false ?
            <Grid item xs={12}>
              <h3>{review.summary.slice(0, 51)}
                {review.summary.length > 50 ? ('...') : ('')}
              </h3>
              <p>{review.summary.slice(51)} {review.body.slice(0, 251)}</p>
              <a href="#RatingsReviews"
                onClick={() => setExpanded(true)}
              >Show more</a>
            </Grid> :
            <span/>
          }
          {/*If the review body length > 250 characters & expanded = true*/}
          {review.body.length > 250 && expanded === true ?
            <Grid item xs={12}>
              <h3>{review.summary.slice(0, 51)}
                {review.summary.length > 50 ? ('...') : ('')}
              </h3>
              <p>{review.summary.slice(51)} {review.body}</p>
            </Grid> :
            <span/>
          }
          {/*If the review body length <= 250 characters*/}
          {review.body.length <= 250 ?
            <Grid item xs={12}>
              <h3>{review.summary.slice(0, 51)}
                {review.summary.length > 50 ? ('...') : ('')}
              </h3>
              <p>{review.summary.slice(51)} {review.body}</p>
            </Grid> :
            <span/>
          }

          {/*If the review has photos */}
          {review.photos.length > 0 ?
            <Grid item xs={12}>
              <GridList cols={5}>
                {review.photos.map((photo, index) => {
                  return (
                    <GridListTile key={index} >
                      <img alt={`review photo ${index}`}src={photo.url} onClick={handleOpen}/>
                      <Modal
                        open={photoOpen}
                        onClose={handleClose}
                        BackdropComponent={Backdrop}
                        className={classes.modal}
                      >
                        <Container className={classes.modal}>
                          <img alt={`review photo ${index}`} src={photo.url}
                            style={{ maxHeight: '50%', maxWidth: '50%' }}/>
                        </Container>
                      </Modal>
                    </GridListTile>
                  );
                })}
              </GridList>
            </Grid> :
            <span/>
          }

          {/*If the review is recommended */}
          {review.recommend === true ?
            <Grid item xs={12} container alignItems="center" justify="flex-start">
              <Grid item>
                <CheckCircleOutlineIcon/>
              </Grid>
              <Grid item>
                <h4>I recommend this product</h4>
              </Grid>
            </Grid> :
            <span/>}

          {/*If the review has a response */}
          {review.response && review.response !== 'null' ?
            <Grid item xs={12} container>
              <div style= {{ backgroundColor: '#D3D3D3' }}>
                <div><b>Response from seller:</b></div>
                <div>{review.response}</div>
              </div>
            </Grid> :
            <span/>
          }

          {reviewReviewed === false ?
            <Grid item xs={12}>
              Was this review helpful? &nbsp;
              <a href="#RatingsReviews"
                onClick={(e) => {
                  if (helpfulReviews.indexOf(review.review_id) === -1 &&
                  nonHelpfulReviews.indexOf(review.review_id) === -1) {
                    handleHelpfulClick(e);
                  }
                }}>Yes</a> ({review.helpfulness}) | &nbsp;
              <a href="#RatingsReviews"
                onClick={(e) => {
                  if (helpfulReviews.indexOf(review.review_id) === -1 &&
                  nonHelpfulReviews.indexOf(review.review_id) === -1) {
                    handleNotHelpfulClick(e);
                  }
                }}>No</a> ({nonHelpfulness}) | &nbsp;
              <a href="#RatingsReviews"
                onClick={() => {
                  handleReportClick();
                }}
              >Report</a>
            </Grid> :
            <Grid item xs={12}>
              Was this review helpful? &nbsp;
              <a>Yes</a> ({helpfulness}) | &nbsp;
              <a>No</a> ({nonHelpfulness}) | &nbsp;
              <a
                onClick={() => {
                  handleReportClick();
                }}
              >Report</a>
            </Grid>
          }
        </Grid>
      </Paper>
    );
  }
};

export default Review;
