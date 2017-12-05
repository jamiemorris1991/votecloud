import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFauxDom from 'react-faux-dom';
import { select } from 'd3-selection';
import cloud from 'd3-cloud';
import '../styles/wordCloud.css';

class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    fontSizeMapper: PropTypes.func,
    fontWeightMapper: PropTypes.func,
    rotate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ])
  }

  static defaultProps = {
    width: 700,
    height: 600,
    padding: 5,
    fontSizeMapper: word => word.value,
    fontWeightMapper: word => 300,
    rotate: 0,
  }

  componentWillMount() {
    const { width, height } = this.props;

    this.wordCloudElement = ReactFauxDom.createElement('div');

    this.wordCloud =  select(this.wordCloudElement)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
  }

  render() {
    const { data, width, height, padding, fontSizeMapper, fontWeightMapper, rotate } = this.props;
    const words = data.slice(0);

    cloud()
      .size([width, height])
      .words(words)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .fontWeight(fontWeightMapper)
      .on('end', words => {
        const wordCloud = this.wordCloud
          .selectAll('text')
          .data(words, word => word._id);

        wordCloud
          .enter()
          .append('text')
          .attr('class', 'word')
          .attr('text-anchor', 'middle')
          .style('font-weight', d => d.weight)
          .style('font-size', d => `${d.size}px`)
          .attr('transform',
            d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
          )
          .text(d => d.text);

        wordCloud
          .style('font-weight', d => d.weight)
          .style('font-size', d => `${d.size}px`)
          .attr('transform',
            d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
          );

          wordCloud
            .exit()
            .remove();
      })
      .start();

    return this.wordCloudElement.toReact();
  }
}


export default WordCloud;
