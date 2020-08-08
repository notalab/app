import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'app/models/core/Note';
import { Notebook } from 'app/models/core/Notebook';
import { NotebookService } from 'app/components/app/notebook.service';

@Component({
    selector: 'app-notebook',
    templateUrl: './notebook.component.html'
})
export class NotebookComponent implements OnInit {

    public notebook: Notebook;
    public selectedNote: Note;

    constructor(private route: ActivatedRoute, private notebookService: NotebookService) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                this.notebook = this.notebookService.notebooks.find((notebook: Notebook) => notebook.id === Number(params.id));
                this.notebookService.selectedNotebook = this.notebookService.notebooks.indexOf(this.notebook);
            }
        );

        // tests
        this.notebook.notes.push(new Note({
            title: 'Title',
            createdAt: 1596363751,
            updatedAt: 1596363751,
            ownerUsername: 'nota',
            tags: [],
            content: null
        }));
    }

    public get notes(): Note[] {
        return this.notebook.notes.sort((a: Note, b: Note) => b.updatedAt - a.updatedAt);
    }

    public selectNote(note: Note): void {
        this.selectedNote = note;
    }

    public titleChange(event: string) {
        this.selectedNote.title = event;
    }

}
