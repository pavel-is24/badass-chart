import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Area extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#F3E5F5', '#7B1FA2'])
      .interpolate(interpolateLab)
  }

  prepareData() {
    let d = [`M ${this.props.x} ${this.props.y}`];

    let collector = this.props.data.map(chunk => {
      let xNext = this.props.x + chunk[0] * this.props.multiplier;
      let yNext = this.props.y - chunk[1] * this.props.multiplier;
      return `L ${xNext} ${yNext}`;
    });

    return d.concat(collector).join(' ');
  }

  render() {
    const { scales, margins, data, svgDimensions, filter } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions
    const xOffset = xScale.bandwidth()/2
    let collector = data.map(datum => {
      let xNext = xScale(datum.title) + xOffset;
      let yNext = yScale(datum.value);
      return `L ${xNext} ${yNext}`;
    });
    const count = data.length;
    let x0 = xScale(data[0].title) + xOffset;
    let y0 = yScale(data[0].value);
    let xZ = xScale(data[count-1].title) + xOffset;
    let yZ = svgDimensions.height -  margins.bottom;
    let d = [`M ${x0} ${ y0}`]
      .concat(collector)
      .concat([`L ${xZ} ${ yZ}`])
      .join(' ') + ' Z';


    return (
      <g>
        <path d={d}
          fill="#2a7cca"
          opacity="0.05"
          filter={filter ? `url(#${filter})` : ''}
        />
      </g>
    )
  }
}
