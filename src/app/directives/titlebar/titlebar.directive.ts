import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'environments/environment';

@Component({
    selector: 'titlebar',
    templateUrl: './titlebar.directive.html'
})
export class TitlebarDirectiveComponent implements OnInit {

    public environment = AppConfig;

    ngOnInit() {
    }
}
