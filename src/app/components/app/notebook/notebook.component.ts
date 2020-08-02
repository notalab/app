import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'app/models/core/Note';

@Component({
    selector: 'app-notebook',
    templateUrl: './notebook.component.html'
})
export class NotebookComponent implements OnInit {

    public notes: Note[] = [];
    public selectedNote: Note;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                console.log(params);
            }
        );

        this.notes.push(new Note({
            title: 'Title',
            createdAt: 1596363751,
            updatedAt: 1596363751,
            ownerUsername: 'nota',
            tags: [],
            content: null
        }));
    }

    public selectNote(note: Note): void {
        this.selectedNote = note;
    }

}
