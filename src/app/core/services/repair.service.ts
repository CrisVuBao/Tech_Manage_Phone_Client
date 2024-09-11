import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Repair } from "../../shared/models/repair.model";
import { environment } from "../../../environments/environment.development";

@Injectable ({
    providedIn: 'root'
})

export class RepairService {
    private apiUrl = 'your-api-url'; // Thay thế bằng URL API của bạn

    constructor(private http: HttpClient) {

    }

    getAllRepair() : Observable<Repair[]> {
        return  this.http.get<Repair[]>(`${environment.apiBaseUrl}/api/GetAllRepair`)
    }

    getRepairById(id: number) : Observable<Repair> {
        return this.http.get<Repair>(`${environment.apiBaseUrl}/api/GetRepairById/${id}`);
    }

    addRepair(model: Repair) : Observable<void> {
        return this.http.post<void>(`${environment.apiBaseUrl}/api/CreateRepair`,model)
    }

    updateRepairStatus(id:number, repair: Repair): Observable<Repair> {
        return this.http.put<Repair>(`${environment.apiBaseUrl}/api/UpdateRepair/${id}`, repair);
    }
}