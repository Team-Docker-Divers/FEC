//React
import React, { useEffect } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';

//Material UI
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

//Components
import StarRating from '../../starRating.jsx';
import { fetchReviewMetadata, fetchReviewsRelevant } from '../../appSlice.js';

const ProductInformation = (props) => {
  const dispatch = useDispatch();

  const productInfo = useSelector((state) => state.app.productInfo);
  const productId = useSelector((state) => state.app.productId);
  const currentStyle = useSelector((state) => state.overview.currentStyle);
  const rating = useSelector((state) => state.app.rating);
  const numOfReviews = useSelector((state) => state.app.reviews.length);

  console.log(currentStyle);
  useEffect(() => {
    dispatch(fetchReviewMetadata(productId));
    dispatch(fetchReviewsRelevant(productId));
  }, [productId]);

  return (
    <div data-testid="product-info">
      <Grid container spacing={3} direction="column">
        {numOfReviews === 0 ?
          <Box
            component={Grid}
            item
            container
            alignItems="center"
            data-testid="star-rating-section"
            display="none"
          /> :
          <Box
            component={Grid}
            item
            container
            alignItems="center"
            data-testid="star-rating-section"
          >
            <Grid item data-testid="star-rating">
              <StarRating rating={rating}/>
            </Grid>
            <Grid item>
              &nbsp; <a data-testid="reviews-link" href="#RatingsReviews">Read all {numOfReviews} reviews</a>
            </Grid>
          </Box>
        }

        <Grid item>
          <span
            data-testid="product-category"
            style={{ fontSize: 14, lineHeight: 100 + '%' }}
          > <b>CATEGORY ></b> {productInfo.category} <br/>
          </span>
          <span
            data-testid="product-name"
            style={{ fontSize: 40, lineHeight: 75 + '%' }}
          > {productInfo.name}
          </span>
        </Grid>
        <Grid item data-testid="price">
          {(currentStyle) && !currentStyle.sale_price.includes('null') ?
            <div>
              <span style ={{ color: 'red' }}>
                <b>SALE </b> ${currentStyle.sale_price} &nbsp;
              </span>
              <span style={{ textDecoration: "line-through" }}>
               ${productInfo.default_price}
              </span>
            </div> :
            <span> ${productInfo.default_price}</span>
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductInformation;
