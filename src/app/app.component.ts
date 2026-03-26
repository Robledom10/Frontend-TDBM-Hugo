import { Component } from '@angular/core';
import { TmdbService } from './services/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Opción actualmente mostrada en pantalla (última búsqueda realizada)
  optionSelected: string = "";
  // Opción que el usuario tiene seleccionada en el select, a la espera de pulsar "Buscar"
  pendingOption: string = "";
  result: any;

  constructor(private tmdbService: TmdbService, private sanitizer: DomSanitizer) { }

  getVideoUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + key
    );
  }

  search() {
    if (!this.pendingOption) {
      alert("Seleccione un endpoint");
      return;
    }

    this.tmdbService
      .getEndpoint(this.pendingOption)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.result = data;
          this.optionSelected = this.pendingOption;
        },
        error: (err) => {
          console.error(err);
          alert("Error al consultar el API 💀");
        }
      });
  }
}
