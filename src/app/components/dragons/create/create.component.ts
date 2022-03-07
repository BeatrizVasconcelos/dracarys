import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dragon } from 'src/app/models/dragon';
import { DragonsService } from 'src/app/services/dragons.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  dragon: Dragon;
  id: number;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private service: DragonsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.id = parseInt(params.get('id')));
    if(this.id) {
      this.getDragon();
    } else {
      this.loadForm();
    }
   
  }
  
  loadForm() {
    this.novo();
    let data = new Date;
    this.form = this.fb.group({
      id: [this.id != 0 ? this.id : null],
      name: [this.dragon.name, [Validators.required]],
      type: [this.dragon.type, [Validators.required]],
      createdAt: [data]
    })
  }

  novo() {
    this.dragon = {} as Dragon;
  }

  getDragon() {
    this.service.findOne(this.id).subscribe(dragon => {
      this.dragon = dragon;
      this.form = this.fb.group({
        id: [this.id != 0 ? this.id : null],
        name: [dragon.name],
        type: [dragon.type],
        createdAt: [dragon.createdAt]
      })
    })
  }

  salvar(): void {
    document.getElementById('submit').click();
    if (this.form.valid) {
      this.onSubmit();
    }
  }

  onSubmit() {
    console.log('entrou')
    if(this.form.valid) {
      if(this.dragon.id) {
        this.service.update(this.form.value).subscribe(dragon => {
          this.form.get('name').patchValue(dragon.name);
          this.form.get('type').patchValue(dragon.type);
          this.form.get('createdAt').patchValue(dragon.createdAt);
          this.getDragon();
          alert('Dragon updated!')
        })
      } else {
        this.service.save(this.form.value).subscribe(dragon => {
          this.dragon = dragon;
          alert('Dragon created!')
        })
      }
    }
  }

  remove(){
    this.service.delete(this.dragon.id).subscribe(() => {
      this.form.reset();
      alert('Dragon removed!')
    })
  }
}
