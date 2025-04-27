import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUtilityService {

  constructor() { }

  /**
   * Formats a file size in bytes to a human-readable format
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Validates if a file is a PDF based on its MIME type
   */
  isPdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  /**
   * Extracts the extension from a filename
   */
  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }

  /**
   * In a real app, this would parse the PDF to get the number of pages
   * For now, we'll simulate it with a random number
   */
  async extractPdfPageCount(file: File): Promise<number> {
    // In a real implementation, you would use a PDF.js or similar library
    // to extract the actual page count from the PDF file

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // For demo purposes, return a random number between 1 and 30
    return Math.floor(Math.random() * 30) + 1;
  }

  /**
   * Generate a thumbnail preview URL for a PDF
   * In a real app, this would generate an actual thumbnail
   */
  async generatePdfThumbnail(file: File): Promise<string> {
    // In a real implementation, you would use PDF.js to render the first page
    // as a canvas and convert that to a data URL

    // For now, return a placeholder image
    return '/assets/pdf-placeholder.png';
  }
}