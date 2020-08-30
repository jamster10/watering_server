const d3 = require('d3')
const jsdom = require('jsdom')
const path = require('path')
const { fileSystem } = require('./fileSystem')

const { JSDOM } = jsdom;

const htmlStub = `<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plant Data</title>
  <style>

body {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}

main {
  width: 100%;
  height: 100%;
}

#chart {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
</head>
<body>
  <header>
    <h3>Graph Data</h3>
  </header>
  <main>
  <svg id="chart"></svg>
  </main>
  </body>
  </html>`

const generateGraph = async () => {
  const rawDataArray = await fileSystem.getData(path.join('./src/routes/watering/moisture-data.json'))
  const data = sanitizeData(rawDataArray)

  const { window } = new JSDOM(htmlStub, { runScripts: "outside-only" });
  const container = window.document.querySelector('#chart')

  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 1400 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;

  // Define scales
  const xScale = d3.scaleTime().range([0, width]);
  const yScale = d3.scaleLinear().range([height, 0]);
  const color = d3.scaleOrdinal().range(d3.schemeCategory10);

  // Define axes
  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  // Define lines
  const line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(function (d) {
      return xScale(d["date"]);
    })
    .y(function (d) {
      return yScale(d["value"]);
    });

  // Define svg canvas

  const svg = d3
    .select(container)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set the color domain equal to the three product categories
  const sensorNames = ["Sensor A", "Sensor B", "Sensor C", "Average"]
  color.domain(sensorNames);

  const sensorData = sensorNames.map((sensor, sensorIdx) => ({
    sensor,
    datapoints: data.map(d => ({
      date: d.date, value: d.data[sensorIdx]
    }))
  }))

  // Set the domain of the axes
  xScale.domain(
    d3.extent(data, function (d) {
      return d.date;
    })
  );

  yScale.domain([650, 900]);

  // Place the axes on the chart
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("y", 6)
    .attr("dy", ".71em")
    .attr("dx", ".71em")
    .style("text-anchor", "beginning")
    .text("Sensor Reading");

  const sensors = svg
    .selectAll(".sensor")
    .data(sensorData)
    .enter()
    .append("g")
    .attr("class", "sensor");

  sensors
    .append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line(d.datapoints);
    })
    .style("stroke", function (d) {
      return color(d.sensor);
    });

  await fileSystem.writeHTMLData('./src/routes/watering/moisture-graph.html', window.document.documentElement.innerHTML)
}

const sanitizeData = (arr) => {
  return arr.map(item => {
    const key = Object.keys(item)[0]
    const date = new Date(Number(key))
    const avg = Math.floor(average(item[key]))
    return {
      date,
      data: [...item[key], avg]
    }
  })
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;

module.exports = {
  generateGraph
}
