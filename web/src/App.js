import React, { Component } from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import { Line } from 'react-chartjs-2'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

let query = client.query({
  query: gql`
  {
    timeRange(start: "2019-01-01", end: "2019-01-02"){
      id
      date
      open
      close
      high
      low
    }
  }
  `
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Line data={timeRangeData} options={{title: {text: 'Bitcoin History (from Jan 1st, 2019 to Jan 2nd, 2019)', display: 'top'}}} />
      </div>
    );
  }
}

let timeRangeData = {
  labels: [],
  datasets: [
    {
      label: 'Open',
      fill: false,
      lineTension: 0,
      borderColor: '#1d4e89',
      borderJoinStyle: 'round',
      pointBackgroundColor: '#1d4e89',
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
    {
      label: 'Close',
      fill: false,
      lineTension: 0,
      borderColor: '#d62828',
      borderJoinStyle: 'round',
      pointBackgroundColor: '#d62828',
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
    {
      label: 'High',
      fill: false,
      lineTension: 0,
      borderColor: '#04e762',
      borderJoinStyle: 'round',
      pointBackgroundColor: '#04e762',
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
    {
      label: 'Low',
      fill: false,
      lineTension: 0,
      borderColor: '#ffbc42',
      borderJoinStyle: 'round',
      pointBackgroundColor: '#ffbc42',
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ]
};

query.then(res => res.data.timeRange.map(c => timeRangeData.labels.push(c.date)))
query.then(res => res.data.timeRange.map(c => timeRangeData.datasets[0].data.push(c.open)))
query.then(res => res.data.timeRange.map(c => timeRangeData.datasets[1].data.push(c.close)))
query.then(res => res.data.timeRange.map(c => timeRangeData.datasets[2].data.push(c.high)))
query.then(res => res.data.timeRange.map(c => timeRangeData.datasets[3].data.push(c.low)))

export default App;
