import * as d3 from "d3";
import "./View.css";
import tsvTest from "./../data/relations_medias_francais.tsv";
import React from "react";
import NodeDo from "./NodeDto"
import NodeDto from "./NodeDto";
class View extends React.Component {
  //width
  width = 932;
  //radius
  radius = this.width / 6;
  //dataTest
  dataTest = "";
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {}
  componentWillReceiveProps(nextProps, nextContext) {}

  async tst() {
    const tsv = await d3.tsv(tsvTest).then((resp, error) => {
      if (error) throw error;
      return resp;
    });
    console.log("tsv", tsv);
    this.constructTree(tsv);
  }

  constructTree = data => {
    console.log("####### debut construct tree");
    console.log("data entry", data);
    //Step 1 : create a {name: node} map
    var dataMap = [];
    dataMap = data.reduce(function(map, node) {
      map[node.name] = node;
      return map;
    }, {});
    console.log("step 1 dataMap get node", dataMap);
    //Step 2 : get root nodes
    //Step 3 : create the tree array
    var tree = [];
    data.forEach(function(node) {
      // find parent
      var parent = dataMap[node.parent];
      if (parent) {
        // create child array if it doesn't exist
        (parent.children || (parent.children = []))
          // add node to parent's child array
          .push(node);
      } else {
        // parent is null or missing
        tree.push(node);
      }
    });
    console.log("step 2 tree", tree);
    console.log("####### fin construct tree");

    this.dataTest = this.treeWrapper(tree);
  };

  getNodeRoots = data => {
    if (!data) throw "error data is undefined";
    console.log(data);
    var parentList = [];
    var nameList = [];

    data.forEach(node => {
      if (node.parent && !parentList.includes(node.parent)) {
        parentList.push(node.parent);
      }
    });

    data.forEach(node => {
      if (node.name && !nameList.includes(node.name)) {
        nameList.push(node.name);
      }
    });
    var rootsNamesList = parentList.filter(item => {
      return !nameList.includes(item);
    });
    var roots = [];
    console.log("rootsNamesList", rootsNamesList);
    console.log("data", data);
    rootsNamesList.forEach(rootName => {
      var node = data.filter(d => {
        return d.name == rootName;
      })[0];
      //var root = {};
      //root[rootName] =rootFromData;
      console.log("rootName : ", rootName, "node : ", node, "data : ", data);
      var root = new NodeDto(rootName, node);
      console.log("NodeDto created as root", root);
      roots.push(root);
    });
    console.log("roots", roots);
    return roots;
  };

  treeWrapper = tree => {
    return { name: "Media francais", children: tree };
  };

  render() {
    //
    this.tst();
    //
    const data = this.props.data;
    if (data) {
      this.drawSunburstChart(data);
    }
    return <div></div>;
  }

  //https://observablehq.com/d/54d3c0a047426724
  async drawSunburstChart(data) {
    const width = this.width;
    const radius = this.radius;
    const root = this.partition(data);
    var body = d3.select("body");
    root.each(d => (d.current = d));
    var divGlobal = body.append("div");

    const arc = d3
      .arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(this.radius * 1.5)
      .innerRadius(d => d.y0 * this.radius)
      .outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1));

    const svg = divGlobal
      .append("svg")
      .attr("viewBox", [0, 0, 2000, 2000])
      .style("font", "10px sans-serif");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", d => {
        while (d.depth > 1) d = d.parent;
        return this.color2(d);
      })
      .attr("fill-opacity", d =>
        arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("d", d => arc(d.current));

    path
      .filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    path.append("title").text(
      d =>
        `${d
          .ancestors()
          .map(d => d.data.key)
          .reverse()
          .join("/")}\n${this.format(d.value)}`
    );

    const label = g
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => {
        //let label = d.data.key ? d.data.key : d.data.cible;
        let label = d.data.name;
        if (label && label.length > 10) {
          label = label.slice(0, 10) + "...";
        }
        return label;
      });

    const parent = g
      .append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(p) {
      parent.datum(p.parent || root);

      root.each(
        d =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
          })
      );

      const t = g.transition().duration(750);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.

      path
        .transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => (d.current = i(t));
        })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", d =>
          arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attrTween("d", d => () => arc(d.current));

      label
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        })
        .transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      const transform = `rotate(${x - 90}) translate(${y},0) rotate(${
        x < 180 ? 0 : 180
      })`;
      return transform;
    }

    return svg.node();
  }

  color2 = d => {
    switch (d.data.name) {
      case "Claude Perdriel":
        return "blue";
      case "Prisa":
        return "red";
      case "Xavier Niel":
        return "orange";
      case "AOL":
        return "pink";
      default : return "green";
    }
  };

  //Functions utils
  partition = data => {
    var root = d3
      .hierarchy(this.dataTest)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    var size = [2 * Math.PI, root.height + 1];
    let partition = d3.partition().size(size)(root);
    return partition;
  };

  //color
  color = () => {
    d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, this.props.data.children.length + 1)
    );
  };

  //format
  format = () => d3.format(",d");
}

export default View;
