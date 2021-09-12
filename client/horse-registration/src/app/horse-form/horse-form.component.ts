import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../models/member';
import { HorsesService } from '../services/horses.service';

@Component({
  selector: 'hr-horse-form',
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.css']
})
export class HorseFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private horsesService: HorsesService) {
    this.horseForm = formBuilder.group({
      'HorseName' : [null, [Validators.required]],
      'JockeyName' : [null, [Validators.required]],
      'Odds' : [null, [Validators.required]],
      'HorseColor' : [null, [Validators.required]],
      'MemberEmail' : [null, [Validators.required]],
      'MemberPhone' : [null, [Validators.required]]
    });
   }

  horseForm: FormGroup;
  submit: boolean;

  ngOnInit(): void {
  }

  onSubmit(horse: Member): void {
    console.log(horse);
    this.horsesService.addHorse(1, horse).subscribe();
  }

}
