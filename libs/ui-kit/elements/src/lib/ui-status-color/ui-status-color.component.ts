import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

/*
 * @deprecated
 * */
export enum StatusesId {
    Active = 1,
    Pending = 2,
    Testing = 2,
    InProgress = 2,
    Inactive = 3,
    Completed = 3,
    Failed = 4
}

/*
 * @deprecated
 * */
export enum StatusesName {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending',
    InProgress = 'in_progress',
    Testing = 'testing',
    Completed = 'completed',
    Failed = 'failed',
    Available = 'available',
    Approved = 'approved',
    RequireApproval = 'require_approval',
    RequestSent = 'request_sent',
    RequestRejected = 'request_rejected',
    Rejected = 'rejected'
}

@Component({
    selector: 'ui-status-color',
    templateUrl: './ui-status-color.component.html',
    styleUrls: ['./ui-status-color.component.css']
})
/*
 * @deprecated
 * */
export class UiStatusColorComponent implements OnInit, OnChanges {
    @Input() status: string | number;

    @Input() className: string;

    @Input() showLabel = false;

    public statusLabel = 'status';

    ngOnInit(): void {
        this.setStatus();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { status } = changes;

        if (status && status.currentValue) {
            this.setStatus();
        }
    }

    private setStatus(): void {
        if (typeof this.status === 'number') {
            switch (this.status) {
                case StatusesId.Active:
                    this.statusLabel = StatusesName.Active;
                    break;
                case StatusesId.Pending:
                    this.statusLabel = StatusesName.Pending;
                    break;
                case StatusesId.InProgress:
                    this.statusLabel = StatusesName.InProgress;
                    break;
                case StatusesId.Testing:
                    this.statusLabel = StatusesName.Testing;
                    break;
                case StatusesId.Inactive:
                    this.statusLabel = StatusesName.Inactive;
                    break;
                case StatusesId.Completed:
                    this.statusLabel = StatusesName.Completed;
                    break;
                case StatusesId.Failed:
                    this.statusLabel = StatusesName.Failed;
                    break;
                default:
                    break;
            }
        }

        if (typeof this.status === 'string') {
            switch (this.status) {
                case StatusesName.Active:
                    this.statusLabel = StatusesName.Active;
                    break;
                case StatusesName.Available:
                    this.statusLabel = StatusesName.Available;
                    break;
                case StatusesName.Approved:
                    this.statusLabel = StatusesName.Approved;
                    break;
                case StatusesName.Pending:
                    this.statusLabel = StatusesName.Pending;
                    break;
                case StatusesName.InProgress:
                    this.statusLabel = StatusesName.InProgress;
                    break;
                case StatusesName.RequireApproval:
                    this.statusLabel = StatusesName.RequireApproval;
                    break;
                case StatusesName.Testing:
                    this.statusLabel = StatusesName.Testing;
                    break;
                case StatusesName.Inactive:
                    this.statusLabel = StatusesName.Inactive;
                    break;
                case StatusesName.Rejected:
                    this.statusLabel = StatusesName.Rejected;
                    break;
                case StatusesName.Completed:
                    this.statusLabel = StatusesName.Completed;
                    break;
                case StatusesName.Failed:
                    this.statusLabel = StatusesName.Failed;
                    break;
                case StatusesName.RequestSent:
                    this.statusLabel = StatusesName.RequestSent;
                    break;
                default:
                    break;
            }
        }
    }
}
