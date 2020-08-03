import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/offfline/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public notification: AlertService) { }

  ngOnInit(): void {
  }

}