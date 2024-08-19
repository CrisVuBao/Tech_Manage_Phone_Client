import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Repair } from '../../shared/models/repair.model';
import { RepairService } from '../../core/services/repair.service';
import { CommonModule } from '@angular/common';
import { AddRepairComponent } from "../../features/repair-feature/add-repair/add-repair.component";

@Component({
  selector: 'app-repair',
  standalone: true,
  imports: [RouterLink, CommonModule, AddRepairComponent],
  templateUrl: './repair.component.html',
  styleUrl: './repair.component.css'
})
export class RepairComponent implements OnInit{

  repair$?: Observable<Repair[]>;

  constructor(private repairService: RepairService) {

  }

  ngOnInit(): void {
    this.repair$ = this.repairService.getAllRepair();
  }
}
