import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [ 
    BrowserAnimationsModule,    
    MatButtonModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  exports: [ 
    MatButtonModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ]
})
export class CustommaterialmoduleModule { }
