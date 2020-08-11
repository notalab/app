import { Injectable } from '@angular/core';
import { HttpService, APIResponse } from '../../providers/http.service';
import { Notebook } from 'models/core/Notebook';
import { API } from 'app/app.constants';
import { Observable } from 'rxjs';
import { Note } from 'app/models/core/Note';

@Injectable()
export class NotebookService {

    public notebooks: Notebook[] = [];
    public selectedNotebook: number;

    constructor(private http: HttpService) { }

    public createNotebook(notebook: Notebook): Observable<APIResponse<Notebook>> {
        return this.http.post<Notebook>(API.format('app/notebooks'), notebook);
    }

    public getAllNotebooks(): Observable<APIResponse<Notebook[]>> {
        return this.http.get<Notebook[]>(API.format('app/notebooks'));
    }

    public deleteNotebook(id: number): Observable<APIResponse<any>> {
        return this.http.delete<any>(API.format(`app/notebook/${id}`));
    }

    public createNote(note: Note, notebook: Notebook): Observable<APIResponse<Note>> {
        return this.http.post<Note>(API.format('app/notes'), {
            ...note,
            notebook_id: notebook.id
        });
    }

    public updateNote(note: Note): Observable<APIResponse<Note>> {
        return this.http.put(API.format(`app/note/${note.id}`), note);
    }

    public deleteNote(id: number): Observable<APIResponse<any>> {
        return this.http.delete<any>(API.format(`app/note/${id}`));
    }

    public getAllNotes(): Note[] {
        let notes = [];
        for (let notebook of this.notebooks) {
            notebook.notes.forEach(note => {
                note.color = notebook.color;
                notes.push(note);
            });
        }

        return notes;
    }

}
