import './style.css';
import * as d3 from 'd3';

const svg = d3.select('.canvas');

interface MenuEntry {
  name: string;
  orders: number;
}

d3.json<MenuEntry[]>('menu.json').then(data => {
  if (!data) {
    console.error('No data found!');
    return;
  }
  // console.log(data);

  // join data to rect elements in SVG (as SVG is empty, we will only get enter selections and no actual already existing DOM elements)
  const bars = svg.selectAll('rect').data(data);

  // add enter selection to DOM (again need to append as rect elements? - confusing lol), link data characteristics to attributes
  bars
    .enter()
    .append('rect')
    .attr('blub', (d, i, n) => {
      console.log('inside attribute setter in selection; received:', d, i, n);
      return 0;
    })
    .attr('height', d => d.orders)
    .attr('width', 50)
    .attr('x', (_, i) => i * 60)
    .attr('fill', 'orange');
});
