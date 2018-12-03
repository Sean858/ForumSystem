import defaultAvatar from '../Images/user_default.png'
import avatar0 from '../Images/avatars/small/1.jpg'
import avatar1 from '../Images/avatars/small/0.jpg'
import avatar2 from '../Images/avatars/small/2.jpg'
import avatar3 from '../Images/avatars/small/3.jpg'
import avatar4 from '../Images/avatars/small/4.jpg'
import avatar5 from '../Images/avatars/small/5.jpg'
import avatar6 from '../Images/avatars/small/6.jpg'
import avatar7 from '../Images/avatars/small/7.jpg'
import avatar8 from '../Images/avatars/small/8.jpg'
import avatar9 from '../Images/avatars/small/9.jpg'
import avatar10 from '../Images/avatars/small/10.jpg'


export const getDefaultAvatar = () => {
  return defaultAvatar
}

export const getAvatarResource = (avatarId) => {
  switch(avatarId) {
    case 0: return avatar0
    case 1: return avatar1
    case 2: return avatar2
    case 3: return avatar3
    case 4: return avatar4
    case 5: return avatar5
    case 6: return avatar6
    case 7: return avatar7
    case 8: return avatar8
    case 9: return avatar9
    case 10: return avatar10
    default: return avatar0
  }
}

export const getAvatarColor = (avatarId) => {
  switch(avatarId) {
    case 0: return 'teal'
    case 1: return 'blue'
    case 2: return 'green'
    case 3: return 'red'
    case 4: return 'orange'
    case 5: return 'yellow'
    case 6: return 'violet'
    case 7: return 'purple'
    case 8: return 'pink'
    case 9: return 'brown'
    case 10: return 'olive'
    default: return 'teal'
  }
}

export const getAvailableAvatarIds = () => {
  return [0,1,2,3,4,5,6,7,8,9,10]
}