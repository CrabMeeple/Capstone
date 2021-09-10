import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  versionString: string = "1.00";
  constructor() { }

  ngOnInit(): void {
  }

}
