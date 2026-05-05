import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CreateTollLogRequest, TollLog, TollStatus, VehicleType } from '../../models/toll-log.model';

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css',
})
export class NewEntryComponent implements OnChanges {
  @Input() editingLog: TollLog | null = null;
  /** Incremented by parent after a successful save so the form clears on create (editingLog stays null). */
  @Input() formVersion = 0;
  @Output() submitted = new EventEmitter<CreateTollLogRequest>();
  @Output() cancelled = new EventEmitter<void>();

  readonly vehicleTypes: VehicleType[] = ['Car', 'Truck', 'Motorcycle'];
  readonly statuses: TollStatus[] = ['Paid', 'Pending', 'Violation'];
  readonly entryForm;

  constructor(private readonly fb: FormBuilder) {
    this.entryForm = this.fb.nonNullable.group({
      licensePlate: ['', [Validators.required, Validators.minLength(3)]],
      vehicleType: 'Car' as VehicleType,
      isOfficial: false,
      status: 'Pending' as TollStatus,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formVersion'] && !changes['formVersion'].firstChange) {
      this.patchDefaults();
      return;
    }
    if (!changes['editingLog']) {
      return;
    }
    if (this.editingLog?._id) {
      this.entryForm.patchValue({
        licensePlate: this.editingLog.licensePlate,
        vehicleType: this.editingLog.vehicleType,
        isOfficial: this.editingLog.isOfficial,
        status: this.editingLog.status,
      });
      return;
    }
    if (!changes['editingLog'].firstChange) {
      this.patchDefaults();
    }
  }

  get isEditing(): boolean {
    return !!this.editingLog?._id;
  }

  submitEntry(): void {
    if (this.entryForm.invalid) {
      this.entryForm.markAllAsTouched();
      return;
    }

    const payload: CreateTollLogRequest = {
      licensePlate: this.entryForm.controls.licensePlate.value.trim().toUpperCase(),
      vehicleType: this.entryForm.controls.vehicleType.value,
      isOfficial: this.entryForm.controls.isOfficial.value,
      status: this.entryForm.controls.status.value,
    };

    this.submitted.emit(payload);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  private patchDefaults(): void {
    this.entryForm.patchValue({ licensePlate: '', vehicleType: 'Car', isOfficial: false, status: 'Pending' });
  }
}
