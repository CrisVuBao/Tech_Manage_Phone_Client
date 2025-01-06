import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Repair } from "../../shared/models/repair.model";
import { environment } from "../../../environments/environment.development";
import { CreateRepair } from "../../shared/models/createRepair.model";

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

    getRepairByNumberPhone(phoneNumber: string) : Observable<Repair[]> {
      return this.http.get<Repair[]>(`${environment.apiBaseUrl}/api/GetAllRepairByNumberPhone/${phoneNumber}`);
    }

    addRepair(model: CreateRepair) : Observable<void> {
        return this.http.post<void>(`${environment.apiBaseUrl}/api/CreateRepair`,model)
    }

    updateRepair(id:number, repair: Repair): Observable<Repair> {
        return this.http.put<Repair>(`${environment.apiBaseUrl}/api/UpdateRepair/${id}`, repair);
    }

    updateStatusRepair(id:number): Observable<void> {
      return this.http.put<void>(`${environment.apiBaseUrl}/api/UpdateStatusRepair/${id}`, null);
    }

    deleteRepair(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiBaseUrl}/api/DeleteRepairById/${id}`);
    }
}
