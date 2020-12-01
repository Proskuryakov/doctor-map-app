import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IllnessModel} from '../../../../features/illness/models/illness.model';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';

@Component({
  templateUrl: './illness.page.html',
  styleUrls: ['./illness.page.sass']
})
export class IllnessPage implements OnInit {
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedIllness: IllnessModel;
  illnesses: Array<IllnessModel>;
  isNewRecord: boolean;
  statusMessage: string;
  statusMessageColor: string;

  constructor(private readonly illnessApiService: IllnessApiService) {
    this.illnesses = new Array<IllnessModel>();
  }

  ngOnInit() {
    this.loadIllnesses();
  }

  private loadIllnesses() {
    this.illnessApiService.getAllIllness().subscribe((data: IllnessModel[]) => this.illnesses = data);
  }

  addIllness() {
    if (!this.isNewRecord) {
      this.statusMessage = undefined;
      this.editedIllness = new IllnessModel('', '#000000');
      this.illnesses.push(this.editedIllness);
      this.isNewRecord = true;
    } else {
      this.statusMessage = 'Необходимо закончить предыдущее добавление';
      this.statusMessageColor = 'red';
    }
  }

  editIllness(illness: IllnessModel) {
    this.editedIllness = illness;
  }

  loadTemplate(illnessModel: IllnessModel) {
    if (this.editedIllness && this.editedIllness.id === illnessModel.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveIllness() {
    if (this.isNewRecord) {
      this.illnessApiService.createIllness(this.editedIllness).subscribe(() => {
        this.loadIllnesses();
        this.statusMessage = 'Данные успешно добавлены';
        this.statusMessageColor = 'green';
        this.isNewRecord = false;
        this.editedIllness = undefined;
      }, () => {
        this.statusMessage = 'Ошибка при добавлении';
        this.statusMessageColor = 'red';
      });

    } else {
      this.illnessApiService.updateIllness(this.editedIllness).subscribe(() => {
        this.loadIllnesses();
        this.statusMessage = 'Данные успешно обновлены';
        this.statusMessageColor = 'green';
        this.editedIllness = undefined;
      }, () => {
        this.statusMessage = 'Ошибка при добавлении';
        this.statusMessageColor = 'red';
      });
    }


  }

  cancel() {
    if (this.isNewRecord) {
      this.illnesses.pop();
      this.isNewRecord = false;
    }
    this.editedIllness = undefined;
    this.statusMessage = undefined;
  }

  deleteIllness(illnessModel: IllnessModel) {
    this.illnessApiService.deleteIllness(illnessModel).subscribe(() => {
      this.loadIllnesses();
      this.statusMessage = 'Данные успешно удалены';
      this.statusMessageColor = 'green';
    });
  }

}
