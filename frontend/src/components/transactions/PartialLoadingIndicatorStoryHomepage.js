import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart'

class PartialLoadingIndicatorStoryHomepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 20
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
              color: '#E38627'
            },
            {
              title: 'Two',
              value: 15,
              color: '#C13C37'
            },
            {
              title: 'Three',
              value: 20,
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
