import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class AwesomeShadow extends Component {

  render() {

    return (
      <filter id={this.props.id} filterUnits='userSpaceOnUse'>
        <feGaussianBlur id={`${this.props.id}Blur`} fill={this.props.fill} stdDeviation='10' />
        <feOffset dx='10' dy='10' />
        <feComponentTransfer><feFuncA type = 'linear' slope='1.1' /></feComponentTransfer>
        <feMerge>
            <feMergeNode/>
            <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>
    )
  }
}
