import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Image,
  Icon,
  Segment,
  Grid,
  Header,
  Label
} from 'semantic-ui-react'
import moment from 'moment'

import AvatarList from './AvatarList'
import LikeButton from './LikeButton'

import './Styles/Post.css'

import ViewPostActions from '../Redux/ViewPostRedux'

import { getAvatarResource } from '../Utils/Avatars'
import { getPostCategoryColor, getPostCategoryName } from '../Utils/PostCategories'

class Post extends Component {

  parseDate(dateString) {
    return moment(dateString).fromNow()
  }

  getAvatarResource(avatarId) {
    const avatarPath = '../Images/avatars/small/' + avatarId + '.jpg'
    return require(avatarPath)
  }

  render() {

    return (
      <Segment className='post'>
        <Label basic floating className='postCategory'>
          <Icon name='circle' 
            color={getPostCategoryColor(this.props.categoryId)} 
            className='postCategoryIcon'/>
          {getPostCategoryName(this.props.categoryId)}
        </Label>
        <Grid className='postGrid'>
          <Grid.Column width={3}>
            <Image 
            circular
            src={getAvatarResource(this.props.authorAvatarId)} 
            className="authorImage"/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Grid.Row>
              <Header size='medium' textAlign='left' 
                className='clickable'>
                {/* <Link to={{ pathname: '/post/' + this.props.id }}>
                  {this.props.title}
                </Link> */}
                <div onClick={() => this.props.openViewPostModal(this.props.postId)}>{this.props.title}</div>
                <Header.Subheader className='postSubheader'>
                  {this.parseDate(this.props.date)}
                  <LikeButton postId={this.props.postId}/>
                </Header.Subheader>
              </Header>
            </Grid.Row>
            <Grid.Row className='postContent clickable'
              onClick={() => this.props.openViewPostModal(this.props.postId)}>
                {this.props.content}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3}>
            <Grid.Row stretched>
              <AvatarList commenterAvatarIds={this.props.commenterAvatarIds}/>
            </Grid.Row>
            <Grid.Row className='clickable'
              onClick={() => this.props.openViewPostModal(this.props.postId)}>
              <Label basic className='commentCount'>
                <Icon name='comment outline'/> 
                {this.props.comments}
              </Label>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    // activePostId: state.viewPost.postId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openViewPostModal: (postId) => {
      ownProps.history.push("/post/" + postId)
      dispatch(ViewPostActions.openViewPostModal(postId));
    },
    closeViewPostModal: () => {
      dispatch(ViewPostActions.closeViewPostModal());
      ownProps.history.push("/")
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))