import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from '../../../components/top-bar/top-bar.component';
import { OrderService, PdfFile, PrintOptions } from '../../../services/order.service';
import { NotificationService } from '../../../services/notification.service';
import { FileUtilityService } from '../../../services/file-utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TopBarComponent],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, OnDestroy {
  pdfFiles: PdfFile[] = [];
  isAdvanceOptionsOpen = false;
  isPaying = false;
  totalCost = 0;
  private filesSubscription: Subscription | null = null;

  // Order options
  printOptions: PrintOptions = {
    copies: 1,
    color: false,
    doubleSided: false,
    pageRange: '',
  };

  constructor(
    private orderService: OrderService,
    private router: Router,
    private notificationService: NotificationService,
    private fileUtilityService: FileUtilityService
  ) { }

  ngOnInit(): void {
    this.filesSubscription = this.orderService.uploadedFiles$.subscribe(files => {
      this.pdfFiles = files;
      this.calculateCost();
    });
  }

  ngOnDestroy(): void {
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe();
    }
  }

  async onFileSelected(event: any): Promise<void> {
    const files = event.target.files;
    if (files && files.length > 0) {
      let addedCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.fileUtilityService.isPdfFile(file)) {
          try {
            // Get page count from PDF
            const pageCount = await this.fileUtilityService.extractPdfPageCount(file);

            // Generate thumbnail (in a real app)
            const previewUrl = await this.fileUtilityService.generatePdfThumbnail(file);

            const newFile: PdfFile = {
              id: crypto.randomUUID(),
              name: file.name,
              size: file.size,
              lastModified: file.lastModified,
              pages: pageCount,
              color: this.printOptions.color,
              doubleSided: this.printOptions.doubleSided,
              previewUrl
            };

            this.orderService.addFile(newFile);
            addedCount++;

          } catch (error) {
            console.error('Error processing PDF file:', error);
            this.notificationService.error(`Failed to process file ${file.name}`);
          }
        } else {
          this.notificationService.warning(`${file.name} is not a valid PDF file.`);
        }
      }

      if (addedCount > 0) {
        this.notificationService.success(`Added ${addedCount} file(s) to your order.`);
      }

      // Clear the input to allow selecting the same file again
      event.target.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    return this.fileUtilityService.formatFileSize(bytes);
  }

  removePdf(id: string): void {
    this.orderService.removeFile(id);
    this.notificationService.info('File removed from order.');
  }

  toggleAdvanceOptions(): void {
    this.isAdvanceOptionsOpen = !this.isAdvanceOptionsOpen;
  }

  initiatePayment(): void {
    if (this.pdfFiles.length === 0) {
      this.notificationService.warning('Please add at least one PDF file to create an order.');
      return;
    }

    this.isPaying = true;

    // Create the order using the service
    this.orderService.createOrder(this.pdfFiles, this.printOptions)
      .subscribe({
        next: (createdOrder) => {
          this.isPaying = false;
          this.notificationService.success('Order created successfully!');
          // Navigate to order details page
          this.router.navigate(['/order-details', createdOrder.id]);
        },
        error: (error) => {
          this.isPaying = false;
          console.error('Error creating order:', error);
          this.notificationService.error('There was an error processing your order. Please try again.');
        }
      });
  }

  calculateCost(): void {
    // Simple cost calculation - in a real app this would be more complex
    const basePrice = 3; // per page
    let total = 0;

    this.pdfFiles.forEach(file => {
      if (file.pages) {
        let cost = file.pages * basePrice;
        if (this.printOptions.color) {
          cost *= 2; // Color printing costs double
        }
        cost *= this.printOptions.copies;
        total += cost;
      }
    });

    this.totalCost = total;
  }

  updateOptions(): void {
    // Update color and double-sided options for all files
    this.pdfFiles.forEach(file => {
      file.color = this.printOptions.color;
      file.doubleSided = this.printOptions.doubleSided;
    });
    this.calculateCost();
  }
}