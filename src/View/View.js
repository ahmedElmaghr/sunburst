import * as d3 from "d3";
import "./View.css";
import tsvTest from "./../data/relations_medias_francais.tsv";
import DataHelper from "./helper/DataHelper";
import React from "react";

class View extends React.Component {
  //width
  width = 932;
  //radius
  radius = this.width / 6;

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    const data = this.props.data;
    if (data) {
      this.drawSunburstChart(data);
    }
    return <div></div>;
  }

  //https://observablehq.com/d/54d3c0a047426724
  drawSunburstChart = (data)=> {
    const width = this.width;
    const radius = this.radius;
    const root = this.partition(DataHelper.constructTree(data));
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
        return this.getColorByElement(d);
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

  getColorByElement = d => {
    var rand1 = Math.random();
    var rand2 = Math.random();
    var rand3 = Math.random();
    
    switch (d.data.name) {
      case "Claude Perdriel":
        return "rgb(255,0,255)";
      case "Prisa":
        return "red";
      case "Xavier Niel":
        return "orange";
      case "AOL":
        return "pink";
      default:
        return "rgb("+rand1*255+","+rand2*255+","+rand3*255+")";
      }
  };

  //Functions utils
  partition = data => {
    var root = d3
      .hierarchy(data)
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
