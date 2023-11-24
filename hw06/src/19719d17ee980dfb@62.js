function _1(md){return(
md`# HW06`
)}

function _artistPublic(FileAttachment){return(
FileAttachment("artistPublic (1) - artistPublic (1).csv").csv()
)}

function _artistVer(FileAttachment){return(
FileAttachment("artistVer (1) - artistVer (1).csv").csv()
)}

function _Ver_column_index(artistVer){return(
Object.keys(artistVer[0])[3]
)}

function _Ver_column(artistVer,Ver_column_index){return(
artistVer.map(row => row[Ver_column_index])
)}

function _Ver_uniqueValues(Ver_column){return(
[...new Set(Ver_column)].sort()
)}

function _Ver_artist_counts(Ver_uniqueValues,Ver_column){return(
Ver_uniqueValues.map(val =>({
  value: val,
  count: Ver_column.filter(v => v === val).length
}))
)}

function _Public_column_Index(artistPublic){return(
Object.keys(artistPublic[0])[4]
)}

function _Public_column(artistPublic,Public_column_Index){return(
artistPublic.map(row => String(row[Public_column_Index]))
)}

function _Public_uniqueValues(Public_column){return(
[...new Set(Public_column)].sort()
)}

function _Public_artist_counts(Public_uniqueValues,Public_column){return(
Public_uniqueValues.map(val => ({
  value: val,
  count: Public_column.filter(v => v === String(val)).length
}))
)}

function _data(Ver_artist_counts,Public_artist_counts){return(
Ver_artist_counts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: Public_artist_counts[index].count,
    series: 'artistpublic'
  }
]))
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _14(Plot,Ver_column_index,data,selectedSeries){return(
Plot.plot({
  height: 600,
  title: Ver_column_index,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#3498db', '#e74c3c'],  
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selectedSeries.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

function _selectedSeries1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(data,selectedSeries1,d3)
{
  
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#3498db', '#e74c3c']);

  
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart2(data,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#3498db', '#e74c3c']);
   // .range(['lightblue', 'lightblue']);
     //d3.scaleLinear().domain([舊的範圍]).range([新的範圍]) 
    //就是把舊範圍縮放到新的範圍內 

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
  // 添加陰影濾鏡效果
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur") //SVG濾鏡效果(高斯模糊) 用於模糊影像
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) //模糊的程度
      .attr("result", "blur"); //濾鏡的輸出

  filter.append("feOffset") //濾鏡的輸出(位移)
      .attr("in", "blur") //濾鏡的輸出(為前面定義的blur)
      .attr("dx", 4) //水平位移量
      .attr("dy", 4) //垂直位移量
      .attr("result", "offsetBlur"); //濾鏡的輸出名稱

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); //


  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)") // 添加陰影濾鏡效果
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", '#B5CAA0');
             //d3.select(this).attr("fill", "#B47157pink");
            
              
          
              
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); // 恢復原來的顏色
        d3.select(".tooltip").remove();

        });
});

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic (1) - artistPublic (1).csv", {url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer (1) - artistVer (1).csv", {url: new URL("./files/363ea43eed3c6a6a6fed83d3e26ac23641da56f4f0689da720760208af84f1c3caff531322fc2ceeaf3924e4ff2f0ca4314a49adfe0e45701c6687fc36ee24d3.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistPublic")).define("artistPublic", ["FileAttachment"], _artistPublic);
  main.variable(observer("artistVer")).define("artistVer", ["FileAttachment"], _artistVer);
  main.variable(observer("Ver_column_index")).define("Ver_column_index", ["artistVer"], _Ver_column_index);
  main.variable(observer("Ver_column")).define("Ver_column", ["artistVer","Ver_column_index"], _Ver_column);
  main.variable(observer("Ver_uniqueValues")).define("Ver_uniqueValues", ["Ver_column"], _Ver_uniqueValues);
  main.variable(observer("Ver_artist_counts")).define("Ver_artist_counts", ["Ver_uniqueValues","Ver_column"], _Ver_artist_counts);
  main.variable(observer("Public_column_Index")).define("Public_column_Index", ["artistPublic"], _Public_column_Index);
  main.variable(observer("Public_column")).define("Public_column", ["artistPublic","Public_column_Index"], _Public_column);
  main.variable(observer("Public_uniqueValues")).define("Public_uniqueValues", ["Public_column"], _Public_uniqueValues);
  main.variable(observer("Public_artist_counts")).define("Public_artist_counts", ["Public_uniqueValues","Public_column"], _Public_artist_counts);
  main.variable(observer("data")).define("data", ["Ver_artist_counts","Public_artist_counts"], _data);
  main.variable(observer("viewof selectedSeries")).define("viewof selectedSeries", ["Inputs"], _selectedSeries);
  main.variable(observer("selectedSeries")).define("selectedSeries", ["Generators", "viewof selectedSeries"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","Ver_column_index","data","selectedSeries"], _14);
  main.variable(observer("viewof selectedSeries1")).define("viewof selectedSeries1", ["Inputs"], _selectedSeries1);
  main.variable(observer("selectedSeries1")).define("selectedSeries1", ["Generators", "viewof selectedSeries1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["data","selectedSeries1","d3"], _chart);
  main.variable(observer("chart2")).define("chart2", ["data","selectedSeries1","d3"], _chart2);
  return main;
}
