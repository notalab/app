import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-notebook',
    templateUrl: './notebook.component.html'
})
export class NotebookComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                console.log(params);
            }
        );
    }

}
