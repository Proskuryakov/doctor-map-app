import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-with-search',
  templateUrl: './select-with-search.component.html',
  styleUrls: ['./select-with-search.component.sass']
})
export class SelectWithSearchComponent implements OnInit {

  @Input()
  optionArray: Array<any>;
  @Input()
  buttonName: string = 'Click';

  @Output()
  selectedOptionClick = new EventEmitter<any>();
  @Output()
  searchEvent = new EventEmitter<any>();

  searchText: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  optionClick(option: any) {
    this.selectedOptionClick.emit(option);
  }

  filterArray() {
    this.searchEvent.emit(this.searchText);
  }
}
