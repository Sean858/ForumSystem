import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Grid,
  Label,
  Button,
  Header,
  Divider,
  Icon,
  Table,
  Checkbox
} from 'semantic-ui-react'

import './Styles/HomePage.css'

import { getReportReasonString, getReportReasonColors } from '../Utils/Reports'

import ViewReportActions from '../Redux/ViewReportRedux'

class ViewReportPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      reportsChecked: {},
      bansChecked: {} };
  }

  componentDidMount() {
    this.props.fetchReports()

    this.onReportChecked = this.onReportChecked.bind(this)
    this.onReportsSelctAll =  this.onReportsSelctAll.bind(this)
    this.onReportsSelctNone = this.onReportsSelctNone.bind(this)
    this.onBanChecked = this.onBanChecked.bind(this)
    this.onBansSelctAll = this.onBansSelctAll.bind(this)
    this.onBansSelctNone = this.onBansSelctNone.bind(this)
    this.onBanUsers = this.onBanUsers.bind(this)
    this.onUnbanUsers = this.onUnbanUsers.bind(this)
  }

  onReportChecked(reportId) {
    var reportsChecked = this.state.reportsChecked
    reportsChecked[reportId] = !reportsChecked[reportId]
    this.setState({reportsChecked:reportsChecked})
  }

  onReportsSelctAll() {
    for (var i=0; i < this.props.reports.length; i++) {
      const report = this.props.reports[i]
      var reportsChecked = this.state.reportsChecked
      reportsChecked[report.report_id] = true
      this.setState({reportsChecked:reportsChecked})
    }
  }

  onReportsSelctNone() {
    for (var i=0; i < this.props.reports.length; i++) {
      const report = this.props.reports[i]
      var reportsChecked = this.state.reportsChecked
      reportsChecked[report.report_id] = false
      this.setState({reportsChecked:reportsChecked})
    }
  }

  onBanChecked(banId) {
    var bansChecked = this.state.bansChecked
    bansChecked[banId] = !bansChecked[banId]
    this.setState({bansChecked:bansChecked})
  }

  onBansSelctAll() {
    for (var i=0; i < this.props.bans.length; i++) {
      const ban = this.props.bans[i]
      var bansChecked = this.state.bansChecked
      bansChecked[ban.ban_id] = true
      this.setState({bansChecked:bansChecked})
    }
  }

  onBansSelctNone() {
    for (var i=0; i < this.props.bans.length; i++) {
      const ban = this.props.bans[i]
      var bansChecked = this.state.bansChecked
      bansChecked[ban.ban_id] = false
      this.setState({bansChecked:bansChecked})
    }
  }

  onBanUsers() {
    const banReportIds = Object.keys(this.state.reportsChecked).filter(
      reportId => { return this.state.reportsChecked[reportId] === true });
    this.props.banUsers(banReportIds)
  }

  onUnbanUsers() {
    const unbanBanIds = Object.keys(this.state.bansChecked).filter(
      banId => { return this.state.bansChecked[banId] === true });
    this.props.unbanUsers(unbanBanIds)
  }

  renderReportRows(reports) {
    var reportList = reports.map((report) => {
      return (
        <Table.Row>
        <Table.Cell collapsing>
          <Checkbox 
            checked={this.state.reportsChecked[report.report_id]}
            onChange={() => this.onReportChecked(report.report_id)}/>
        </Table.Cell>
        <Table.Cell>{report.reported_name}</Table.Cell>
        <Table.Cell>{report.report_date}</Table.Cell>
        <Table.Cell>{report.reporter_name}</Table.Cell>
        <Table.Cell>{report.report_reason_ids.map((reason_id, index) => {
          return (
            <Label color={getReportReasonColors(reason_id)} horizontal>
              {getReportReasonString(reason_id)}
            </Label>)
        })}</Table.Cell>
      </Table.Row>);
    })

    return reportList
  }

  renderBanRows(bans) {
    var banList = bans.map((ban) => {
      return (
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox 
            checked={this.state.bansChecked[ban.ban_id]}
            onChange={() => this.onBanChecked(ban.ban_id)}/>
        </Table.Cell>
        <Table.Cell>{ban.banned_name}</Table.Cell>
        <Table.Cell>{ban.banned_date}</Table.Cell>
        <Table.Cell>{ban.banned_by}</Table.Cell>
        <Table.Cell>{ban.banned_reason_ids.map((reason_id, index) => {
         return (<Label color={getReportReasonColors(reason_id)} horizontal>
            {getReportReasonString(reason_id)}
          </Label>)
        })}</Table.Cell>
        <Table.Cell>Link</Table.Cell>
      </Table.Row>);
    })

    return banList
  }

  render() {
    return (
    <Container className="pageContainer">
    <Header as='h2'>
      <Icon name='ban' />
      <Header.Content>
        User Reports
        <Header.Subheader>Active user reports</Header.Subheader>
      </Header.Content>
    </Header>
    <Table sortable celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Reported on</Table.HeaderCell>
          <Table.HeaderCell>Reported by</Table.HeaderCell>
          <Table.HeaderCell>Reported for</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { this.renderReportRows(this.props.reports) }
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='4'>
            <Button floated='right' icon labelPosition='left' primary size='small'
              onClick={this.onBanUsers}>
              <Icon name='user' />Ban
            </Button>
            <Button size='small' onClick={this.onReportsSelctAll}>Select all</Button>
            <Button size='small' onClick={this.onReportsSelctNone}>
              Select none
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>

    <br/>
    <Divider />
    <br/>
     
    <Header as='h2'>
      <Icon name='gavel' />
      <Header.Content>
        Banned Users
        <Header.Subheader>Users who cannot post</Header.Subheader>
      </Header.Content>
    </Header>
    <Table sortable celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Banned on</Table.HeaderCell>
          <Table.HeaderCell>Banned by</Table.HeaderCell>
          <Table.HeaderCell>Banned for</Table.HeaderCell>
          <Table.HeaderCell>Link</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { this.renderBanRows(this.props.bans) }
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='5'>
            <Button floated='right' icon labelPosition='left' primary size='small'
              onClick={this.onUnbanUsers}>
              <Icon name='user' />Unban
            </Button>
            <Button size='small' onClick={this.onBansSelctAll}>Select all</Button>
            <Button size='small' onClick={this.onBansSelctNone}>
              Select none
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // activePostId: state.viewPost.postId
    reports: state.viewReport.reports,
    bans: state.viewReport.bans
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchReports: () => {
      dispatch(ViewReportActions.reportsFetch())
    },
    banUsers: (reportIds) => {
      dispatch(ViewReportActions.banSubmit(reportIds));
    },
    unbanUsers: (banIds) => {
      dispatch(ViewReportActions.unbanSubmit(banIds));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewReportPage)