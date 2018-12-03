import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    Menu,
    Image,
    Icon,
    Search,
    Dropdown
} from 'semantic-ui-react'

import './Styles/MenuBar.css'

import logo from '../Images/logo.png'
import { getDefaultAvatar, getAvatarResource } from '../Utils/Avatars'
import AuthModal from '../Components/AuthModal'
import AuthActions from '../Redux/AuthRedux'

class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.onClickMyInfo = this.onClickMyInfo.bind(this);
  }

  componentDidMount() {
    this.props.closeAuthModal()
  }
    
  onClickMyInfo() {
    if (this.props.loggedIn) {
      this.props.history.push("/profile")
    } else {
      this.props.openAuthModal()
    }
  }

  render() {

    const trigger = (
      <span>
        <Image avatar 
          src={this.props.loggedIn ? getAvatarResource(this.props.avatarId) : 
                                     getDefaultAvatar()} />
      </span>
    )

      return (
      // <Segment
      //     textAlign='center'
      //     style={{ minHeight: 700, padding: '1em 0em' }}
      //     vertical
      //   >
          <Menu
            fixed={'top'}
            inverted={true}
            pointing={true}
            secondary={true}
            size='large'
            className='top-menu'
          >    
          <AuthModal/>
            {/* <Container> */}
              <Menu.Item position='left' onClick={() => this.props.history.push("/")}>
                <Image src={logo} size={'tiny'}/>
              </Menu.Item>
              <Menu.Item>
              <Search
              />
              </Menu.Item>
              <Menu.Item position='right'>
                {this.props.isAdmin && <Menu.Item as='a' onClick={() => this.props.history.push("/reports")}>
                  <Icon name='balance scale' color='grey'/>
                </Menu.Item>}
                <Menu.Item as='a' onClick={() => this.props.history.push("/stats")}  className="statsIcon"> 
                  <Icon name='chart bar' color='grey'/>
                </Menu.Item>
                {/* <Menu.Item> */}
                <Dropdown
                  trigger={trigger}
                  icon={null}
                  direction='left'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='My Info' onClick={this.onClickMyInfo}/>
                    { this.props.loggedIn && 
                      <Dropdown.Item text='Logout' 
                      className="logoutText" 
                      onClick={this.props.logout}/> 
                    }
                    <Dropdown.Divider />
                    <Dropdown.Item text='Privacy policy' onClick={() => this.props.history.push("/privacy")}/>
                  </Dropdown.Menu>
                </Dropdown>
                {/* </Menu.Item> */}
                
              </Menu.Item>
            {/* </Container> */}
          </Menu>
        // </Segment>
      ) 
    }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.loggedIn && state.auth.profile.isAdmin,
    loggedIn: state.auth.loggedIn,
    avatarId: state.auth.avatarId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openAuthModal: () => {
      dispatch(AuthActions.openAuthModal());
    },
    closeAuthModal: () => {
      dispatch(AuthActions.closeAuthModal());
    },
    logout: () => {
      dispatch(AuthActions.logout());
      ownProps.history.push("/")
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuBar))