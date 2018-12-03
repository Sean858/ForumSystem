import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {
  Image,
  Icon,
  Segment,
  Grid,
  Header,
  Label
} from 'semantic-ui-react'

import './Styles/Snackbar.css'

import SnackBarActions from '../Redux/SnackBarRedux'

class SnackBar extends Component {

  render() {
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.props.hideSnackbar();
    };

    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
        <SnackbarContent message={this.props.message} />
        </Snackbar>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.snackbar.open,
    color: state.snackbar.color,
    message: state.snackbar.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showSnackbar: (message, color) => {
      dispatch(SnackBarActions.showSnackbar(message, color));
    },
    hideSnackbar: () => {
      dispatch(SnackBarActions.hideSnackbar());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SnackBar))