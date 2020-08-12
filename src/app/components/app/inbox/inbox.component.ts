import { Component, OnInit } from '@angular/core';
import { NotebookService } from 'app/components/app/notebook.service';
import { Note } from 'app/models/core/Note';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {

    constructor(public notebookService: NotebookService) { }

    ngOnInit() {
        this.notebookService.selectedNotebook = undefined;
    }

    public get notes(): Note[] {
        return this.notebookService.getAllNotes().concat().sort((a: Note, b: Note) => b.updated_at - a.updated_at);
    }

    public selectNote(note: Note): void {
        this.notebookService.selectedNote = note;
    }

}
