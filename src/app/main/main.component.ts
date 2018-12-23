import { Component, OnInit } from '@angular/core';
import { Alert } from '../../model/alert';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public alerts: Alert[] = [];
  updateTable: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  pushAlert(alert: Alert) {
    this.alerts.push(alert);
    setTimeout(() => { this.alerts.pop() }, 5000);

    if (alert.type == "success"){
      this.updateTable = true;
      console.log("Setting updateTable to True");
    }
  }

}
