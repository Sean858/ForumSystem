import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import {
  Modal,
  Grid,
  Form,
  Button,
  Header,
  Comment
} from 'semantic-ui-react'

import PostComment from './PostComment'
import LikeButton from './LikeButton'
import ReportButton from './ReportButton'

import './Styles/ViewPostModal.css'

import ViewPostActions from '../Redux/ViewPostRedux'
import ReportButtonActions from '../Redux/ReportButtonRedux'

class ViewPostModal extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      comment: null
    }
  }

  componentDidMount() {
    this.onCommentChange = this.onCommentChange.bind(this)
    this.onCommentSubmit = this.onCommentSubmit.bind(this)
  }

  parseDate(dateString) {
    return moment(dateString).fromNow()
  }

  onCommentChange(event, data) {
    this.setState({comment:data.value})
  }

  onCommentSubmit() {
    this.props.submitComment(this.props.postId, this.state.comment)
  }

  renderComments(comments) {
    var commentsList = []
    for (const [index, value] of comments.entries()) {
      commentsList.push(
          <PostComment 
            name={value.name}
            avatarId={value.avatarId}
            content={value.content}
            date={value.date} 
            key={'comment'+ index} />)
    }
    return commentsList;
  }

  render() {

    const onClose = () => {
      this.props.closeReportButtonPopup()
      this.props.closeViewPostModal()
      this.props.history.push("/")
    }

    return (
      <Modal 
        dimmer='inverted'
        closeIcon
        open={this.props.open}
        onClose={onClose}>
        <Modal.Header>{this.props.title}
          <Header.Subheader className='viewPostSubHeader'>
            by <span className="viewPostAuthor">{this.props.author}</span>
            {this.parseDate(this.props.date)}
            <LikeButton postId={this.props.postId}/>
            <ReportButton postId={this.props.postId}/>
          </Header.Subheader>
        </Modal.Header>
        <Modal.Content> 
          {this.props.content}
          <Grid className="commentContainer">
              <Comment.Group className="commentGroup">
                <Header as='h5' dividing textAlign='left'>
                  Comments
                </Header>
                { this.renderComments(this.props.comments) }
                <Form reply className='commentReplyForm'>
                  <Form.TextArea onChange={this.onCommentChange} />
                  <Button content='Add Comment' labelPosition='left' icon='edit' primary 
                  onClick={this.onCommentSubmit}/>
                </Form>
              </Comment.Group>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.viewPost.modalOpen,
    postId: state.viewPost.postId,
    title: state.viewPost.post.title,
    date: state.viewPost.post.date,
    author: state.viewPost.post.author,
    content: state.viewPost.post.content,
    comments: state.viewPost.post.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openViewPostModal: () => {
      dispatch(ViewPostActions.openViewPostModal());
    },
    closeViewPostModal: () => {
      dispatch(ViewPostActions.closeViewPostModal());
    },
    closeReportButtonPopup: () => {
      dispatch(ReportButtonActions.closeReportButtonPopup());
    },
    fetchPost: (postId) => {
      dispatch(ViewPostActions.postFetch(postId));
    },
    submitComment: (postId, content) => {
      dispatch(ViewPostActions.commentSubmit(postId, content));
    }
  }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPostModal))