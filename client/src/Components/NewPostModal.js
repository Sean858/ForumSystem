import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  Modal,
  Form,
  TextArea,
  Button, 
  Icon,
  Dropdown,
  Input
} from 'semantic-ui-react'

import './Styles/NewPostModal.css'
import { getPostCategoryColor, getPostCategoryName, getAvailablePostCategoryIds } from '../Utils/PostCategories'

import NewPostActions from '../Redux/NewPostRedux'

class NewPostModal extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      title: null,
      content: null,
      categoryId: null
    }
  }

  componentDidMount() {
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onContentChange = this.onContentChange.bind(this)
    this.onCategoryIdChange = this.onCategoryIdChange.bind(this)
    this.onPostSubmit = this.onPostSubmit.bind(this)
  }

  onTitleChange(event, data) {
    this.setState({title:data.value})
  }

  onContentChange(event, data) {
    this.setState({content:data.value})
  }

  onCategoryIdChange(event, data) {
    this.setState({categoryId:data.value})
  }

  onPostSubmit() {
    const title = this.state.title;
    const content = this.state.content;
    const categoryId = this.state.categoryId;
    if (!getAvailablePostCategoryIds().includes(categoryId)) {
      return;
    }
    this.props.submitPost(title, content, categoryId)
  }

  render() {

    const categoryOptions = []
    const availableCategoryIds = getAvailablePostCategoryIds()
    for (var i=0; i < availableCategoryIds.length; i++) {
      var categoryId = availableCategoryIds[i]
      var newCategory = {}
      newCategory.key = categoryId
      newCategory.value = categoryId
      newCategory.text = getPostCategoryName(categoryId)
      newCategory.color = getPostCategoryColor(categoryId)
      categoryOptions.push(newCategory)
    }

    const onClose = () => {
      this.props.closeNewPostModal()
      this.props.history.push("/")
    }

    return (
      <Modal 
        dimmer='inverted'
        closeIcon
        open={this.props.open}
        onClose={onClose}>
        <Modal.Header>Start a new discussion</Modal.Header>
        <Modal.Content> 
        <Dropdown clearable placeholder='Select category' options={categoryOptions} 
          onChange={this.onCategoryIdChange}/>
          <Form>
            <Form.Group>
              <Form.Input label={<label className='contentHeader'>Title</label>} 
                className='textField'
                placeholder='Put a descriptive title!' width={16}
                onChange={this.onTitleChange}/>
            </Form.Group>
          </Form>
          <Form>
            <label className='contentHeader'>Content</label>
            <TextArea autoHeight 
              className='textField'
              placeholder='By posting you acknowledge our privacy policy.' 
              onChange={this.onContentChange}
              style={{ minHeight: 300 }} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.closeNewPostModal}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' onClick={this.onPostSubmit}>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.newPost.modalOpen,
    categories: state.postCategory.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openNewPostModal: () => {
      dispatch(NewPostActions.openNewPostModal());
    },
    closeNewPostModal: () => {
      dispatch(NewPostActions.closeNewPostModal());
      ownProps.history.push("/")
    },
    submitPost: (title, content, categoryId) => {
      dispatch(NewPostActions.postSubmit(title, content, categoryId));
    }
  }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostModal))