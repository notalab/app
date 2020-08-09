import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AuthGuardService as AuthGuard
} from 'app/providers/auth-guard.service';

import { InboxComponent } from 'app/components/app/inbox/inbox.component';
import { NotebookComponent } from 'app/components/app/notebook/notebook.component';

export const routes: Routes = [
    {
        path: 'app',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'inbox',
                component: InboxComponent
            },
            {
                path: 'notebook/:id',
                component: NotebookComponent
            },
            {
                path: 'notebook/:id/:noteid',
                component: NotebookComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class MainRoutingModule {}
