import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Note } from 'app/models/core/Note';
import { QuillEditor } from 'ngx-quill';

@Component({
    selector: 'editor',
    templateUrl: './editor.directive.html'
})
export class EditorDirectiveComponent implements OnInit, OnChanges {

    @Input() note: Note;
    @Input() color: string;
    @Output() stateChange = new EventEmitter<any>();
    public titleStore: string;
    public contentStore: string;
    public editor: QuillEditor;
    private lastContent: string;
    private lastTitle: string;

    ngOnInit() {
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

    ngOnChanges() {
        this.titleStore = this.note ? this.note.title : null;
        this.lastTitle = this.titleStore;
        this.contentStore = this.note ? this.note.content : null;
        this.lastContent = this.contentStore;
    }

    public focusEditor(): void {
        if (this.editor) {
            this.editor.focus();
        }
    }

    private emitState(): void {
        this.stateChange.emit({
            title: this.titleStore,
            content: this.contentStore
        });
    }
}
