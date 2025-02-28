import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrl: './flower.component.css'
})
export class FlowerComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private petals: any[] = []; // Danh sách cánh hoa
  private images: HTMLImageElement[] = []; // Danh sách hình ảnh hoa
  private petalCreationInterval: any; // Biến lưu setInterval
  private spawnInterval = 800; // Tần suất tạo hoa (ms)

  ngOnInit(): void {
    this.loadImages(); // Tải hình ảnh hoa
    this.setupCanvas(); // Thiết lập canvas
    this.startSpawningPetals(); // Bắt đầu tạo hoa
    this.animate(); // Bắt đầu hiệu ứng
    // this.stopFallingAfterDuration(20000); // Dừng tạo hoa sau 10 giây
  }

  // Tải hình ảnh hoa
  private loadImages(): void {
    const imagePaths = [
      '../../../../assets/img/flower/sakura.png', // Hoa đào
      '../../../../assets/img/flower/apricot.png', // Hoa mai
    ];
    this.images = imagePaths.map((path) => {
      const img = new Image();
      img.src = path;
      return img;
    });
  }

  // Thiết lập canvas
  private setupCanvas(): void {
    this.canvas = document.getElementById('flowerCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  // Tạo thêm một cánh hoa
  private createPetal(): void {
    const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
    this.petals.push({
      x: Math.random() * this.canvas.width, // Vị trí ngang ngẫu nhiên
      y: -20, // Bắt đầu từ phía trên màn hình
      size: Math.random() * 17 + 17, // Kích thước hoa (15px - 30px)
      speedY: Math.random() * 2 + 1, // Tốc độ rơi (1px - 3px)
      speedX: Math.random() * 1 - 0.5, // Tốc độ bay ngang (-0.5px - 0.5px)
      rotation: Math.random() * 360, // Góc xoay ban đầu
      rotationSpeed: Math.random() * 2 - 1, // Tốc độ xoay (-1deg - 1deg)
      image: randomImage, // Hình ảnh hoa
    });
  }

  // Bắt đầu tạo hoa với tần suất
  private startSpawningPetals(): void {
    this.petalCreationInterval = setInterval(() => {
      this.createPetal(); // Tạo thêm một cánh hoa
    }, this.spawnInterval);
  }

  // Dừng tạo thêm hoa sau 10 giây
  private stopFallingAfterDuration(duration: number): void {
    setTimeout(() => {
      clearInterval(this.petalCreationInterval); // Dừng việc tạo cánh hoa
      this.petalCreationInterval = null; // Xóa biến để tránh lỗi
    }, duration);
  }

  // Hàm vẽ từng cánh hoa
  private drawPetal(petal: any): void {
    this.ctx.save();
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate((petal.rotation * Math.PI) / 180); // Xoay cánh hoa
    this.ctx.drawImage(
      petal.image,
      -petal.size / 2, // Đặt tâm của ảnh vào giữa
      -petal.size / 2,
      petal.size,
      petal.size
    );
    this.ctx.restore();
  }

  // Hàm cập nhật vị trí cánh hoa
  private updatePetal(petal: any): void {
    petal.y += petal.speedY; // Rơi dọc
    petal.x += petal.speedX; // Dịch ngang
    petal.rotation += petal.rotationSpeed; // Xoay cánh hoa

    // Nếu rơi khỏi màn hình, xóa cánh hoa khỏi danh sách
    if (petal.y > this.canvas.height) {
      const index = this.petals.indexOf(petal);
      if (index > -1) {
        this.petals.splice(index, 1);
      }
    }
  }

  // Vẽ và cập nhật tất cả cánh hoa
  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const petal of this.petals) {
      this.updatePetal(petal);
      this.drawPetal(petal);
    }

    requestAnimationFrame(() => this.animate());
  }
}
