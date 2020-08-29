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
</head>
<body>
  <header>
    <h3>Graph Data</h3>
  </header>
  <main>
  </main>
  </body>
  </html>`

const generateGraph = async () => {
  const rawDataArray = await fileSystem.getData(path.join('./src/routes/watering/moisture-data.json'))
  const data = sanitizeData(rawDataArray)

  const { window } = new JSDOM(htmlStub, { runScripts: "outside-only" });
  const container = window.document.querySelector('main')

  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  const x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d.date; }))
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([650, d3.max(data, function (d) { return +d.avg; })])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.avg) })
    )

  await fileSystem.writeHTMLData('./src/routes/watering/moisture-graph.html', window.document.documentElement.innerHTML)
}

const sanitizeData = (arr) => {
  return arr.map(item => {
    const key = Object.keys(item)[0]
    const date = new Date(Number(key))
    const avg = average(item[key])
    return {
      date,
      data: item[key],
      avg
    }
  })
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;

module.exports = {
  generateGraph
}
