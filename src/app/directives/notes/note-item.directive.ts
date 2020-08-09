import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'app/models/core/Note';
import { AuthService } from 'app/components/auth/auth.service';
import * as moment from 'moment';

@Component({
    selector: 'note-item',
    templateUrl: './note-item.directive.html'
})
export class NoteItemDirectiveComponent implements OnInit {

    @Input() note: Note;
    @Input() color: string;
    @Input() selected = false;
    public relativeUpdatedTime: string;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 1000);
    }

    public getAuthor(): string {
        if (this.note.ownerUsername === this.authService.user.username) {
            return '@me';
        }

        return `@${this.note.ownerUsername}`;
    }

    public getTime(): void {
        this.relativeUpdatedTime = moment.unix(this.note.updated_at).fromNow();
    }
}
