import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {DataService} from "../../services/data.service";


@Component({
  selector: 'graph',
  templateUrl: './share-graph.component.html',
  styleUrls: ['./share-graph.component.css']
})
export class ShareGraphComponent implements OnInit {

  constructor(public data_service: DataService) {
  }

  @Input() symbol: string = "";




  ngOnInit() {
    this.data_service.getGraph(this.symbol)
  }


  reload() {
    location.reload();
  }


  protected readonly location = location;
}
