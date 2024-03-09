import { Component, Input, OnInit } from '@angular/core';
import { ChapterFromChapterEndPoint } from 'src/app/module/chapter-from-chapter-end-point';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';

@Component({
  selector: 'app-last-chapter',
  templateUrl: './last-chapter.component.html',
  styleUrls: ['./last-chapter.component.scss'],
})
export class LastChapterComponent implements OnInit {
  @Input() chapterId!: string;
  @Input() urlImg!: string;
  @Input() manga!: Manga;
  chapter!: ChapterFromChapterEndPoint;

  constructor(private mangaSrv: MangaService) {}

  ngOnInit(): void {
    console.log(this.chapterId);
    this.mangaSrv.getChapterById(this.chapterId).subscribe((chapterData) => {
      this.chapter = chapterData.data;
      console.log(this.chapter);
      this.mangaSrv.getAvgColor(this.urlImg);
    });
  }
}
