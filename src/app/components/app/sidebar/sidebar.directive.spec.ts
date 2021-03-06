import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SidebarDirectiveComponent } from './sidebar.directive';
import { AppModule } from 'app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Notebook } from 'app/models/core/Notebook';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';
import { Observable, of } from 'rxjs';
import { APIResponse } from 'app/providers/http.service';
import { NotebookService } from 'app/components/app/notebook.service';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'app/components/app/main-routing.module';
import { Note } from 'app/models/core/Note';

describe('SidebarDirectiveComponent', () => {
    let component: SidebarDirectiveComponent;
    let fixture: ComponentFixture<SidebarDirectiveComponent>;
    let debug: DebugElement;
    let service: MockNotebookService;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule, RouterTestingModule.withRoutes(routes) ],
            providers: [ MOCK_AUTH_PROVIDER, {provide: NotebookService, useClass: MockNotebookService} ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarDirectiveComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement;
        service = TestBed.inject(NotebookService);
        location = TestBed.inject(Location);
        fixture.detectChanges();
    });

    it('should go to settings menu when clicked', () => {
        fixture.ngZone.run(() => {
            spyOn(component, 'toggleMenu').and.callThrough();
            debug.query(By.css('#toggle-settings')).nativeElement.click();
            expect(component.toggleMenu).toHaveBeenCalled();
            expect(component.activeMenu).toBe('settings');
        });
    });

    it('should go to generic menu when on settings menu', () => {
        fixture.ngZone.run(() => {
            component.toggleMenu();
            fixture.detectChanges();
            spyOn(component, 'toggleMenu').and.callThrough();
            debug.query(By.css('#toggle-generic')).nativeElement.click();
            expect(component.toggleMenu).toHaveBeenCalled();
            expect(component.activeMenu).toBe('generic');
        });
    });

    it('should create a new notebook and push it to the notebooks array', () => {
        component.newNotebook = new Notebook({
            title: 'Notebook Title',
            color: '00FF31',
            notes: []
        });

        component.createNotebook();
        expect(service.notebooks.length).toEqual(1);
    });

    it('should open create notebook modal with new object when button is clicked', () => {
        spyOn(component, 'initiateNewNotebook').and.callThrough();
        debug.query(By.css('#create-notebook')).nativeElement.click();
        expect(component.initiateNewNotebook).toHaveBeenCalled();
        expect(component.newNotebook).not.toBeUndefined();
        expect(component.showNewNotebook).toBeTruthy();
    });

    it('should produce errors when the title is null for a new notebook', () => {
        component.initiateNewNotebook();
        component.createNotebook();
        expect(component.newNotebookError).toBeTruthy();
        expect(service.notebooks.length).toEqual(1);
    });

    it('should produce an error when no color is selected for a new notebook', () => {
        component.initiateNewNotebook();
        component.newNotebook.name = 'Test';
        component.createNotebook();
        expect(component.newNotebookError).toBeTruthy();
        expect(service.notebooks.length).toEqual(1);
    });

    it('should produce an error if the new notebook name is > 24 characters', () => {
        component.initiateNewNotebook();
        component.newNotebook.name = '123456789012345678901234567689';
        component.createNotebook();
        expect(component.newNotebookError).toBeTruthy();
        expect(service.notebooks.length).toEqual(1);
    });

    it('should delete a specific notebook by id', () => {
        service.notebooks = [];
        let notebook = new Notebook({
            id: 1,
        });

        service.notebooks.push(notebook);
        component.deleteNotebook(notebook);
        expect(service.notebooks.length).toEqual(0);
    });

    // it('should go to notebook route when clicked', fakeAsync(() => {
    //     fixture.ngZone.run(() => {
    //         let notebook = new Notebook({
    //             id: 1,
    //         });

    //         service.notebooks.push(notebook);

    //         debug.query(By.css('#notebook-1')).nativeElement.click();
    //         tick();
    //         expect(location.path()).toBe('/app/notebook/1');
    //     });
    // }));

    it('should create a new note', () => {
        service.notebooks = [new Notebook({
            title: 'Notebook Title',
            color: '00FF31',
            notes: []
        })];
        service.selectedNotebook = 0;

        component.createNote();
        expect(service.notebooks[0].notes.length).toBe(1);
    });
});

class MockNotebookService {

    public notebooks: Notebook[] = [];
    public selectedNotebook: number;

    public createNotebook(form: any): Observable<APIResponse<Notebook>> {
        let notebook = new Notebook({
            name: form.name,
            color: form.color
        });

        return of({
            data: notebook,
            status: 200
        });
    }

    public getAllNotebooks(): Observable<APIResponse<Notebook[]>> {
        return of({
            data: [
                {
                    id: 1,
                    name: 'Test',
                    color: 'FFFFFF',
                    notes: []
                }
            ],
            status: 200
        });
    }

    public deleteNotebook(id: number): Observable<APIResponse<any>> {
        return of({
            data: 200,
            status: 200
        });
    }

    public createNote(note: Note, notebook: Notebook): Observable<APIResponse<Note>> {
        return of({
            data: new Note({}),
            status: 200
        });
    }

}
