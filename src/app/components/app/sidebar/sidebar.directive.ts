import { Component, OnInit } from '@angular/core';
import { Notebook } from 'app/models/core/Notebook';
import { AuthService } from 'app/components/auth/auth.service';
import * as cl from 'color';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NotebookService } from 'app/components/app/notebook.service';
import { Note } from 'app/models/core/Note';
import { Router } from '@angular/router';

type MenuType = 'generic' | 'settings';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.directive.html'
})
export class SidebarDirectiveComponent implements OnInit {

    public activeMenu: MenuType;
    public newNotebook: Notebook;
    public showNewNotebook = false;
    public newNotebookError = null;
    public newNotebookLoading = false;

    public contextMenuProps = {
        x: 0,
        y: 0,
        show: false
    };
    public contextNotebook: Notebook;

    constructor(public authService: AuthService, public notebookService: NotebookService, private router: Router) {}

    ngOnInit() {
        this.activeMenu = 'generic';

        this.notebookService.getAllNotebooks().subscribe(
            data => {
                this.notebookService.notebooks = data.data;
            }
        );
    }

    public lighten(color: string): string {
        return cl('#' + color).lighten(0.75).hex();
    }

    public initiateNewNotebook(): void {
        this.newNotebook = new Notebook({});

        this.showNewNotebook = true;
    }

    public selectColor(color: string): void {
        this.newNotebook.color = color;
        this.newNotebookError = null;
    }

    public createNotebook(): void {
        this.newNotebookError = null;

        if (!this.newNotebook.name) {
            this.newNotebookError = 'Please enter a notebook title.';
            return;
        }

        if (!this.newNotebook.color) {
            this.newNotebookError = 'Please select a color.';
            return;
        }

        if (this.newNotebook.name.length > 24) {
            this.newNotebookError = 'The notebook name must be 24 characters or less.';
            return;
        }

        this.newNotebookLoading = true;

        this.notebookService.createNotebook(this.newNotebook).subscribe(
            data => {
                this.notebookService.notebooks.push(data.data);
                this.newNotebook = undefined;
                this.showNewNotebook = false;
                this.newNotebookLoading = false;
            }
        );
    }

    public cancelNewNotebook(): void {
        this.showNewNotebook = false;
        this.newNotebook = undefined;
    }

    public toggleMenu(): void {
        this.activeMenu = this.activeMenu === 'generic' ? 'settings' : 'generic';
    }

    public dropNotebook(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.notebookService.notebooks, event.previousIndex, event.currentIndex);
    }

    public showNotebookContext(event: any, notebook: Notebook): void {
        this.contextMenuProps = {
            x: event.pageX,
            y: event.pageY,
            show: true
        };

        this.contextNotebook = notebook;
    }

    public deleteNotebook(notebook: Notebook): void {
        this.notebookService.deleteNotebook(notebook.id).subscribe(
            () => {
                this.notebookService.notebooks.splice(this.notebookService.notebooks.indexOf(notebook), 1);
            }
        );
    }

    public createNote(): void {
        let selected = this.notebookService.selectedNotebook;

        if (selected === undefined) {
            return;
        }

        let note = new Note({
            title: 'Untitled Note',
            content: null,
            ownerUsername: this.authService.user.username,
            created_at: Date.now() / 1000,
            updated_at: Date.now() / 1000,
            id: 'new-note'
        });

        this.notebookService.notebooks[selected].notes.push(note);
        let noteIndex = this.notebookService.notebooks[selected].notes.indexOf(note);

        this.router.navigate(['app/notebook/' + this.notebookService.notebooks[selected].id + '/new-note']);

        this.notebookService.createNote(note, this.notebookService.notebooks[selected]).subscribe(
            data => {
                this.notebookService.notebooks[selected].notes[noteIndex] = data.data;
                this.router.navigate(['app/notebook/' + this.notebookService.notebooks[selected].id + '/' + data.data.id]);
            },
            () => {
                this.notebookService.notebooks[selected].notes.splice(noteIndex, 1);
            }
        );
    }
}
