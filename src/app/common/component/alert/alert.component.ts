import { Component, OnInit, Input } from '@angular/core';
import { Alert } from '../../../../model/alert';

@Component({
  selector: 'cw-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() alertContent: Alert;

  constructor() {
  }

  ngOnInit() {
  }

  onClose(){
    console.log("Alert closed");
  }
}
