import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Button, 
  Icon,
} from 'semantic-ui-react'

import './Styles/LikeButton.css'
import LikeButtonActions from '../Redux/LikeButtonRedux'
import { AuthSelectors } from '../Redux/AuthRedux';

class LikeButton extends Component {

  renderIcon(filled) {
    return (filled ? 
      (<Icon name='heart' className='postActionIcon' color='olive'/>) :
      (<Icon name='heart outline' className='postActionIcon'/>)
    )
  }

  render() {
    
    return (
      <Button circular basic
        icon={this.renderIcon(this.props.filled)} 
        className='postActionButton'
        onClick={() => this.props.submitLike(this.props.postId)}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    likedPosts: state.auth.profile.likedPosts,
    filled: AuthSelectors.isPostLiked(state, ownProps.postId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLike: (postId) => {
      dispatch(LikeButtonActions.likeSubmit(postId));
    }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)