import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ImageResource } from "../../shared/models/image-resource.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  selectedImage: BehaviorSubject<ImageResource> = new BehaviorSubject<ImageResource>({
    imageId: '',
    fileName: '',
    fileExtention: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<ImageResource> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageResource>(`${environment.apiBaseUrl}/api/UploadImage`, formData);
  }

  selectImage(image: ImageResource): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<ImageResource> {
    return this.selectedImage.asObservable();
  }
}
