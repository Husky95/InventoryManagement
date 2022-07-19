import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  template: `<h1>Accounts Work!</h1>`,

  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
