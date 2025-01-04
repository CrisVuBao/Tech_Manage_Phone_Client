import { ActivatedRoute, Route } from '@angular/router';
import { routes } from './../../app.routes';
import { RepairService } from './../../core/services/repair.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Repair } from '../../shared/models/repair.model';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrl: './repair-detail.component.css'
})
export class RepairDetailComponent implements OnInit{
  id: string | null = null;
  paramsSubscription?: Subscription;
  repair?: Repair;

  constructor(
    private route: ActivatedRoute
    ,private repairService: RepairService) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id){
          this.repairService.getRepairById(Number(this.id)).subscribe({
            next: (res) => {
              this.repair = res;
              console.log(this.repair);
            },
            error: (err) => {
              console.error(err);
            }
          })
        }
      }
    })
  }
}
