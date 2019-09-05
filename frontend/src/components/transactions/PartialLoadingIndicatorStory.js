import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart'

class PartialLoadingIndicatorStory extends Component {
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
          data={[{ value: 1, key: 1, color: '#E38627' }]}
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

export default PartialLoadingIndicatorStory
