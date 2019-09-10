import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart'

class PartialLoadingIndicatorStoryHomepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 100
    }

  }


  render() {
    return (
      <div>
        <PieChart
          data={[
            {
              title: 'One',
              value: 10,
              color: '#77966D'
            },
            {
              title: 'Two',
              value: 10,
              color: '#626D58'
            },
            {
              title: 'Three',
              value: 20,
              color: '#544343'
            },
            {
              title: 'Four',
              value: 5,
              color: '#297373'
            },
            {
              title: 'Five',
              value: 5,
              color: '#E9D758'
            },
            {
              title: 'Six',
              value: 12,
              color: '#E38627'
            },
            {
              title: 'Seven',
              value: 10,
              color: '#C13C37'
            },
            {
              title: 'Eight',
              value: 30,
              color: '#6A2135'
            }
          ]}



          reveal={this.state.percentage}
          lineWidth={20}
          background="#bfbfbf"
          lengthAngle={270}
          rounded
          animate
        />
      </div>
    )
  }
}

export default PartialLoadingIndicatorStoryHomepage
