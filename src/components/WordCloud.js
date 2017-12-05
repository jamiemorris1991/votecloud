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
    this.wordCloud = ReactFauxDom.createElement('div');
  }

  render() {
    const { data, width, height, padding, fontSizeMapper, fontWeightMapper, rotate } = this.props;
    const wordCounts = data.map(
      text => ({ ...text })
    );

    // clear old words
    select(this.wordCloud).selectAll('*').remove();

    // render based on new data
    const layout = cloud()
      .size([width, height])
      .words(wordCounts)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .fontWeight(fontWeightMapper)
      .on('end', words => {
        select(this.wordCloud)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-weight', d => d.weight)
          .attr('class', 'word')
          .attr('text-anchor', 'middle')
          .attr('transform',
            d => `translate(${[d.x, d.y]})rotate(${d.rotate})`
          )
          .text(d => d.text);
      });

    layout.start();

    return this.wordCloud.toReact();
  }
}


export default WordCloud;
