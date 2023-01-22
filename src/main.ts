import './style.css';
import {
  select,
  json,
  scaleLinear,
  max,
  scaleBand,
  axisBottom,
  axisLeft,
} from 'd3';

const svg = select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

interface MenuEntry {
  name: string;
  orders: number;
}

const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

json<MenuEntry[]>('menu.json').then(data => {
  if (!data) {
    console.error('No data found!');
    return;
  }

  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, graphWidth])
    .paddingInner(0.2) // space between bars
    .paddingOuter(0.1); // space between bars and edges of SVG

  const yValue = (d: MenuEntry) => d.orders;
  const y = scaleLinear()
    .domain([0, max(data, yValue)!])
    .range([0, graphHeight]);

  // join data to rect elements in SVG (as SVG is empty, we will only get enter selections and no actual already existing DOM elements)
  const bars = graph.selectAll('rect').data(data);

  // add enter selection to DOM (again need to append as rect elements? - confusing lol), link data characteristics to attributes
  bars
    .enter()
    .append('rect')
    .attr('blub', (d, i, n) => {
      console.log('inside attribute setter in selection; received:', d, i, n);
      return 0;
    })
    .attr('height', d => y(d.orders))
    .attr('width', x.bandwidth)
    .attr('x', d => x(d.name)!)
    .attr('fill', 'orange');

  // add axes
  const xAxisGroup = graph.append('g');
  const yAxisGroup = graph.append('g');
  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});
