import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  oyuntahtasi: OyunTahtasi;

  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(8, 8);
  }

}
