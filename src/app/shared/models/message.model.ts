export interface Message {
    messageId: number;
    senderId: number;
    receiverId: number;
    content: string;
    sentAt: Date;
    isRead: boolean;
  }
