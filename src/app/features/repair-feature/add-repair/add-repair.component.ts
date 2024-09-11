import { AfterViewInit, Component } from '@angular/core';
import { Repair } from '../../../shared/models/repair.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairService } from '../../../core/services/repair.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrl: './add-repair.component.css'
})
export class AddRepairComponent{

  model: Repair;

  constructor(private repairService: RepairService, private router: Router) {
    this.model = {
      repairId: 0,
      deviceName: "",
      errorCondition: "",
      currentStatus: "", // hiện trạng
      imageUrl: "",
      lend: false, // cho mượn máy
      creationDate: new Date(),
      returnDate: new Date(),
      note: "",
      isDelete: false,
      customerId: 0,
      status: "", // Received: Đã nhận, InProgress: Đang sửa, Completed: Đã xong
      customer: { customerId: 0, name: "", phoneNumber: "" }
    }
  }

  onSubmitAddRepair() {
    this.repairService.addRepair(this.model)
      .subscribe({
        next: (res) => {
          // Khi submit thành công
          Swal.fire({
            title: 'Thành công!',
            text: 'Tạo phiếu thành công.',
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
      })
  }
}
