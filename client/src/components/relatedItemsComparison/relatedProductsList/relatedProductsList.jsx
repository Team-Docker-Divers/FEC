import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { fetchRelated } from '../relatedSlice.js';


import RelatedProductCard from '../relatedProductCard/relatedProductCard.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap'
    // Promote the list into her own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: 'translateZ(0)'
  }
}));


const RelatedProductsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.app.productId);
  const relatedList = useSelector((state) => state.related.related);

  useEffect(() => {
    dispatch(fetchRelated(productId));
  }, [productId]);


  if (relatedList.length > 0) {
    return (
      <div data-testid="relatedProductsList" className={classes.root}>
        <GridList className={classes.gridList} >
          {relatedList.map((product) => {
            return (
              < RelatedProductCard key={product[0].id} productInfo={product[0]}/>
            );
          }
          )}
        </GridList>
      </div>
    );
  } else {
    return (
      <div data-testid="relatedProductsList">Loading</div>
    );
  }
};

export default RelatedProductsList;

