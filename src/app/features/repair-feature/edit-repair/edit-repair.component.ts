import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Repair } from '../../../shared/models/repair.model';
import { RepairService } from '../../../core/services/repair.service';

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
}
