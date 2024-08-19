import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Repair } from "../../shared/models/repair.model";
import { environment } from "../../../environments/environment.development";

@Injectable ({
    providedIn: 'root'
})

export class RepairService {
    constructor(private http: HttpClient) {

    }

    getAllRepair() : Observable<Repair[]> {
        return  this.http.get<Repair[]>(`${environment.apiBaseUrl}/api/GetAllRepair`)
    }
}