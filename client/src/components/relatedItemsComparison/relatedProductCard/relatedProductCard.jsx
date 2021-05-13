/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import StickyHeadTable from '../comparisonModal/comparisonModal.jsx';
import { changeProductId } from '../../appSlice.js';
import StarRating from '../../starRating.jsx';

//Tracking
import { countProductCardClick, countCompareClick } from '../../appSlice.js';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  },
  modal: {
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));


const RealtedProductCard = ({ productInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalOpen, openModal] = useState(false);

  const handleOpen = () => {
    openModal(true);
  };
  const handleClose = () => {
    openModal(false);
  };

  return (
    <div >
      <GridListTile style={{
        position: 'relative',
        minWidth: '20px',
        maxWidth: '700px',
        minHeight: '20px',
        maxHeight: '450px'
      }}>
        <img
          alt={`${productInfo.name}`}
          data-testid="relatedProductImage"
          src={productInfo.photo}
          style={{
            position: 'top',
            width: '100% !important',
            maxHeight: '400px',
            maxWidth: '664px',
            overflow: 'hidden',
            height: '100%'
          }}
          onClick={() => {
            dispatch(changeProductId(productInfo.id));
            dispatch(countProductCardClick());
          }}/>
        <GridListTileBar
          title={productInfo.name}
          subtitle={<div data-testid="relatedProductCard">
            <span>{`$${productInfo.default_price}`}</span>
            <StarRating rating={productInfo.ratings}/></div>}
          actionIcon={
            <IconButton aria-label="view product details" onClick={() => {
              handleOpen();
              dispatch(countCompareClick());
            }}>
              <StarBorderIcon className={classes.icon}/>
            </IconButton>
          }
          className={classes.titleBar}
        />
      </GridListTile>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        className={classes.modal}
      >
        <Container className={classes.modal}>
          < StickyHeadTable productInfo={productInfo}/>
        </Container>
      </Modal>
    </div>
  );
};

export default RealtedProductCard;
