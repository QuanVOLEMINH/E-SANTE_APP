import { Component, OnInit } from "@angular/core";
import { ResponseService } from "../../services/response.service";

import Chart from "chart.js";
import ChartScatter from "chart.js-scatter";
@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",

  styleUrls: ["./chart.component.css"],
  providers: [ResponseService]
})
export class ChartComponent implements OnInit {
  input = {
    id: "",
    type: ""
  };
  types = [];
  data = {};
  canvas: any;
  ctx: any;
  myChart: any;
  showTypes = false;

  constructor(private _responseService: ResponseService) { }

  ngOnInit() {

  }

  clearTypes() {
    this.types = [];
    this.showTypes = false;
    this.input.type = "";
  }

  pushUnique(arr: Array<any>, item) {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
      return true;
    }
    return false;
  }

  onClick() {
    const responseCollection = {};
    this._responseService.getResponsesById(this.input.id).subscribe(
      res => {
        // console.log(res);
        for (const item in res) {
          if (item.match(/^response.+/i)) {
            responseCollection[item] = res[item];
          }
        }
        // console.log(this.types);
        if (Object.keys(responseCollection).length <= 0) {
          console.log("There is no responses.");
        } else {
          this.data = {};
          const valuesArray = [];

          // GET TYPES
          for (const item in responseCollection) {
            for (const key in responseCollection[item]["biochimie"]) {
              // console.log("key is " + key);
              if (!isNaN(responseCollection[item]["biochimie"][key])) {
                this.pushUnique(this.types, key);
              }
            }
            for (const key in responseCollection[item]["physique"]) {
              if (!isNaN(responseCollection[item]["physique"][key])) {
                this.pushUnique(this.types, key);
              }
            }
          }
          this.showTypes = true;
          // FORM TO {TYPES : [VALUES]}
          if (this.input.type !== "") {
            for (const item in responseCollection) {
              // console.log(this.types[i]);
              const date = item.substring(9);
              const biochimieContent =
                responseCollection[item]["biochimie"][this.input.type];
              const physiqueContent =
                responseCollection[item]["physique"][this.input.type];
              if (biochimieContent !== undefined) {
                const value = {};
                value[date] = biochimieContent;
                valuesArray.push(value);
              }
              if (physiqueContent !== undefined) {
                const value = {};
                value[date] = physiqueContent;
                valuesArray.push(value);
              }
            }
            this.data[this.input.type] = valuesArray;
            console.log(this.data);

            this.viewChart();
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  viewChart() {
    const dataToSketch = this.formatDataToSketch(this.data, this.input.type);
    // console.log(dataToSketch);
    this.sketch1Line(dataToSketch.labels, dataToSketch.data);

    /* 
    let x = [];
    for (let i = 0; i < this.types.length; i++) {
      x[i] = this.formatDataToSketch(this.allData, this.types[i]);
    }

    // this.sketch3Lines(x[0].labels, x[0].data, x[1].data, x[2].data);
    let canvas2, ctx2: any;
    canvas2 = document.getElementById("testChart");
    ctx2 = canvas2.getContext("2d");
    let data2 = [
      {
        label: 'My First dataset',
        strokeColor: '#F16220',
        pointColor: '#F16220',
        pointStrokeColor: '#fff',
        data: [
          { x: 19, y: 65 },
          { x: 27, y: 59 },
          { x: 28, y: 69 },
          { x: 40, y: 81 },
          { x: 48, y: 56 }
        ]
      },
      {
        label: 'My Second dataset',
        strokeColor: '#007ACC',
        pointColor: '#007ACC',
        pointStrokeColor: '#fff',
        data: [
          { x: 19, y: 75, r: 4 },
          { x: 27, y: 69, r: 7 },
          { x: 28, y: 70, r: 5 },
          { x: 40, y: 31, r: 3 },
          { x: 48, y: 76, r: 6 },
          { x: 52, y: 23, r: 3 },
          { x: 24, y: 32, r: 4 }
        ]
      }
    ];
    let options = {
      scaleLabel: '<%=value%>',
    };
    const testChart = new Chart(ctx2).Scatter(data2, options);
    */
  }

  formatDataToSketch(dataSource: object, type: string) {
    const x = dataSource[type];
    const labels = [];
    const data = [];
    for (const item in x) {
      for (const date in x[item]) {
        labels.push(date);
        data.push(x[item][date]);
      }
    }
    return { labels: labels, data: data };
  }

  sketch1Line(labels, data) {
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");
    this.myChart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            label: this.input.type,
            borderColor:
              "#" +
              Math.random()
                .toString(16)
                .slice(-6),
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Graph"
        },
        responsive: false,
        display: true,
        /*animation: {
          onComplete: function () {
            let ctx = this.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = "black";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {
              for (let i = 0; i < dataset.data.length; i++) {
                for (let key in dataset._meta) {
                  var model = dataset._meta[key].data[i]._model;
                  ctx.fillText(dataset.data[i], model.x, model.y - 5);
                }
              }
            });
          }
        }*/
      }
    });
  }

  sketch3Lines(labels, data1, data2, data3) {
    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");
    const data = {
      labels: labels,
      datasets: [
        {
          data: data1,
          // label: this.input.type,
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: data2,
          // label: this.input.type,
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: data3,
          // label: this.input.type,
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    };
    const options = {
      title: {
        display: true,
        text: "Graph"
      },
      responsive: false,
      display: true
    };

    const myChart = new Chart(this.ctx, {
      type: "line",
      data: data,
      options: options
    });
  }
}
