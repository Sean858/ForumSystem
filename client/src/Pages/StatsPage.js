import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux'
import {
  Container, Icon, Image, Statistic, Header, Grid
} from 'semantic-ui-react'

import './Styles/PrivacyPolicyPage.css'

import StatsActions from '../Redux/StatsRedux'

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]

const lineChartData = [
                    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
            ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class StatsPage extends Component {

  componentDidMount() {
    this.props.fetchStats()
  }

  render() {
    return (
    <Container className="pageContainer">
    <Grid columns={2} divided>
    <Grid.Row>
      <Header as='h2'>
        <Icon name='chart bar' />
        <Header.Content>
          Statistics
          <Header.Subheader>Overall usages</Header.Subheader>
        </Header.Content>
      </Header>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      <Statistic>
          <Statistic.Value>{this.props.post_count}</Statistic.Value>
          <Statistic.Label>Number of posts</Statistic.Label>
        </Statistic>
      </Grid.Column>
      <Grid.Column>
        <Statistic>
          <Statistic.Value>
            <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
            {this.props.user_count}
          </Statistic.Value>
          <Statistic.Label>Members</Statistic.Label>
        </Statistic>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      <PieChart width={600} height={300}>
        <Pie startAngle={180} endAngle={0} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
          {
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }</Pie>
       </PieChart>
        <Statistic.Label>Category Distribution</Statistic.Label>
      </Grid.Column>
      <Grid.Column>
        <LineChart width={600} height={300} data={lineChartData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
        <Statistic.Label>Usage by month</Statistic.Label>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Header as='h2'>
        <Icon name='user' />
        <Header.Content>
          Hall of fame
          <Header.Subheader>Users that stand out</Header.Subheader>
        </Header.Content>
      </Header>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Statistic>
          <Statistic.Label>User with most posts</Statistic.Label>
          <Statistic.Value>{this.props.most_posts_count}</Statistic.Value>
          <Statistic.Label>{this.props.most_posts_name}</Statistic.Label>
        </Statistic>
      </Grid.Column>
      <Grid.Column>
      <Statistic>
          <Statistic.Label>User with most likes</Statistic.Label>
          <Statistic.Value>{this.props.most_likes_count}</Statistic.Value>
          <Statistic.Label>{this.props.most_likes_name}</Statistic.Label>
        </Statistic>
      </Grid.Column>
      <Grid.Column>

      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Statistic>
          <Statistic.Label>Post with most likes</Statistic.Label>
          <Statistic.Value>{this.props.most_likes_post_count}</Statistic.Value>
          <Statistic.Label>By {this.props.most_likes_post_name}</Statistic.Label>
        </Statistic>
      </Grid.Column>
      <Grid.Column>
      <Statistic>
          <Statistic.Label>Most banned user</Statistic.Label>
          <Statistic.Value>{this.props.most_bans_count}</Statistic.Value>
          <Statistic.Label>times by {this.props.most_bans_name}</Statistic.Label>
        </Statistic>
      </Grid.Column>
      <Grid.Column>

      </Grid.Column>
    </Grid.Row>
  </Grid>

    

      
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post_count: state.stats.post_count,
    user_count: state.stats.user_count,
    category_count: state.stats.category_count,
    most_posts_count: state.stats.most_posts_count,
    most_posts_name: state.stats.most_posts_name,
    most_likes_count: state.stats.most_likes_count,
    most_likes_name: state.stats.most_likes_name,
    most_likes_post_count: state.stats.most_likes_post_count,
    most_likes_post_name: state.stats.most_likes_post_name,
    most_bans_count: state.stats.most_bans_count,
    most_bans_name: state.stats.most_bans_name,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStats: () => {
      dispatch(StatsActions.fetchStats());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage)