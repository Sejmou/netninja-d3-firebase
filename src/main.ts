import './style.css';
import { select, json, scaleLinear, max } from 'd3';

const svg = select('.canvas');

interface MenuEntry {
  name: string;
  orders: number;
}

json<MenuEntry[]>('menu.json').then(data => {
  if (!data) {
    console.error('No data found!');
    return;
  }

  const yValue = (d: MenuEntry) => d.orders;
  const y = scaleLinear()
    .domain([0, max(data, yValue)!])
    .range([0, 500]);

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
    .attr('height', d => y(d.orders))
    .attr('width', 50)
    .attr('x', (_, i) => i * 60)
    .attr('fill', 'orange');
});
