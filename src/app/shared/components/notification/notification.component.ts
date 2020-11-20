import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/core/services/offline/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public notification: AlertService) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('trying to remove notification!');
      this.notification.removeFirst();
    }, 5000);
  }
}