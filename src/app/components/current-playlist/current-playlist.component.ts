import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Playlist, Song, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from '@angular/router';
import { GridTemplateService } from '../../services/grid-template.service';
import { FormatterService } from '../../services/formatter.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-current-playlist',
  standalone: true,
  imports: [MatIconModule, RouterLink, DragDropModule],
  templateUrl: './current-playlist.component.html',
  styleUrl: './current-playlist.component.css'
})
export class CurrentPlaylistComponent implements OnInit, AfterViewChecked {
  public playlist!: Playlist
  public isShort: boolean = false
  public averageRGB: string = 'transparent'

  constructor(private player: PlayerService, private grid: GridTemplateService, private formatter: FormatterService) { }

  ngAfterViewChecked(): void {
    // var rgb = getAverageRGB(this.daun.nativeElement);
    // console.log(rgb)
    // document.body.style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    // function getAverageRGB(imgEl: any) {
    //   var blockSize = 5, // only visit every 5 pixels
    //     defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    //     canvas = document.createElement('canvas'),
    //     context = canvas.getContext && canvas.getContext('2d'),
    //     data, width, height,
    //     i = -4,
    //     length,
    //     rgb = { r: 0, g: 0, b: 0 },
    //     count = 0;

    //   if (!context) {
    //     return defaultRGB;
    //   }

    //   canvas.height = 160;
    //   canvas.width = 160;

    //   context.drawImage(imgEl, 0, 0);

    //   try {
    //     data = context.getImageData(0, 0, canvas.width, canvas.height);
    //   } catch (e) {
    //     console.log(e)
    //       /* security error, img on diff domain */alert('x');
    //     return defaultRGB;
    //   }

    //   length = data.data.length;

    // while ((i += blockSize * 4) < length) {
    //   ++count;
    //   rgb.r += data.data[i];
    //   rgb.g += data.data[i + 1];
    //   rgb.b += data.data[i + 2];
    // }

    //   // ~~ used to floor values
    //   rgb.r = ~~(rgb.r / count);
    //   rgb.g = ~~(rgb.g / count);
    //   rgb.b = ~~(rgb.b / count);

    //   return rgb;

    // }
  }

  ngOnInit() {


    this.player.getPlaylist().subscribe((item) => {
      if (!item) return
      this.playlist = item

      const canvas: any = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = this.playlist.cover_medium

      image.onload = () => {
        var rgb = { r: 0, g: 0, b: 0 }
        ctx.drawImage(image, 0, 0, 160, 160);
        const data = ctx.getImageData(0, 0, 160, 160);

        var i = 4
        var count = 0
        var length = data.data.length

        while ((i += 5 * 4) < length) {
          ++count;
          rgb.r += data.data[i];
          rgb.g += data.data[i + 1];
          rgb.b += data.data[i + 2];
        }

        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        this.averageRGB = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        console.log(this.averageRGB)
      };
    })
    setTimeout(() => {
      if (localStorage.getItem('isShort') === 'true') {
        this.toggleShort()
      }
    }, 0)



  }

  isSongPause(): boolean {
    return this.player.getAudio().paused
  }

  setTrack(index: number) {
    const playlist = this.player.getPlaylist().getValue()
    if (!playlist) return
    const song = playlist.tracks.data[index]
    console.log(song.id)
    if (song.id === this.player.getCurrentSong()?.id) {
      if (this.player.getAudio().paused) {
        this.player.continueSong()
      } else {
        this.player.pauseSong()
      }
    } else {
      this.player.setCurrentSong(song)
      this.player.continueSong()
    }
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }

  isCurrentSong(songId: number): boolean {
    return this.player?.getCurrentSong()?.id === songId
  }

  toggleShort() {
    if (this.isShort) {
      this.grid.setMainGrid([[1, 4], [4, 16], [16, 19]])
    } else {
      this.grid.setMainGrid([[1, 4], [4, 18], [18, 19]])
    }

    this.isShort = !this.isShort
    localStorage.setItem('isShort', String(this.isShort))
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlist.tracks.data, event.previousIndex, event.currentIndex)
  }

  getAverageColor() {
    console.log()
  }
}
