export const getPostCategoryColor = (categoryId) => {
  switch(categoryId) {
    case 1: return 'teal'
    case 2: return 'blue'
    case 3: return 'green'
    case 4: return 'orange'
    default: return 'blue'
  }
}

export const getPostCategoryName = (categoryId) => {
  switch(categoryId) {
    case 1: return 'Announcement'
    case 2: return 'Discussion'
    case 3: return 'Question'
    case 4: return 'Guide'
    default: return 'Discussion'
  }
}

export const getAvailablePostCategoryIds = () => {
  return [1,2,3,4]
}