import React from "react";
import * as d3 from "d3";
import View from "../View/View";
import json3 from "./../data/data3.json";
import json from "./../data/data.json";
import relations_medias_francais from "./../data/relations_medias_francais.tsv";
class Container extends React.Component {
  state = {};
  componentDidMount() {
    //getting the data from file and update the state.

    if (json3) {
      this.setState({ data: json3});
    }
    if (relations_medias_francais) {
      d3.tsv(relations_medias_francais).then((response, error) => {
        if (error) {
          console.log(
            "an error was occured while reading ",
            relations_medias_francais,
            error
          );
        }
        this.setState({
          relationMediaFr: response
        });
      });
    }
    /*
        fetch("https://worldmap-ocp.s3.us-east-2.amazonaws.com/flare.json").then(
          response => {
            if (response.status !== 200) {
              console.log(`There was a problem: ${response.status}`);
              return;
            }
            response.json().then(data => {
              console.log("response", data);
              this.setState({ data });
            });
          }
        );*/
  }
  render() {
    return (
        <View data={this.state.data}></View>
    );
  }
}

export default Container;
