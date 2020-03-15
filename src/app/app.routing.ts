/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';



export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'status', component: AboutComponent},
    {path: 'home', component: MainComponent},
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {
  onSameUrlNavigation: 'reload',
});