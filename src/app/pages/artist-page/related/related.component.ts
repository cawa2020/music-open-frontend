import { Component } from '@angular/core';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { ArtistComponent } from "../../../shared/components/artist-card/artist-card.component";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Artist } from '../../../shared/interfaces/artist.interface';

@Component({
    selector: 'app-related',
    standalone: true,
    templateUrl: './related.component.html',
    styleUrl: './related.component.css',
    imports: [LoaderComponent, ArtistComponent]
})
export class RelatedComponent {
  public related: Artist[] | null = null

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.related = null
      const artistId = Number(params['id']);
      this.initRelated(artistId)
    });
  }

  private initRelated(artistId: number) {
    this.api.getArtistRelated(artistId).subscribe((res) => {
      this.related = res.data
    })
  }
}
