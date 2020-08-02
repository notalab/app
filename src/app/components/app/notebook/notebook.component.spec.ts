import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookComponent } from './notebook.component';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';
import { Notebook } from 'app/models/core/Notebook';
import { NotebookService } from 'app/components/app/notebook.service';
import { of } from 'rxjs';

describe('NotebookComponent', () => {
    let component: NotebookComponent;
    let fixture: ComponentFixture<NotebookComponent>;
    let service: MockNotebookService;

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

}
