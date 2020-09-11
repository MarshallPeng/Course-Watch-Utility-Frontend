import {Component, OnInit, ViewChild} from '@angular/core';
import {Alert} from '../../model/alert';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs';
import {CurrentRequestsComponent} from './current-requests/current-requests.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

    @ViewChild(CurrentRequestsComponent)
    private currentRequestsComponent: CurrentRequestsComponent;

    public alerts: Alert[] = [];
    updateTable = false;

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        console.log(this.authService.user$);
    }

    /**
     * Display Alert and call on current requests table to update.
     * @param alert
     */
    pushAlert(alert: Alert) {
        this.alerts.push(alert);
        setTimeout(() => {
            this.alerts.pop();
        }, 5000);

        if (alert.type === 'success') {
            this.updateTable = true;
            console.log('Setting updateTable to True');
            this.currentRequestsComponent.updateTable();
        }
    }

}
