import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-add-repair',
  standalone: true,
  imports: [],
  templateUrl: './add-repair.component.html',
  styleUrl: './add-repair.component.css'
})
export class AddRepairComponent{

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
