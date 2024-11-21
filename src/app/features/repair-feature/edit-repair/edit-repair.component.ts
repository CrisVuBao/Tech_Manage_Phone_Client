import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Repair } from '../../../shared/models/repair.model';
import { RepairService } from '../../../core/services/repair.service';
import { RepairComponent } from '../../../pages/repair/repair.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrl: './edit-repair.component.css'
})
export class EditRepairComponent implements OnInit {
  @Input() repairId!: number;
  paramsSubscription!: Subscription;
  repair?: Repair;

  constructor(private router: Router, private repairService: RepairService) {
    
  }
  ngOnInit(): void {
  }

  closeModalAndNavigate() {
    this.router.navigate(['/sua-chua']);
  }

  openEditModel(repairId: number) { 
    this.repairId = repairId;

    this.repairService.getRepairById(this.repairId).subscribe((data) => {
      this.repair = data;
      console.log(this.repair);
    });
  }

  onFormSubmit(): void {
    if(this.repairId && this.repair) {
      this.repairService.updateRepairStatus(this.repairId, this.repair)
      .subscribe({
        next: (res) => {
          // Khi submit thành công
          Swal.fire({
            title: 'Thành công!',
            text: 'Sửa phiếu thành công.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
          setTimeout(() => {
            window.location.reload();
            console.log("Thêm thành công");
          },1000)
        }
      });
    }
  }
}
