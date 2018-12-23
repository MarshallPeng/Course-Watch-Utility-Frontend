import { Component, OnInit, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CourseRequest } from '../../../model/CourseRequest';
import { LoaderState } from '../../../common/loader';
import { LoaderService } from '../../service/loader.service';
import { APIService } from '../../service/api-service';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-current-requests',
  templateUrl: './current-requests.component.html',
  styleUrls: ['./current-requests.component.css']
})
export class CurrentRequestsComponent implements OnChanges {

  // Array of courses to feed into datagrid
  courses: CourseRequest[] = [];

  // Variables to handle updating of table after successful request.
  @Input() onSuccessRequest: boolean = false;
  @ViewChild('table') requestTable: ElementRef;
  updatingTable: boolean = false;

  // Variables for Loader
  show: boolean = false;
  private subscription: Subscription;

  /**
  * Get current requests when paeg loads, and subscribe to loaderservice so that
  * the spinner shows when making HTTP requests.
  */
  constructor(private apiService: APIService, private loaderService: LoaderService) {

    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });

    this.apiService.get_current_requests().subscribe(
      (data: HttpResponse<Object>) => {
        for (var i = 0; i < data['result'].length; i++) {
          this.courses[i] = this.jsonToRequest(JSON.parse(data['result'][i]))
          console.log(this.courses[i]);
        }
      },
    );
  }

  /**
  * When receive success repsonse from backend, from NewRequestsComponent,
  * Make another request to update the table to reflect the new requests
  * TODO: Come up with a better fix for the table display. See note below.
  */
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.onSuccessRequest.currentValue == true) {

      this.updatingTable = true;
      this.apiService.get_current_requests().subscribe(
        (data: HttpResponse<Object>) => {
          for (var i = 0; i < data['result'].length; i++) {
            this.courses[i] = this.jsonToRequest(JSON.parse(data['result'][i]));
          }
          this.updatingTable = false;
        }, );

      this.onSuccessRequest = false;
    }
  }

  // This is really fucking stupid. How do you turn a json into an object neatly?
  private jsonToRequest(json: JSON) {
    var request = new CourseRequest();
    request.email = json['email'];
    request.id = json['id'];
    request.number = json['number'];
    request.period = json['period'];
    request.subj = json['subj'];
    request.prof = json['prof'];

    return request
  }

}



// This is the hackiest fix ever.
// The bug was that adding a new request to the courses list would not only add the new request to the datagrid,
// but the entire existing list as well, so the size of what was shown would double + 1 each time.
// I needed to somehow reinitialize the table without looking weird
// so I ngIf'd the table, hide it while updating but show a copy of the table, then reshow the real table.
// There's definitely a much more elegant way of fixing this, but it looks fine on the frontend.
