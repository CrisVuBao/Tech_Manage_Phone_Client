import { ImageService } from './../../../core/services/image.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Repair } from '../../../shared/models/repair.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairService } from '../../../core/services/repair.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CreateRepair } from '../../../shared/models/create-repair.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrl: './add-repair.component.css'
})
export class AddRepairComponent implements OnInit{

  model: CreateRepair;
  isImageSelectorVisible: boolean = false;
  displayImageUrl = "";
  private file?: File;

  constructor(private repairService: RepairService, private router: Router, private imageService: ImageService, private sanitizer: DomSanitizer) {
    this.model = {
      repairId: 0,
      deviceName: "",
      errorCondition: "",
      imageUrl: "",
      lend: false, // cho mượn máy
      creationDate: new Date(),
      returnDate: new Date(),
      note: "",
      isDelete: false,
      customerId: 0,
      status: "", // Received: Đã nhận, InProgress: Đang sửa, Completed: Đã xong,
      address: "",
      phoneNumber:"",
      fullName: ""
      // customer: { customerId: 0, fullName: "", phoneNumber: "", address: "" }
    }
  }
  ngOnInit(): void {
    this.imageService.onSelectImage()
      .subscribe({
        next: (image) => {
          this.model.imageUrl = image.url;
          this.displayImageUrl = image.url;
          console.log(this.displayImageUrl);
        }
      })
  }

  onSubmitAddRepair() {
    this.model.imageUrl = this.displayImageUrl;
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

  onImageFileUpload(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];

    if(this.file) {
      // upload image file
      this.imageService.uploadImage(this.file)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.displayImageUrl = res.url;
        }
      })
    }
  }

  selectImage(): void {

  }
}
