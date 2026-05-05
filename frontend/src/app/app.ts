import { Component, OnInit } from '@angular/core';

import { CreateTollLogRequest, TollLog, VehicleType } from './models/toll-log.model';
import { TollLogService } from './services/toll-log.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { RecentTollLogsComponent } from './components/recent-toll-logs/recent-toll-logs.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, NewEntryComponent, RecentTollLogsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  logs: TollLog[] = [];
  filteredLogs: TollLog[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';
  selectedType = 'All';
  editingTarget: TollLog | null = null;
  formVersion = 0;

  readonly vehicleTypes: VehicleType[] = ['Car', 'Truck', 'Motorcycle'];

  constructor(private readonly tollLogService: TollLogService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.tollLogService.getLogs().subscribe({
      next: (logs) => {
        this.logs = logs;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load toll records.';
        this.isLoading = false;
      },
    });
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
    this.errorMessage = '';
    this.applyFilters();
  }

  onVehicleTypeChange(value: string): void {
    this.selectedType = value;
    this.errorMessage = '';
    this.applyFilters();
  }

  onEntrySubmitted(payload: CreateTollLogRequest): void {
    const editingId = this.editingTarget?._id;

    if (editingId) {
      this.tollLogService.updateLog(editingId, payload).subscribe({
        next: (updatedLog) => {
          this.logs = this.logs.map((log) => (log._id === updatedLog._id ? updatedLog : log));
          this.applyFilters();
          this.finishEntrySuccess();
        },
        error: (error) => {
          this.errorMessage = 'Unable to update toll entry.';
        },
      });
      return;
    }

    this.tollLogService.createLog(payload).subscribe({
      next: (newLog) => {
        this.logs = [newLog, ...this.logs];
        this.applyFilters();
        this.finishEntrySuccess();
      },
      error: (error) => {
        // Check if it's a duplicate entry error (409 Conflict)
        if (error.status === 409 && error.error?.isDuplicate) {
          this.errorMessage = error.error?.message || 'This vehicle is already present in the system.';
          alert(this.errorMessage);
        } else {
          this.errorMessage = 'Unable to create new toll entry.';
        }
      },
    });
  }

  startEdit(log: TollLog): void {
    if (!log._id) {
      return;
    }
    this.errorMessage = '';
    this.editingTarget = log;
  }

  cancelEdit(): void {
    this.errorMessage = '';
    this.editingTarget = null;
  }

  removeLog(logId: string): void {
    this.tollLogService.deleteLog(logId).subscribe({
      next: () => {
        this.logs = this.logs.filter((log) => log._id !== logId);
        this.applyFilters();
        if (this.editingTarget?._id === logId) {
          this.editingTarget = null;
        }
      },
      error: () => {
        this.errorMessage = 'Unable to delete toll entry.';
      },
    });
  }

  private applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredLogs = this.logs.filter((log) => {
      const matchesSearch = !search || log.licensePlate.toLowerCase().includes(search);
      const matchesType = this.selectedType === 'All' || log.vehicleType === this.selectedType;
      return matchesSearch && matchesType;
    });
  }

  private finishEntrySuccess(): void {
    this.editingTarget = null;
    this.formVersion++;
  }
}
