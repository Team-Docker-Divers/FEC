import React from "react";
import { render, screen } from '@testing-library/react'; //Allows artificial rendering
import userEvent from '@testing-library/user-event'; //Allows triggering of user events. Not demo'd on this page.
import '@testing-library/jest-dom'; //Provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.
import App from '../App.jsx';
import store from '../../store.js';
import { Provider } from 'react-redux';

/* Some example templates for testing are provided below. In general, you will
1)render the component (see examples below)
2)query for the component: https://testing-library.com/docs/queries/about
3)optionally insert user events to manipulate elements: https://testing-library.com/docs/ecosystem-user-event
4)test assertions about the component: https://github.com/testing-library/jest-dom */

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>);
});

describe('Overview Widget', () => {
  test('The Overview Widget should render to the screen', () => {
    expect(screen.getByTestId('overview')).toBeInTheDocument();
  });

  test('Should have an image gallery', () => {
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
  });

  test('Should have a product information section', () => {
    expect(screen.getByTestId('product-info')).toBeInTheDocument();
  });

  test('Should have a style selector', () => {
    expect(screen.getByTestId('style-selector')).toBeInTheDocument();
  });

  test('Should have an add to cart section', () => {
    expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
  });
});

describe('Product Information component', () => {
  xtest('Should have a star rating component', () => {
    expect(screen.getByTestId('star-rating')).toBeInTheDocument();
  });

  xtest('The star rating should contain a total of 5 stars', () => {

  });

  xtest('The star rating should be representative up to a quarter of a review point', () => {

  });

  xtest('There should be a link next to the star rating stating "Read all <#> reviews', () => {

  });

  xtest('The read all reviews link should scroll the page to Ratings & Reviews section when clicked', () => {

  });

  xtest('The entire star rating section should be hidden if the product has no reviews', () => {

  });

  xtest('Should display a product category', async () => {
    expect(screen.getByTestId('product-category')).toBeInTheDocument();
    expect(screen.getByTestId('product-category')).toHaveTextContent('Jackets');
  });

  xtest('Should display a product title', () => {
    expect(screen.getByTestId('product-name')).toBeInTheDocument();
    expect(screen.getByTestId('product-name')).toHaveTextContent('Camo Onoesie');
  });

  xtest('Should display a price which is derived from the initial default selected style', () => {
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toHaveTextContent('$140.00');
  });

  xtest('The price should update based on a style being selected', () => {

  });

  xtest('If an item is on sale, the sale price should appear in red followed by the struckthrough original price', () => {

  });

  xtest('Should show a product overview section if available for that item, and not show it if unavailable', () => {

  });

  xtest('Should have share buttons for Facebook, Twitter, and Pinterest', () => {

  });
});