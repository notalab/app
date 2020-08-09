import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'app/models/core/Note';

@Component({
    selector: 'editor',
    templateUrl: './editor.directive.html'
})
export class EditorDirectiveComponent implements OnInit {

    @Input() note: Note;
    @Output() stateChange = new EventEmitter<any>();
    public titleStore: string;
    public contentStore: string;
    private lastContent: string;
    private lastTitle: string;

    ngOnInit() {
        this.titleStore = this.note ? this.note.title : null;
        this.lastTitle = this.titleStore;
        this.contentStore = this.note ? this.note.content : null;
        this.lastContent = this.contentStore;

        setInterval(() => {
            if (this.lastTitle !== this.titleStore) {
                this.emitState();
                this.lastTitle = this.titleStore;
            }
        }, 500);

        setInterval(() => {
            if (this.lastContent !== this.contentStore) {
                this.emitState();
                this.lastContent = this.contentStore;
            }
        }, 2000);
    }

    private emitState(): void {
        this.stateChange.emit({
            title: this.titleStore,
            content: this.contentStore
        });
    }
}
