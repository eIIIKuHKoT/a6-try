import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ek-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  constructor() {
  }

  @Input() data;

  ngOnInit() {
  }

}
