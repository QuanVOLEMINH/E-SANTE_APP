import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../../services/response.service';
import Chart from 'chart.js';
import ChartScatter from 'chart.js-scatter';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [ResponseService]
})
export class ChartComponent implements OnInit {
  private input = {
    id: '',
    type: ''
  };
  private types = [];
  private data = {};
  canvas: any;
  ctx: any;

  constructor(private _responseService: ResponseService) {
    this._responseService.getResponsesById('1').subscribe(
      res => {
        this.types = Object.keys(res['response']['biochimie']);
      }
      ,
      err => {
        // console.log(err);
      }
    );

  }

  ngOnInit() {
  }

  viewChart() {
    let x = this.data[this.input.type];
    let labels = [], data = [];
    // tslint:disable-next-line:forin
    for (const item in x) {
      console.log(x[item]);
      // tslint:disable-next-line:forin
      for (const date in x[item]) {
        labels.push(date);
        data.push(x[item][date]);
      }
    }
    console.log('labels is '); console.log(labels);
    console.log('data is '); console.log(data);

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: this.input.type,
          borderColor: '#3e95cd',
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Graph'
        },
        responsive: false,
        display: true,
      }
    });
    /*s
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
    //const testChart = new Chart(ctx2).Scatter(data2, options);
*/
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
        // tslint:disable:forin
        if (Object.keys(responseCollection).length > 0) {
          this.data = {};
          const valuesArray = [];
          for (const item in responseCollection) {
            // console.log(this.types[i]);
            const date = item.substring(9);
            const x = responseCollection[item]['biochimie'][this.input.type];
            // console.log(x);
            const value = {};
            if (x !== -1) {
              value[date] = x;
              // console.log(value);
              valuesArray.push(value);
            }
          }
          this.data[this.input.type] = valuesArray;
          console.log(this.data);
          this.viewChart();
        } else {
          console.log('There is no responses.');
        }
      },
      err => {
        console.log(err);
      }
    );

  }
}
