import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {DataService} from "../../services/data.service";


@Component({
  selector: 'share-graph',
  templateUrl: './share-graph.component.html',
  styleUrls: ['./share-graph.component.css']
})
export class ShareGraphComponent implements OnInit{

constructor(public data_service: DataService) {
}

ngOnInit() {
  this.data_service.getGraph("AAPL")
}



selectSymbol(symbol: string) {

  this.data_service.getGraph(symbol);
}

reload() {
  location.reload();
}


  protected readonly location = location;
}
