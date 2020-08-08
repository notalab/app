import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'app/models/core/Note';

@Component({
    selector: 'editor',
    templateUrl: './editor.directive.html'
})
export class EditorDirectiveComponent implements OnInit {

    @Input() note: Note;
    @Output() titleChange = new EventEmitter<string>();
    public titleStore: string;
    private lastTitle: string;

    ngOnInit() {
        this.titleStore = this.note ? this.note.title : null;

        setInterval(() => {
            if (this.lastTitle !== this.titleStore) {
                this.titleChange.emit(this.titleStore);
                this.lastTitle = this.titleStore;
                return;
            }
        }, 500);
    }
}
