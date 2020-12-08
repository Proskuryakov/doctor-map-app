import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FiasAddressApiService} from '../../../../features/address/services/fias-address-api.service';
import {FiasAddressModel} from '../../../../features/address/models/fias-address.model';

@Component({
  selector: 'app-address-addition-input',
  templateUrl: './address-addition-input.component.html',
  styleUrls: ['./address-addition-input.component.sass']
})
export class AddressAdditionInputComponent implements OnInit {
  @Input()
  contentType: string;

  @Input()
  parentId: number;

  @Input()
  isDisabled: false;

  contentValue: FiasAddressModel | undefined = undefined;

  @Input()
  get content() {
    return this.contentValue;
  }

  @Output()
  contentChange = new EventEmitter();

  set content(val) {
    this.contentValue = val;
    if (!this.content) {
      this.inputText = '';
    }
    this.contentChange.emit(this.contentValue);
  }

  @Output()
  selectContent = new EventEmitter<any>();
  @Output()
  emptyValue = new EventEmitter<any>();

  @Input()
  inputText: string;

  addresses: Array<FiasAddressModel>;


  constructor(private readonly fiasAddressApiService: FiasAddressApiService) {
  }

  ngOnInit(): void {
  }

  refreshAddresses() {
    if (!this.inputText.trim()) {
      this.content = undefined;
      this.emptyValue.emit();
    }
    this.fiasAddressApiService
      .search(this.inputText, this.contentType, this.parentId)
      .subscribe(r => this.addresses = r.slice(1));
  }

  addressClick(address: FiasAddressModel) {
    this.inputText = address.name;
    this.addresses = new Array<FiasAddressModel>();
    this.content = address;
    return this.selectContent.emit(address);
  }
}
