import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'app/models/core/Note';

@Component({
    selector: 'editor',
    templateUrl: './editor.directive.html'
})
export class EditorDirectiveComponent implements OnInit {

    @Input() note: Note;

    ngOnInit() {
    }
}
