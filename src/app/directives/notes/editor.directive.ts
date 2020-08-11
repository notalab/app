import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Note } from 'app/models/core/Note';
import { QuillEditor } from 'ngx-quill';
import { NotebookService } from 'app/components/app/notebook.service';
import { Notebook } from 'app/models/core/Notebook';

@Component({
    selector: 'editor',
    templateUrl: './editor.directive.html'
})
export class EditorDirectiveComponent implements OnInit, OnChanges {

    @Input() note: Note;
    @Input() color: string;
    @Output() stateChange = new EventEmitter<any>();
    @Output() delete = new EventEmitter<Note>();
    public titleStore: string;
    public contentStore: string;
    public editor: QuillEditor;
    private lastContent: string;
    private lastTitle: string;

    constructor(private notebookService: NotebookService) {}

    ngOnInit() {
        setInterval(() => {
            if (this.lastTitle !== this.titleStore) {
                this.updateNote();
                this.lastTitle = this.titleStore;
            }
        }, 500);

        setInterval(() => {
            if (this.lastContent !== this.contentStore) {
                this.updateNote();
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

    private updateNote(): void {
        this.note = {
            ...this.note,
            title: this.titleStore,
            content: this.contentStore
        };

        this.notebookService.updateNote(this.note).subscribe(
            data => {
                this.note = data.data;
                this.stateChange.emit(this.note);
            }
        );
    }

    public deleteNote(): void {
        let notebookIndex = this.notebookService.notebooks.findIndex(n => n.notes.find(note => note.id === this.note.id));
        let noteIndex = this.notebookService.notebooks[notebookIndex].notes.indexOf(this.note);

        this.notebookService.notebooks[notebookIndex].notes.splice(noteIndex, 1);
        this.delete.emit();
        this.notebookService.deleteNote(this.note.id).subscribe(
            () => {},
            () => {
                this.notebookService.notebooks[notebookIndex].notes.push(this.note);
            }
        );
    }
}
