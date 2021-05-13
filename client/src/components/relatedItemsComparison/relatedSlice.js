import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

const generateRelatedItemsPromise = function (productId) {
  return axios.get(`http://ec2-54-241-138-72.us-west-1.compute.amazonaws.com:5000/products/${productId}`);
};

const generateRelatedStylePromise = function (productId) {
  return axios.get(`http://ec2-54-241-138-72.us-west-1.compute.amazonaws.com:5000/products/${productId}/styles`);
};

const generateRelatedReviewMetaDataPromise = function (productId) {
  return axios.get(`/api/?endpoint=reviews/meta?product_id=${productId}`);
};

const calcAvgRating = (objectOfRatings) => {
  let numOfReviews = Object.values(objectOfRatings).reduce(function (accumulator, currentValue) {
    return accumulator + parseInt(currentValue, 10);
  }, 0);

  let total = 0;
  for (let key in objectOfRatings) {
    total += parseInt(key, 10) * parseInt(objectOfRatings[key], 10);
  }

  let avg = total / numOfReviews;
  return avg;
};

export const fetchRelated = createAsyncThunk(
  'products/getRelated',
  async (productId, thunkAPI) => {
    let itemInfo;
    await axios.get(`http://ec2-54-241-138-72.us-west-1.compute.amazonaws.com:5000/products/${productId}/related`)
      .then(function (response) {
        return response.data[0].related;
      })
      .then((arrayOfRelatedIds) => {
        let promiseArray = [];
        arrayOfRelatedIds.map((itemId, index) => {
          promiseArray[index] = (generateRelatedItemsPromise(itemId));
        });
        return promiseArray;
      })
      .then((promiseArray) => {
        return (Promise.all(promiseArray));
      })
      .then((resolvedPromises) => {
        itemInfo = [];
        resolvedPromises.map((item, index) => {
          itemInfo[index] = item.data;
        });
        return itemInfo;
      })
      .then((itemInfoArray) => {
        let promiseArray = [];
        itemInfoArray.map((item, index) => {
          promiseArray[index] = (generateRelatedStylePromise(item[0].id));
        });
        return promiseArray;
      })
      .then((promiseArray) => {
        return (Promise.all(promiseArray));
      })
      .then((resolvedStylePromises) => {
        resolvedStylePromises.map((item, index) => {
          if (item.data[0].results[0].photos[0].thumbnail_url) {
            itemInfo[index][0].photo = item.data[0].results[0].photos[0].url;
          } else {
            itemInfo[index][0].photo = "/assets/imgPlaceholder.jpeg";
          }
        });
        return (itemInfo);
      })
      .then((itemInfoArray) => {
        let promiseArray = [];
        itemInfoArray.map((item, index) => {
          promiseArray[index] = (generateRelatedReviewMetaDataPromise(item[0].id));
        });
        return promiseArray;
      })
      .then((promiseArray) => {
        return (Promise.all(promiseArray));
      })
      .then((resolvedRatingPromises) => {
        resolvedRatingPromises.map((item, index) => {
          itemInfo[index].ratings = calcAvgRating(item.data.ratings);
        });
        return (itemInfo);
      })
      .catch(function (error) {
        // console.error(error);
      });
    return itemInfo;
  }
);

export const relatedSlice = createSlice({
  name: 'related',
  initialState: {
    currentItem: null,
    related: []
  },
  reducers: {
    selectRelated: (state, action) => {
      state.currentItem = action.payload;
    }
  },
  extraReducers: {
    [fetchRelated.fulfilled]: (state, action) => {
      state.related = action.payload;
    }
  }
});

export const { selectRelated } = relatedSlice.actions;

export default relatedSlice.reducer;

