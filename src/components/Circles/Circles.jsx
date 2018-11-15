
import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Circles extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#F3E5F5', '#7B1FA2'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions, r, fill, filter } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const xOffset = xScale.bandwidth()/2
    const radius = r || xScale.bandwidth()/2
    const circles = (
      data.map(datum =>
        <circle
          key={datum.title}
          cx={xScale(datum.title) + xOffset}
          cy={yScale(datum.value)}
          r={radius}
          fill={fill || this.colorScale(datum.value)}
          filter={filter ? `url(#${filter})` : ''}
        />,
      )
    )

    return (
      <g>{circles}</g>
    )
  }
}
