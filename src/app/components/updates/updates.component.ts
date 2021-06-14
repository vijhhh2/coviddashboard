import { Component, OnInit, Input } from '@angular/core';
import { Update } from 'src/app/models/update.model';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {
  @Input() updates: Update[];

  constructor() { }

  ngOnInit(): void {
  }

}
