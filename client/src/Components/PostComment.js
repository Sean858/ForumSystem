import React, { Component } from 'react'

import { Comment } from 'semantic-ui-react'
import moment from 'moment'

import './Styles/PostComment.css'

import { getAvatarResource } from '../Utils/Avatars'

class PostComment extends Component {

  parseDate(dateString) {
    return moment(dateString).fromNow()
  }

  render() {
    return (
    <Comment className="postComment">
    <Comment.Avatar src={getAvatarResource(this.props.avatarId)} />
    <Comment.Content>
      <Comment.Author as='a'>{this.props.name}</Comment.Author>
      <Comment.Metadata>
        <div>{this.parseDate(this.props.date)}</div>
      </Comment.Metadata>
      <Comment.Text>{this.props.content}</Comment.Text>
      <Comment.Actions>
        <Comment.Action></Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
    )
  }
}

export default PostComment