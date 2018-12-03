import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Grid,
  Dropdown,
  Button,
  Radio,
  Divider,
  Icon
} from 'semantic-ui-react'

import Post from '../Components/Post'
import NewPostModal from '../Components/NewPostModal'
import ViewPostModal from '../Components/ViewPostModal'

import './Styles/HomePage.css'

import HomeActions from '../Redux/HomeRedux'
import NewPostActions from '../Redux/NewPostRedux'
import ViewPostActions from '../Redux/ViewPostRedux'

import { getPostCategoryColor, getPostCategoryName } from '../Utils/PostCategories'

const postSortOptions = [
  {
    key: 'likes',
    text: 'likes',
    value: 'likes',
    content: 'Likes',
  },
  {
    key: 'newest first',
    text: 'newest first',
    value: 'newest first',
    content: 'Newest first',
  },
  {
    key: 'oldest first',
    text: 'oldest first',
    value: 'oldest first',
    content: 'Oldest first',
  },
]

const postCategories = [
  {
    content: getPostCategoryName(1),
    color: getPostCategoryColor(1)
  },
  {
    content: getPostCategoryName(2),
    color: getPostCategoryColor(2)
  },
  {
    content: getPostCategoryName(3),
    color: getPostCategoryColor(3)
  },
  {
    content: getPostCategoryName(4),
    color: getPostCategoryColor(4)
  },
]

class HomePage extends Component {

  renderPosts() {
    var renderedPosts = []
    for (const [index, value] of this.props.posts.entries()) {
      renderedPosts.push(
      <Post
        postId={value.id}
        title={value.title}
        date={value.date}
        autor={value.author}
        content={value.content}
        authorAvatarId={value.author_avatar_id}
        categoryId={value.category_id}
        commenterAvatarIds={value.commenter_avatar_ids}
        comments={value.comments}
        likes={value.likes}
        key={'post'+value.id}
      />)
    }
    return renderedPosts
  }

  renderCategories() {
    var renderedCategories = []
    for (const [index, value] of postCategories.entries()) {
      renderedCategories.push(
      <Button 
        basic
        key={'postCategory'+index.toString()}>
        <Icon name='circle' color={value.color}/>
        {value.content}
      </Button>)
    }
    return renderedCategories
  }

  componentDidMount() {
    if (this.props.location.pathname === "/post" ||
        this.props.location.pathname === "/post/") {
      this.props.openNewPostModal()
    } else if (!isNaN(this.props.match.params.postId)) {
      this.props.openViewPostModal(parseInt(this.props.match.params.postId))
    }

    this.props.fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    // if (!isNaN(nextProps.match.params.postId)) {
    //   this.props.openViewPostModal(parseInt(nextProps.match.params.postId))
    // }
  }

  render() {
    return (
    <Container className="pageContainer">
    <NewPostModal/>
    <ViewPostModal/>
    <Grid>
        <Grid.Column width={10}>
          <Grid.Row textAlign='left' className='postSortOptions'>
            Sort by {' '}
              <Dropdown
                inline
                options={postSortOptions}
                defaultValue={postSortOptions[0].value}
            />
          </Grid.Row>
          <Grid.Row>
            {this.renderPosts()}
          </Grid.Row>
        </Grid.Column>
        
        <Grid.Column width={2}>
        </Grid.Column>

        <Grid.Column width={4} textAlign='center'>
          <Grid.Row>
          <Button 
            primary
            disabled={!this.props.loggedIn}
            className='newPostButton'
            onClick={this.props.openNewPostModal}
            content='Start a new discussion'/>
          </Grid.Row>
          <Grid.Row 
            className='likedPostToggle' 
            verticalAlign='middle'>
            <Radio toggle label='Liked posts only'/>
          </Grid.Row>
          <Grid.Row>
          <Divider /> 
          </Grid.Row>
          <Grid.Row>
            <Button.Group 
            vertical
            fluid>
              {this.renderCategories()}
            </Button.Group>
          </Grid.Row>
        </Grid.Column> 
  </Grid>
  </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // activePostId: state.viewPost.postId
    posts: state.home.posts,
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => {
      dispatch(HomeActions.postsFetch());
    },
    openNewPostModal: () => {
      ownProps.history.push("/post")
      dispatch(NewPostActions.openNewPostModal());
    },
    closeNewPostModal: () => {
      dispatch(NewPostActions.closeNewPostModal());
      ownProps.history.push("/")
    },
    openViewPostModal: (postId) => {
      ownProps.history.push("/post/" + ownProps.match.params.postId)
      dispatch(ViewPostActions.openViewPostModal(postId));
    },
    closeViewPostModal: () => {
      dispatch(ViewPostActions.closeViewPostModal());
      ownProps.history.push("/")
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)