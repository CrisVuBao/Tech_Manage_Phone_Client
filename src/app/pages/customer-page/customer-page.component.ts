import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Repair } from '../../shared/models/repair.model';
import { HttpClient } from '@angular/common/http';
import { RepairService } from '../../core/services/repair.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css',
})
export class CustomerPageComponent {

  repair$?: Observable<Repair[]>;
  phoneNumber: string = '';
  hasSearched: boolean = false;

  constructor(private http: HttpClient,
    private repairService: RepairService
  ) {}

  searchRepair(): void {
    if(!this.phoneNumber) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }

    this.repair$ = this.repairService.getRepairByNumberPhone(this.phoneNumber);
  }

}
