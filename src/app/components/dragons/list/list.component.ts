import { Component, OnInit } from '@angular/core';
import { Dragon } from 'src/app/models/dragon';
import { DragonsService } from 'src/app/services/dragons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dragons: Dragon[];
  dragon: Dragon;

  constructor(private service: DragonsService) { }

  ngOnInit(): void {
    this.getDragons();
  }

  getDragons() {
    this.service.findAll().subscribe(dragons => {
      this.dragons = dragons;
    });
  }

  deleteDragon() {
    this.service.delete(this.dragon.id).subscribe(() => {
      this.getDragons();
    })
  }

}
