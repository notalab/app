import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotebookComponent } from './notebook.component';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';
import { Notebook } from 'app/models/core/Notebook';
import { NotebookService } from 'app/components/app/notebook.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Note } from 'app/models/core/Note';

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select a note when a note is clicked', fakeAsync(() => {
        spyOn(component, 'selectNote').and.callThrough();
        fixture.detectChanges();
        debug.query(By.css('#note-Title')).nativeElement.click();
        tick();
        expect(component.selectNote).toHaveBeenCalled();
        expect(component.selectedNote).toBeTruthy();
    }));

    it('should set the selectedNotebook', () => {
        expect(service.selectedNotebook).not.toBeUndefined();
    });
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

}
