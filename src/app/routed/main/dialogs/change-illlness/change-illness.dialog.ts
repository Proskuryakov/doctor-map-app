import {Component, Inject, OnInit} from '@angular/core';
import {SickModel} from '../../../../features/sick/models/sick.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IllnessModel} from '../../../../features/illness/models/illness.model';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {SickApiService} from '../../../../features/sick/services/sick-api.service';

@Component({
  templateUrl: './change-illness.dialog.html',
  styleUrls: ['./change-illness.dialog.sass']
})
export class ChangeIllnessDialog implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  message = '';
  allIllnesses: Array<IllnessModel>;
  illnessForAdd = new Array<IllnessModel>();
  illnessForDelete = new Array<IllnessModel>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: SickModel,
    private readonly illnessApiService: IllnessApiService,
    private readonly sickApiService: SickApiService
  ) {
  }

  ngOnInit(): void {
    this.illnessApiService.getAllIllness().subscribe(value => {
      this.allIllnesses = value;
    });
  }

  changeIllness() {
    this.loading = true;
    this.message = '';
    this.error = false;
    this.sickApiService.changeIllnessDependency(
      this.data.id,
      this.illnessForAdd,
      this.illnessForDelete
    ).subscribe(() => {
      this.loading = false;
      this.message = 'Данные успешно обновлены';
    }, () => {
      this.loading = false;
      this.error = true;
      this.message = 'Ошибка при обовлении данных';
    });
  }

  addToDeleteList(illness: IllnessModel): void {
    let isContain = false;
    this.illnessForDelete.forEach(v => isContain ||= v.id === illness.id);

    if (!isContain) {
      this.illnessForDelete.push(illness);
    }
  }

  addToAddList(illness: IllnessModel) {
    let isContain = false;
    this.data.illnesses.forEach(v => isContain ||= v.id === illness.id);
    if (!isContain) {
      this.illnessForAdd.forEach(v => isContain ||= v.id === illness.id);
    }
    if (!isContain) {
      this.illnessForAdd.push(illness);
    }
  }

  filterIllness(searchText: string) {
    this.illnessApiService.getAllIllnessLikeName(searchText).subscribe(value => {
      this.allIllnesses = value;
    });
  }

  deleteFromAddList(illness: IllnessModel) {
    this.illnessForAdd = this.illnessForAdd.filter(i => i != illness);
  }

  deleteFromDeleteList(illness: IllnessModel) {
    this.illnessForDelete = this.illnessForDelete.filter(i => i != illness);
  }

  isSubmitButtonDisable(): boolean {
    return (this.illnessForAdd.length === 0 &&
      this.illnessForDelete.length === 0) ||
      this.data.illnesses.length + this.illnessForAdd.length - this.illnessForDelete.length === 0;
  }
}
