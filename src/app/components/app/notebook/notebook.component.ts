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
    public selectedNoteColor: string;

    constructor(private route: ActivatedRoute, public notebookService: NotebookService) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                this.notebook = this.notebookService.notebooks.find((notebook: Notebook) => notebook.id === Number(params.id));
                this.notebookService.selectedNotebook = this.notebookService.notebooks.indexOf(this.notebook);

                if (params.noteid) {
                    let note = this.notebook.notes.find(a => a.id === Number(params.noteid));
                    this.selectNote(note);
                }
            }
        );
    }

    public get notes(): Note[] {
        return this.notebook.notes.concat().sort((a: Note, b: Note) => b.updated_at - a.updated_at);
    }

    public selectNote(note: Note): void {
        this.selectedNote = note;
        this.selectedNoteColor = this.notebook.color;
    }

    private deselectNote(): void {
        this.selectedNote = undefined;
        this.selectedNoteColor = undefined;
    }

    public noteStateChange(event: any) {
        let note = this.notebook.notes.findIndex(x => x.id === this.selectedNote.id);
        this.selectedNote = {
            ...this.selectedNote,
            title: event.title,
            content: event.content
        };

        this.notebookService.updateNote(this.selectedNote).subscribe(
            data => {
                this.notebook.notes[note] = data.data;
            }
        );
    }

    public deleteNote(note: Note): void {
        let index = this.notebook.notes.indexOf(note);
        this.notebook.notes.splice(index, 1);
        this.deselectNote();
        this.notebookService.deleteNote(note.id).subscribe(
            () => {},
            () => {
                this.notebook.notes.push(note); // delete failed, push back to array
            }
        );
    }

}
