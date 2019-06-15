var svgWidth = 960;
var svgHeight = 500;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
console.log(svg);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("assets/data/data.csv").then(function(trendData){
    console.log(trendData);

    trendData.forEach(function(data){ 
        data.smokes=+data.smokes;
        data.age=+data.age
    });


    var xLinearScale = d3.scaleLinear()
                        .domain([d3.min(trendData, d => d.age) * 0.8,
                        d3.max(trendData, d => d.age) * 1.2]) // TODO: fill in
                        .range([0, chartWidth]);
    var yLinearScale = d3.scaleLinear()
                        .domain([d3.min(trendData, d => d.smokes) * 0.8,
                        d3.max(trendData, d => d.smokes) * 1.2]) // TODO: fill in
                        .range([chartHeight,0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  var circle=chartGroup.selectAll("g")
    .data(trendData)
    .enter()
    .append("circle")
    .attr("class","circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 10)
    .attr("fill", "dark blue")
    .attr("opacity", ".5");
    

    // .attr("width", d=>chartWidth-xLinearScale(d.age))
    // .attr("height", d => chartHeight - yLinearScale(d.smokes));

});
// .error(function(error) {
//   console.log(error);
// })


    