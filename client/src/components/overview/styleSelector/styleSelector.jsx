//React dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Material-UI dependencies
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

//Component/Redux dependencies
import { fetchStyleInfo, selectStyle } from '../overviewSlice.js';

//Styles for StyleSelector component
const useStyles = makeStyles({
  root: {
    borderRadius: 10 + '%',
    height: 100,
    width: 100,
    margin: 'auto'
  },
  titleBar: {
    background: 'none',
    height: 25
  },
  icon: {
    color: 'white',
    backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.3), transparent 15px)"
  }
});

//StyleSelector component
const StyleSelector = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.app.productId);
  const allStyles = useSelector((state) => state.overview.styles);
  const currentStyle = useSelector((state) => state.overview.currentStyle);

  useEffect(() => {
    dispatch(fetchStyleInfo(productId));
  }, [productId]);

  if (currentStyle) {
    return (
      <div data-testid="style-selector"> <b>STYLE > </b> {currentStyle.name}
        <GridList cellHeight={100} cols={4}>
          {allStyles.map((style, index, allStyles) => {
            var url;
            if (style.photos[0] && style.photos[0].thumbnail_url) {
              url = style.photos[0].thumbnail_url;
            } else {
              url = "/assets/imgPlaceholder.jpeg";
            }

            return (
              <GridListTile
                xs={3}
                key={style.style_id}
                data-testid={`style${index}`}
                cols={1}
                onClick={() => dispatch(selectStyle(style))}
                classes={{ tile: classes.root }}
              >
                <img alt={`style ${index}`} src={url} style={{ objectFit: 'cover' }}/>

                {style.style_id === currentStyle.style_id ?
                  <GridListTileBar //Conditional rendering for currently selected style
                    actionIcon={
                      <IconButton disabled aria-label="currently selected style">
                        <DoneOutlineIcon classes={{ root: classes.icon }}/>
                      </IconButton>}
                    actionPosition="left"
                    classes={{ root: classes.titleBar }}
                    titlePosition="top"
                  /> :
                  <GridListTileBar
                    classes={{ root: classes.titleBar }}
                    titlePosition="top"
                  />
                }
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  } else {
    return (<div data-testid="style-selector"> Loading </div>);
  }
};

export default StyleSelector;
