import React from "react";
import * as d3 from "d3";
import View from "../View/View";
import json3 from "./../data/data3.json";
import tsvTest from "./../data/relations_medias_francais.tsv";
import relations_medias_francais from "./../data/relations_medias_francais.tsv";
class Container extends React.Component {
  state = {};
  componentDidMount() {
    //getting the data from file and update the state.

    if (json3) {
      this.setState({ data: json3});
    }
    d3.tsv(tsvTest).then((resp, error) => {
      if (error) throw error;
      this.setState({ data2: resp});
    });

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
  }
  
  render() {
    return (
        <View data={this.state.data2}></View>
    );
  }
}

export default Container;
