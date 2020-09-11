import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {APIService} from '../../service/api-service';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {LoaderService} from '../../service/loader.service';
import {LoaderState} from '../../../common/loader';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Alert} from '../../../model/alert';

@Component({
    selector: 'app-new-requests',
    templateUrl: './new-requests.component.html',
    styleUrls: ['./new-requests.component.css']
})
export class NewRequestsComponent implements OnInit {

    @Output() onFinishRequest = new EventEmitter();

    show: boolean = false;
    private subscription: Subscription;

    requestForm = new FormGroup({
        subj: new FormControl(''),
        number: new FormControl(''),
        prof: new FormControl(''),
        period: new FormControl(''),
        email: new FormControl(''),
    });

    constructor(private apiService: APIService, private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }


    /**
     * emit alert object to MainComponent so that Alert can be added to page
     */
    sendAlert(data) {
        this.onFinishRequest.emit(new Alert(data['message'], data['type']));
    }

}
