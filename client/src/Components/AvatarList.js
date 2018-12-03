import React, { Component } from 'react'
import {
    List,
    Image
} from 'semantic-ui-react'

import './Styles/AvatarList.css'

import { getAvatarResource } from '../Utils/Avatars'

import avatarEllipses from '../Images/avatar_ellipses.png'

class AvatarList extends Component {

  renderAvatars() {
    var avatars = []
    for (const [index, value] of this.props.commenterAvatarIds.entries()) {
      if (index < 4) {
        avatars.push(<List.Item className='avatarListItem' key={index}>
            <Image avatar src={getAvatarResource(value)} style={{zIndex: 5-index}} />
          </List.Item>)
      } else {
        avatars.push(<List.Item className='avatarListItem' key={index}>
           <Image avatar src={avatarEllipses} color='grey' style={{zIndex: 5-index}}/>
          </List.Item>)
        break;
      }
    }
    return avatars;
  }

  render() {
    return (
      <List horizontal className='avatarList'>
        { this.renderAvatars() }
      </List>
    ) 
  }
}

export default AvatarList