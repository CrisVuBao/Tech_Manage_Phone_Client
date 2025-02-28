import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Repair } from '../../shared/models/repair.model';
import { RepairService } from '../../core/services/repair.service';
import { CommonModule } from '@angular/common';
import { AddRepairComponent } from "../../features/repair-feature/add-repair/add-repair.component";
import { PipeStatus } from '../../core/pipes/pipe-status/pipe-status.component';
import { EditRepairComponent } from "../../features/repair-feature/edit-repair/edit-repair.component";
import Swal from 'sweetalert2';
import { routes } from '../../app.routes';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrl: './repair.component.css'
})
export class RepairComponent implements OnInit {
  @ViewChild(EditRepairComponent) editRepairComponent!: EditRepairComponent;
  repair$?: Observable<Repair[]>;

  constructor(private repairService: RepairService, private router: Router) {

  }

  ngOnInit(): void {
    this.repair$ = this.repairService.getAllRepair();
  }

  // Method to handle status change
  changeStatusToCompleted(repair: Repair): void {
    Swal.fire({
      title: 'Bạn chắc chứ ?',
      text: "Bạn có muốn chuyển trạng thái ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58d55c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý, complete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.repairService.updateStatusRepair(repair.repairId).subscribe(
          {
            next: (res) => {
              console.log(res);
              Swal.fire({
                  title: 'Thành công!',
                  text: 'Chuyển trạng thái thành công.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  customClass: {
                    confirmButton: 'btn btn-success'
                  }
                }
              );
              const currentScrollY = window.scrollY; // Lưu vị trí cuộn hiện tại
              localStorage.setItem('scrollPosition', currentScrollY.toString()); // Lưu vào localStorage
              window.location.reload();
            },
            error: (err) => {
              Swal.fire({
                title: 'Lỗi!',
                text: 'Không thể chuyển trạng thái.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
            }
          }
        );
      }
    });
  }

  openEditModal(repairId: number) {
   // this.editRepairComponent.repairId = repairId; // @Input repairId, lấy repairId của com cha truyền vào con (là edit com)
    this.editRepairComponent.openEditModel(repairId);
  }

  onDeleteRepair(id: number): void {
    if(id) {
      this.repairService.deleteRepair(id).subscribe({
        next: (res) => {
          // Khi submit thành công
          Swal.fire({
            title: 'Thành công!',
            text: 'Đã xóa.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
          const currentScrollY = window.scrollY; // Lưu vị trí cuộn hiện tại
          localStorage.setItem('scrollPosition', currentScrollY.toString()); // Lưu vào localStorage
          setTimeout(() => {
            window.location.reload();
          },1000)
        }
      })
    }
  }
}
