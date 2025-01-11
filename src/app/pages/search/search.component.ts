import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SongComponent } from "../../shared/components/song/song.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Song } from '../../shared/interfaces/song.interface';
import { debounceTime, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [SongComponent, LoaderComponent, ReactiveFormsModule]
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input!: ElementRef
  public search = new FormControl<string>('')
  public findedSongs!: Song[]
  public loading = false

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.search.valueChanges
      .pipe(tap(() => this.loading = true), debounceTime(500))
      .subscribe(el => this.handleSearch(el ?? ''))

    this.route.queryParams.subscribe((params) => {
      const value = params['q']
      if (!value || value === this.search.value) return
      // this.loading = true
      this.search.setValue(value)
      // this.handleSearch(value)
    });
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus()
  }

  handleSearch(value: string) {
    this.loading = true
    this.saveSearchToQuery()
    this.api.getBySearch(value).subscribe((res: { data: Song[] }) => {
      this.findedSongs = res.data
      this.loading = false
    })
  }

  private saveSearchToQuery() {
    const params = { q: this.search.value }
    const extras: NavigationExtras = { queryParams: params, queryParamsHandling: 'merge' }
    this.router.navigate([], extras);
  }
}
