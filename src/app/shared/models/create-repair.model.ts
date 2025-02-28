import { Customers } from "./customers.model";

export interface CreateRepair { // các thuộc tính phải viết chữ đầu là Viết Thường, thì mới hiện dc chữ trên giao diện
    repairId: number;
    deviceName?: string;
    errorCondition?: string;
    currentStatus?: string; // hiện trạng
    imageUrl?: string;
    lend?: boolean; // cho mượn máy
    creationDate?: Date;
    returnDate?: Date;
    totalAmount?: number; // Use number for decimal
    note?: string;
    isDelete?: boolean;
    status?: string; // Received: Đã nhận, InProgress: Đang sửa, Completed: Đã xong
    customerId: number;
    address?: string;
    phoneNumber: string;
    fullName: string;
    // customer: Customers;
}
