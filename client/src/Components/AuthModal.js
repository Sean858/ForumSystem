import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  Modal,
  Tab,
  Image,
  Input,
  Form,
  Checkbox,
  Button,
  Dropdown,
  Label
} from 'semantic-ui-react'

import './Styles/AuthModal.css'

import AuthActions from '../Redux/AuthRedux'

import { getAvatarResource, getAvatarColor, getAvailableAvatarIds } from '../Utils/Avatars'

class AuthModal extends Component {

  constructor(props) {
    super(props);
    this.avatarTrigger = this.avatarTrigger.bind(this);
    this.onAvatarClick = this.onAvatarClick.bind(this);

    this.state = { 
      signupName: null,
      signupEmail: null,
      signupPassword: null,
      loginEmail: null,
      loginPassword: null
    }
  }

  componentDidMount() {
    this.onSignupNameChange = this.onSignupNameChange.bind(this)
    this.onSignupEmailChange = this.onSignupEmailChange.bind(this)
    this.onSignupPasswordChange = this.onSignupPasswordChange.bind(this)
    this.onLoginEmailChange = this.onLoginEmailChange.bind(this)
    this.onLoginPasswordChange = this.onLoginPasswordChange.bind(this)
    this.onSignupClick = this.onSignupClick.bind(this)
    this.onLoginClick = this.onLoginClick.bind(this)
  }

  onSignupNameChange(event, data) {
    this.setState({signupName:data.value})
  }

  onSignupEmailChange(event, data) {
    this.setState({signupEmail:data.value})
  }

  onSignupPasswordChange(event, data) {
    this.setState({signupPassword:data.value})
  }

  onLoginEmailChange(event, data) {
    this.setState({loginEmail:data.value})
  }

  onLoginPasswordChange(event, data) {
    this.setState({loginPassword:data.value})
  }

  onLoginClick() {
    this.props.login(this.state.loginEmail, this.state.loginPassword)
  }

  onSignupClick() {
    this.props.signup(this.props.avatarId, this.state.signupName, this.state.signupEmail, this.state.signupPassword)
  }

  avatarTrigger = () => {
    return(
      <Label as='a' image color={getAvatarColor(this.props.avatarId)} className='avatarDropdown'
      avatarid={this.props.avatarId}>
        <Image avatar src={getAvatarResource(this.props.avatarId)} />
        Choose an avatar
      </Label>
    )
  }

  onAvatarClick = (event, data) => {
    this.props.selectAvatar(data.value)
  } 

  panes = [
    { menuItem: 'Login', render: () => this.renderLogin() },
    { menuItem: 'Sign up', render: () => this.renderSignup() },
  ]

  renderLogin() {
    return (
      <Tab.Pane attached={false} className='borderlessSegment'>
      <Form>
        <Form.Field>
          <label>Email</label>
          <Input type='email' placeholder='Email' onChange={this.onLoginEmailChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input type='password' placeholder='Password' onChange={this.onLoginPasswordChange}/>
        </Form.Field>
        <Button type='submit' onClick={this.onLoginClick}>Submit</Button>
      </Form>
      </Tab.Pane>
    )
  }

  renderSignup() {

    const dropdownOptions = []
    const availableAvatarIds = getAvailableAvatarIds()
    for (var i=0; i < availableAvatarIds.length; i++) {
      var newEntry = {}
      newEntry.image = getAvatarResource(availableAvatarIds[i])
      newEntry.value = availableAvatarIds[i]
      dropdownOptions.push(newEntry)
    }
    
    return (
      <Tab.Pane attached={false} className='borderlessSegment'>
      <Form>
        <Dropdown 
          placeholder='Select an avatar' 
          onChange={this.onAvatarClick}
          options={dropdownOptions}
          trigger={this.avatarTrigger()} />
        <Form.Field>
          <label>Name</label>
          <Input placeholder='Full Name' onChange={this.onSignupNameChange}/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input type='email' placeholder='Email' onChange={this.onSignupEmailChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input type='password' placeholder='Password' onChange={this.onSignupPasswordChange}/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit' onClick={this.onSignupClick}>Submit</Button>
      </Form>
      </Tab.Pane>
    )
  }

  render() {
    return (
      <Modal 
        dimmer='inverted'
        closeIcon
        open={this.props.open}
        onClose={this.props.closeAuthModal}>
        <Modal.Content> 

        <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />
          
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.auth.modalOpen,
    avatarId: state.auth.avatarId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectAvatar: (avatarId) => {
      dispatch(AuthActions.selectAvatar(avatarId));
    },
    openAuthModal: () => {
      dispatch(AuthActions.openAuthModal());
    },
    closeAuthModal: () => {
      dispatch(AuthActions.closeAuthModal());
    },
    signup: (avatarId, name, email, password) => {
      dispatch(AuthActions.signupSubmit(avatarId, name, email, password))
    },
    login: (email, password) => {
      dispatch(AuthActions.loginSubmit(email, password))
    }
  }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthModal))