import { Component, Input, OnInit } from '@angular/core';

import { Member } from 'src/app/Models/member';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit{
  @Input() member: Member | undefined

  constructor(){}
  ngOnInit(): void {
    
  }

}
