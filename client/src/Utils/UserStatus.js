export const getUserStatusString = (statusId) => {
  switch(statusId) {
    case 0: return 'Active'
    case 1: return 'Banned'
    default: return 'Active'
  }
}

export const getUserStatusColor = (statusId) => {
  switch(statusId) {
    case 0: return 'teal'
    case 1: return 'orange'
    default: return 'teal'
  }
}