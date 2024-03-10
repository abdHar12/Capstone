import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChapterFromChapterEndPoint } from 'src/app/module/chapter-from-chapter-end-point';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  @Input() chapterId!: string;
  @Input() urlImg!: string;
  @Input() manga!: Manga;
  chapter!: ChapterFromChapterEndPoint;
  @Input() lastChapter!: boolean;

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
