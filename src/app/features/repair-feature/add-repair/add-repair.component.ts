import { AfterViewInit, Component } from '@angular/core';
import { Repair } from '../../../shared/models/repair.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairService } from '../../../core/services/repair.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-repair',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-repair.component.html',
  styleUrl: './add-repair.component.css'
})
export class AddRepairComponent{

  model: Repair;

  constructor(private repairService: RepairService) {
    this.model = {
      repairId: 0,
      deviceName: "",
      errorCondition: "",
      currentStatus: "", // hiện trạng
      imageUrl: "",
      lend: false, // cho mượn máy
      creationDate: new Date(),
      returnDate: new Date(),
      totalAmount: 0, // Use number for decimal
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
              confirmButton: 'custom-confirm-btn'
            }
          });
          setTimeout(() => {
            window.location.reload();
            console.log("Thêm thành công");
          },1000)
        }
      })
  }

  closeCollapse(): void {
    const collapseElement = document.getElementById('addRowModal');
    if (collapseElement) {
      collapseElement.classList.remove('show');
    }

    // Đóng modal nếu modal là nguyên nhân tạo ra màn hình xám mờ
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      const modalBackdrop = document.querySelector('.modal-backdrop') as HTMLElement;
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

}
