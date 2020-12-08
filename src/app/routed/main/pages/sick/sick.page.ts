import {Component, OnInit} from '@angular/core';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {SickApiService} from '../../../../features/sick/services/sick-api.service';
import {SickModel} from '../../../../features/sick/models/sick.model';
import {MatDialog} from '@angular/material/dialog';
import {NewSickDialog} from '../../dialogs/new-sick/new-sick.dialog';
import {UpdateSickDialog} from '../../dialogs/update-sick/update-sick.dialog';
import {ChangeIllnessDialog} from '../../dialogs/change-illlness/change-illness.dialog';

@Component({
  templateUrl: './sick.page.html',
  styleUrls: ['./sick.page.sass']
})
export class SickPage implements OnInit {

  allSick: Array<SickModel>;
  message: string = '';
  error: boolean = false;

  constructor(
    private readonly illnessApiService: IllnessApiService,
    private readonly sickApiService: SickApiService,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadSicks();
  }

  private loadSicks() {
    this.sickApiService.getAllSickWithIllness().subscribe((data: SickModel[]) => this.allSick = data);
  }

  openCreateNewSickDialog() {
    this.message = '';
    this.dialog.open<NewSickDialog>(NewSickDialog).afterClosed().subscribe(() => this.ngOnInit());
  }

  deleteSick(sickModel: SickModel): void {
    this.sickApiService.deleteSick(sickModel).subscribe(() => {
      this.loadSicks();
      this.message = 'Данные успешно удалены';
      this.error = false;
    }, () => {
      this.message = 'Ошибка при удалении данных';
      this.error = true;
    });
  }

  openUpdateSickDialog(sickModel: SickModel): void {
    this.message = '';
    this.dialog.open(UpdateSickDialog, {
      data: sickModel
    }).afterClosed().subscribe(() => this.ngOnInit());
  }

  openChangeIllnessDialog(sickModel: SickModel): void {
    this.message = '';
    this.dialog.open(ChangeIllnessDialog, {
      data: sickModel
    }).afterClosed().subscribe(() => this.ngOnInit());
  }
}

