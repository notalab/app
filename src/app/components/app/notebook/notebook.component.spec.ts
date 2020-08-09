import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks, flush, flushMicrotasks } from '@angular/core/testing';

import { NotebookComponent } from './notebook.component';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';
import { Notebook } from 'app/models/core/Notebook';
import { NotebookService } from 'app/components/app/notebook.service';
import { of, Observable } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Note } from 'app/models/core/Note';
import { APIResponse } from 'app/providers/http.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

describe('NotebookComponent', () => {
    let component: NotebookComponent;
    let fixture: ComponentFixture<NotebookComponent>;
    let service: MockNotebookService;
    let debug: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [ MOCK_AUTH_PROVIDER, {provide: NotebookService, useClass: MockNotebookService}, {provide: ActivatedRoute, useValue: {params: of({id: 1})}} ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotebookComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(NotebookService);
        debug = fixture.debugElement;

        fixture.detectChanges();

        component.notebook.notes = [
            new Note({
                title: 'Title',
                created_at: Date.now() / 1000,
                updated_at: Date.now() / 1000,
                ownerUsername: 'nota',
                tags: [],
                content: null
            })
        ];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select a note when a note is clicked', fakeAsync(() => {
        spyOn(component, 'selectNote').and.callThrough();
        fixture.detectChanges();
        selectNote();
        tick();

        expect(component.selectNote).toHaveBeenCalled();
        expect(component.selectedNote).toBeTruthy();

        clearTimers();
    }));

    it('should set the selectedNotebook', () => {
        expect(service.selectedNotebook).not.toBeUndefined();
    });

    it('should update the title after .5s', fakeAsync(() => {
        selectNote();

        let el = debug.query(By.css('#editor-title')).nativeElement;

        setInputValue('#editor-title', 'someTitle');
        expect(el.value).toBe('someTitle');

        setTimeout(() => {
            expect(component.selectedNote.title).toBe('someTitle');
            expect(component.notebook.notes[0].title).toBe('someTitle');
        }, 500 + 1);

        clearTimers();
    }));

    it('should update the content after 2s', fakeAsync(() => {
        selectNote();

        let el = debug.query(By.css('#editor-content')).nativeElement;

        setInputValue('#editor-content', '<p>test</p>');
        expect(el.value).toBe('<p>test</p>');

        clearTimers();
    }));

    function selectNote(): void {
        debug.query(By.css('#note-Title')).nativeElement.click();
        fixture.detectChanges();
    }

    function clearTimers(): void {
        flush();
        discardPeriodicTasks();
    }

    function setInputValue(selector: string, value: string): void {
        fixture.detectChanges();
        tick();

        let input = fixture.debugElement.query(By.css(selector)).nativeElement;
        input.value = value;
        input.dispatchEvent(new Event('input'));
        tick();
    }
});

class MockNotebookService {

    public notebooks: Notebook[] = [
        {
            id: 1,
            name: 'Test',
            color: 'FFFFFF',
            notes: []
        }
    ];
    public selectedNotebook: number;

    public updateNote(note: Note): Observable<APIResponse<Note>> {
        return of({
            data: note,
            status: 200
        });
    }

}
