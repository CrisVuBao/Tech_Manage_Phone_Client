import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrl: './flower.component.css'
})
export class FlowerComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private petals: any[] = [];
  private images: HTMLImageElement[] = [];
  private spawnInterval = 1000; // Tần suất tạo hoa (ms)
  private petalCreationInterval: any;

  ngOnInit(): void {
    this.loadImages(); // Tải hình ảnh hoa trước
    this.setupCanvas();
    this.createPetals();
    this.animate();
    this.stopFallingAfterDuration(10000); // Dừng sau 10 giây
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
      this.createPetals();
    });
  }

  // Tạo cánh hoa
  private createPetals(): void {
    this.petals = [];
    for (let i = 0; i < 50; i++) {
      this.petals.push({
        x: Math.random() * this.canvas.width, // Vị trí ngang ngẫu nhiên
        y: Math.random() * this.canvas.height, // Vị trí dọc ngẫu nhiên
        size: Math.random() * 15 + 15, // Kích thước hoa (20px - 40px)
        speedY: Math.random() * 2 + 1, // Tốc độ rơi (1px - 3px)
        speedX: Math.random() * 1 - 0.5, // Tốc độ bay ngang (-0.5px - 0.5px)
        rotation: Math.random() * 360, // Góc xoay ban đầu
        rotationSpeed: Math.random() * 2 - 1, // Tốc độ xoay (-1deg - 1deg)
        image: this.images[Math.floor(Math.random() * this.images.length)], // Chọn hình ảnh ngẫu nhiên
      });
    }
  }

    // Bắt đầu tạo hoa với tần suất
    private startSpawningPetals(): void {
      setInterval(() => {
        this.createPetals();
      }, this.spawnInterval);
    }

      // Dừng hiệu ứng sau 10 giây
    private stopFallingAfterDuration(duration: number): void {
      setTimeout(() => {
        clearInterval(this.petalCreationInterval); // Dừng việc tạo cánh hoa
      }, duration);
    }

  // Hàm vẽ từng cánh hoa
  private drawPetal(petal: any): void {
    this.ctx.save();
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate((petal.rotation * Math.PI) / 180); // Chuyển góc xoay từ độ sang radian
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
    petal.rotation += petal.rotationSpeed; // Cập nhật góc xoay

    // Nếu cánh hoa rơi khỏi màn hình, reset lại
    if (petal.y > this.canvas.height) {
      petal.y = -20; // Quay lại từ phía trên
      petal.x = Math.random() * this.canvas.width; // Vị trí ngang mới
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
