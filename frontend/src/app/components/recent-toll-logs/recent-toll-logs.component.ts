import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TollLog, VehicleType } from '../../models/toll-log.model';

@Component({
  selector: 'app-recent-toll-logs',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './recent-toll-logs.component.html',
  styleUrl: './recent-toll-logs.component.css',
})
export class RecentTollLogsComponent {
  @Input() logs: TollLog[] = [];
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Input() searchTerm = '';
  @Input() selectedType = 'All';
  @Input() vehicleTypes: VehicleType[] = [];

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() selectedTypeChange = new EventEmitter<string>();
  @Output() edit = new EventEmitter<TollLog>();
  @Output() deleteId = new EventEmitter<string>();

  readonly loadingSkeletonRows = [0, 1, 2, 3];

  onSearchInput(value: string): void {
    this.searchTermChange.emit(value);
  }

  onTypeSelect(value: string): void {
    this.selectedTypeChange.emit(value);
  }

  onEdit(log: TollLog): void {
    this.edit.emit(log);
  }

  onDelete(log: TollLog): void {
    if (log._id) {
      this.deleteId.emit(log._id);
    }
  }
}
