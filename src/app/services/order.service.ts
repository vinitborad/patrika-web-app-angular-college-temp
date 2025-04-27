import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface PdfFile {
  id: string;
  name: string;
  size: number;
  lastModified: number;
  pages: number;
  color?: boolean;
  doubleSided?: boolean;
  previewUrl?: string;
}

export interface PrintOptions {
  copies: number;
  color: boolean;
  doubleSided: boolean;
  pageRange?: string;
}

export interface Order {
  id: string;
  createdAt: Date;
  status: 'Pending' | 'Printing' | 'Completed' | 'Cancelled';
  totalPages: number;
  totalCost: number;
  files: PdfFile[];
  printOptions: PrintOptions;
  otp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private uploadedFilesSubject = new BehaviorSubject<PdfFile[]>([]);
  public uploadedFiles$ = this.uploadedFilesSubject.asObservable();

  // Mock active orders for demo purposes
  private activeOrdersSubject = new BehaviorSubject<Order[]>([
    {
      id: '1234567890',
      createdAt: new Date(),
      status: 'Pending',
      totalPages: 15,
      totalCost: 45.00,
      files: [
        {
          id: 'file1',
          name: 'document1.pdf',
          size: 1024 * 1024 * 2, // 2MB
          lastModified: Date.now(),
          pages: 10,
          color: false,
          doubleSided: true
        },
        {
          id: 'file2',
          name: 'presentation.pdf',
          size: 1024 * 1024 * 3, // 3MB
          lastModified: Date.now(),
          pages: 5,
          color: true,
          doubleSided: false
        }
      ],
      printOptions: {
        copies: 1,
        color: false,
        doubleSided: true
      },
      otp: '123456'
    },
    {
      id: '0987654321',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      status: 'Printing',
      totalPages: 8,
      totalCost: 24.00,
      files: [
        {
          id: 'file3',
          name: 'report.pdf',
          size: 1024 * 1024 * 1.5, // 1.5MB
          lastModified: Date.now() - 86400000,
          pages: 8,
          color: false,
          doubleSided: false
        }
      ],
      printOptions: {
        copies: 3,
        color: false,
        doubleSided: false
      },
      otp: '654321'
    }
  ]);
  public activeOrders$ = this.activeOrdersSubject.asObservable();

  constructor() { }

  addFile(file: PdfFile): void {
    const currentFiles = this.uploadedFilesSubject.value;
    this.uploadedFilesSubject.next([...currentFiles, file]);
  }

  removeFile(id: string): void {
    const currentFiles = this.uploadedFilesSubject.value;
    this.uploadedFilesSubject.next(currentFiles.filter(file => file.id !== id));
  }

  clearFiles(): void {
    this.uploadedFilesSubject.next([]);
  }

  getActiveOrders(): Observable<Order[]> {
    return this.activeOrders$;
  }

  getOrderDetails(id: string): Observable<Order | null> {
    const order = this.activeOrdersSubject.value.find(order => order.id === id);
    return of(order || null).pipe(delay(800)); // Simulate API delay
  }

  createOrder(files: PdfFile[], printOptions: PrintOptions): Observable<Order> {
    // Calculate total pages and cost
    const totalPages = files.reduce((sum, file) => sum + file.pages, 0) * printOptions.copies;
    const basePrice = 3; // Price per page
    let totalCost = totalPages * basePrice;

    if (printOptions.color) {
      totalCost *= 2; // Color printing costs double
    }

    // Generate a new order
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      createdAt: new Date(),
      status: 'Pending',
      totalPages,
      totalCost,
      files,
      printOptions,
      otp: Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
    };

    // Add to active orders
    const currentOrders = this.activeOrdersSubject.value;
    this.activeOrdersSubject.next([newOrder, ...currentOrders]);

    // Clear uploaded files
    this.clearFiles();

    return of(newOrder).pipe(delay(1500)); // Simulate API delay
  }

  cancelOrder(id: string): Observable<boolean> {
    const currentOrders = this.activeOrdersSubject.value;
    const orderIndex = currentOrders.findIndex(order => order.id === id);

    if (orderIndex === -1) {
      return of(false);
    }

    // Update the order status to cancelled
    const updatedOrders = [...currentOrders];
    updatedOrders[orderIndex] = {
      ...updatedOrders[orderIndex],
      status: 'Cancelled'
    };

    this.activeOrdersSubject.next(updatedOrders);
    return of(true).pipe(delay(1000)); // Simulate API delay
  }
}