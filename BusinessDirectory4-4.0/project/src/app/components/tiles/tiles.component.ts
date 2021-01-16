import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
})
export class TilesComponent implements OnInit {
  @Input() items: any[];
  @Input() footerField: string;
  @Output() itemTapped: EventEmitter<any> = new EventEmitter<any>();

  columns: number = 2;
  itemGroups: any[][] = [];

  constructor() { }

  ngOnInit() {
    let line = [];
    this.items.forEach((item) => {
      line.push(item);
      if (line.length === this.columns) {
        this.itemGroups.push(line);
        line = [];
      }
    });
    if (line.length) {
      this.itemGroups.push(line);
    }
  }

  itemClicked(item) {
    this.itemTapped.emit(item);
  }
}
