import { Component, OnInit, Input } from '@angular/core';
import { Update } from 'src/app/models/update.model';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  @Input() update: Update;
  constructor() { }

  ngOnInit(): void {
  }

}
