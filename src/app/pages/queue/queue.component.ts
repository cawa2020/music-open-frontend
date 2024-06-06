import { Component, OnInit, effect } from '@angular/core';
import { SongService } from '../../core/services/song.service';
import { filter } from 'rxjs';
import { SongComponent } from "../../shared/components/song/song.component";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Song } from '../../shared/interfaces/song.interface';

@Component({
  selector: 'app-queue',
  standalone: true,
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css',
  imports: [SongComponent, DragDropModule]
})
export class QueueComponent {
  public queue: Song[] = []

  constructor(private songData: SongService) {
    effect(() => {
      this.queue = this.songData.getQueue()
    })
  }

  onDrop(event: CdkDragDrop<Song[]>) {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
    this.songData.setQueue(this.queue)
  }
}
