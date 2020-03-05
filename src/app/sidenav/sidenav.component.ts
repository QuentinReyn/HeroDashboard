import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

/** @title Responsive sidenav */
@Component({
    selector: 'app-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.scss']
})
export class SidenavComponent {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public snackBar: MatSnackBar) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
