import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  Container,
  Header,
  Divider,
  Icon,
  Table,
  Item,
  Label
} from 'semantic-ui-react'

import './Styles/ProfilePage.css'

import AuthActions from '../Redux/AuthRedux'

import { getAvatarResource } from '../Utils/Avatars'
import { getUserStatusString, getUserStatusColor } from '../Utils/UserStatus'

class ProfilePage extends Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push('/')
    } 

    this.props.fetchProfile()
  }

  renderPostRows(posts) {
    var postList = posts.map((post) => {
      return (
      <Table.Row>
        <Table.Cell onClick={() => this.props.history.push(/post/+post.id)}>{post.title}</Table.Cell>
        <Table.Cell>{moment(post.date).fromNow()}</Table.Cell>
        <Table.Cell>{post.likes}</Table.Cell>
        <Table.Cell>{post.commentCount}</Table.Cell>
      </Table.Row>);
    })

    return postList
  }

  renderCommentRows(comments) {
    var commentList = comments.map((comment) => {
      return (
      <Table.Row>
        <Table.Cell width={4} onClick={() => this.props.history.push(/post/+comment.postId)}>{comment.postTitle}</Table.Cell>
        <Table.Cell>{moment(comment.date).fromNow()}</Table.Cell>
        <Table.Cell width={6}>{comment.content}</Table.Cell>
      </Table.Row>);
    })

    return commentList
  }

  render() {
    return (
    <Container className="pageContainer">
    <Item.Group>
    <Item className="profileItems">
      <Item.Image circular size='small' src={getAvatarResource(this.props.avatarId)} />

      <Item.Content>
        <Item.Header as='a' className='profileInfoField'>{this.props.name}</Item.Header>
        <Item.Meta className='profileInfoField'>Joined on {this.props.name}</Item.Meta>
        <Item.Description className='profileInfoField'>
          <Label>
            <Icon name='heart' /> {this.props.likesReceived}
          </Label>
          <Label>
            <Icon name='write square' /> {this.props.posts.length}
          </Label>
          <Label>
            <Icon name='comment alternate outline' /> {this.props.comments.length}
          </Label>
          <Label as='a' color={getUserStatusColor(this.props.statusId)} image>
            {getUserStatusString(this.props.statusId)}
          </Label>
        </Item.Description>
        <Item.Extra>{this.props.email}</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>

    <br/>
    <Divider />
    <br/>

    <Header as='h2'>
      <Icon name='write square' />
      <Header.Content>
        Posts
      </Header.Content>
    </Header>
    <Table sortable celled compact>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Likes</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { this.renderPostRows(this.props.posts) }
      </Table.Body>
    </Table>

    <br/>
    <Divider />
    <br/>

    <Header as='h2'>
      <Icon name='comment alternate outline' />
      <Header.Content>
        Comments
      </Header.Content>
    </Header>
    <Table sortable celled compact>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>On</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { this.renderCommentRows(this.props.comments) }
      </Table.Body>
    </Table>
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    name: state.auth.profile.name,
    dateJoined: state.auth.profile.dateJoined,
    avatarId: state.auth.profile.avatarId,
    likesReceived: state.auth.profile.likesReceived,
    statusId: state.auth.profile.statusId,
    email: state.auth.profile.email,
    posts: state.auth.profile.posts,
    comments: state.auth.profile.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProfile: () => dispatch(AuthActions.profileFetch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)