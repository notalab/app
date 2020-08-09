import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Note } from 'app/models/core/Note';
import { QuillEditor } from 'ngx-quill';

@Component({
    selector: 'editor',
    templateUrl: './editor.directive.html'
})
export class EditorDirectiveComponent implements OnInit, OnChanges {

    @Input() note: Note;
    @Output() stateChange = new EventEmitter<any>();
    public titleStore: string;
    public contentStore: string;
    private editor: QuillEditor;
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

        if (this.editor) {
            this.editor.focus();
        }
    }

    public initializeEditor(event: QuillEditor): void {
        this.editor = event;
        this.editor.focus();
    }

    private emitState(): void {
        this.stateChange.emit({
            title: this.titleStore,
            content: this.contentStore
        });
    }
}
