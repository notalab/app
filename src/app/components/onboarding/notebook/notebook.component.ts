import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/components/auth/auth.service';
import { Router } from '@angular/router';
import { Notebook } from 'app/models/core/Notebook';
import { NotebookService } from 'app/components/app/notebook.service';
import * as cl from 'color';

type Step = 'notebook' | 'color' | 'finish';

@Component({
    templateUrl: './notebook.component.html'
})
export class OnboardingNotebookComponent implements OnInit {

    public notebook: Notebook = {
        id: 0,
        name: null,
        color: null,
        notes: []
    };
    public step: Step = 'notebook';
    public notebookLoading = false;

    public errors = {
        notebook: null
    };
    public notebookTitle: string;

    constructor(public authService: AuthService, private router: Router, private notebookService: NotebookService) { }

    ngOnInit() {
    }

    public createNotebook(): void {
        this.errors.notebook = null;

        if (!this.notebookTitle) {
            this.errors.notebook = 'Please enter a notebook title.';
            return;
        }
        if (this.notebookTitle.length > 24) {
            this.errors.notebook = 'The title must be under 24 characters.';
            return;
        }

        if (this.errors.notebook) { return; }

        this.notebook.name = this.notebookTitle;
        this.step = 'color';
    }

    public setColor(): void {
        if (!this.notebook.color) {
            this.errors.notebook = 'Please select a color.';
            return;
        }

        this.step = 'finish';
    }

    public selectColor(color: string): void {
        this.errors.notebook = null;
        this.notebook.color = color;
    }

    public lighten(color: string): string {
        return cl('#' + color).lighten(0.75).hex();
    }

    public finish(): void {
        this.notebookLoading = true;

        this.notebookService.createNotebook(this.notebook).subscribe(
            data => {
                this.notebookService.notebooks.push(data.data);
                this.notebook = undefined;
                this.notebookLoading = false;
                this.router.navigate(['app/inbox']);
            }
        );
    }

}
