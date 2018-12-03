import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  Button, 
  Grid,
  Popup,
  Header,
  Checkbox,
  Icon,
  Input,
  TextArea,
  Label
} from 'semantic-ui-react'

import './Styles/ReportButton.css'
import ReportButtonActions from '../Redux/ReportButtonRedux'

import { getReportReasonString, getReportReasonColors, getAvailableReportReasonIds } from '../Utils/Reports'

class ReportButton extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      comment: null,
      reasonsChecked: {}
    }
  }

  componentDidMount() {
    this.onReportButtonClick = this.onReportButtonClick.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
    this.onReportButtonClick = this.onReportButtonClick.bind(this)
  }

  onReasonChecked(reasonId) {
    var reasonsChecked = this.state.reasonsChecked
    reasonsChecked[reasonId] = !reasonsChecked[reasonId]
    this.setState({reasonsChecked:reasonsChecked})
  }

  onCommentChange(event, data) {
    this.setState({comment:data.value})
  }

  onReportButtonClick() {
    const postId = this.props.postId
    const reasonIds = getAvailableReportReasonIds().filter(reasonId => { 
      return this.state.reasonsChecked[reasonId] === true });
    const comment = this.state.comment
    this.props.submitReport(postId, reasonIds, comment)
  }

  render() {

    const availableReportReasonIds = getAvailableReportReasonIds()
    
    return (
      <Popup trigger={            
        <Button circular basic 
        icon={<Icon name='flag outline' className='postActionIcon'/>} 
        className='postActionButton'/>} 
        flowing on='click' className="reportPopup" position='bottom center'
        open={this.props.popupOpen}
        onOpen={this.props.openPopup}
        onClose={this.props.closePopup}>
        <Header>Check reasons for report</Header>
        {availableReportReasonIds.map((reasonId) => {
          return (
            <Checkbox label={
              <label className="reportCheckboxLabel">
                <Label color={getReportReasonColors(reasonId)}>
                  {getReportReasonString(reasonId)}
                </Label><br></br>
              </label>} 
              className="reportCheckbox"
              onChange={() => this.onReasonChecked(reasonId)}
              key={'cb' + reasonId}></Checkbox>
          )
        })}
        <TextArea placeholder='Additional comments' className="reportTextArea"
        onChange={this.onCommentChange}></TextArea><br/>
        <Button onClick={this.onReportButtonClick}>Report</Button>
      </Popup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    popupOpen: state.reportButton.popupOpen
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openPopup: () => {
      dispatch(ReportButtonActions.openReportButtonPopup());
    },
    closePopup: () => {
      dispatch(ReportButtonActions.closeReportButtonPopup());
    },
    submitReport: (postId, reportReasonIds, comment) => {
      dispatch(ReportButtonActions.reportSubmit(postId, reportReasonIds, comment));
    }
  }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportButton))