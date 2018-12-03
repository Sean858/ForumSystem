export const getReportReasonString = (reasonId) => {
  switch(reasonId) {
    case 1: return 'Vulgar'
    case 2: return 'Advertising'
    case 3: return 'Irrelevant'
    default: return 'Vulgar'
  }
}

export const getAvailableReportReasonIds = () => {
  return [1,2,3]
}

export const getReportReasonColors = (reasonId) => {
  switch(reasonId) {
    case 1: return 'orange'
    case 2: return 'purple'
    case 3: return 'red'
    default: return 'orange'
  }
}