import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookComponent } from './notebook.component';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';

describe('NotebookComponent', () => {
    let component: NotebookComponent;
    let fixture: ComponentFixture<NotebookComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [ RouterTestingModule, MOCK_AUTH_PROVIDER ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotebookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
