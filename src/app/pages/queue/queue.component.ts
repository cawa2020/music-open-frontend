import { Component, OnInit } from '@angular/core';
import { SongService } from '../../core/services/song.service';
import { filter } from 'rxjs';
import { SongComponent } from "../../shared/components/song/song.component";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../shared/interfaces/song.interface';

@Component({
  selector: 'app-queue',
  standalone: true,
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css',
  imports: [SongComponent, DragDropModule, MatIconModule]
})
export class QueueComponent implements OnInit {
  public queue: Song[] = []

  constructor(private songData: SongService) { }

  ngOnInit() {
    this.queue = this.songData.getQueue()
    this.songData.changes.pipe(filter(el => el === 'queue')).subscribe(el => {
      this.queue = this.songData.getQueue()
    })
  }

  onDrop(event: CdkDragDrop<Song[]>) {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
    // ?
    this.songData.setQueue(this.queue)
  }

  getIndex(songId: number) {
    return this.queue.findIndex(song => song.id === songId)
  }
}
