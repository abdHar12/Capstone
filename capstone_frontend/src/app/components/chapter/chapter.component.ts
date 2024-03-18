import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChapterFromChapterEndPoint } from 'src/app/module/chapter-from-chapter-end-point';
import { Manga } from 'src/app/module/manga';
import { CartService } from 'src/app/service/cart.service';
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
  mangaTitle!: any;
  price!: number;
  constructor(private mangaSrv: MangaService, private cartSrv: CartService) {}

  ngOnInit(): void {
    this.price = Math.round(Math.random() * (20 - 7) + 7);

    this.mangaSrv.getChapterById(this.chapterId).subscribe((chapterData) => {
      this.chapter = chapterData.data;
      console.log(this.chapter);
      this.mangaSrv.getAvgColor(this.urlImg);
    });
    this.setTitle(this.manga);
  }

  addToCart() {
    const data = {
      titleManga: this.mangaTitle,
      chapterTitle: this.chapter.attributes.title,
      chapterNumber: this.chapter.attributes.chapter,
      price: this.price.toString(),
      imgManga: this.urlImg,
    };
    this.cartSrv.addArticleToCart(data).subscribe((el) => {
      console.log(el);
    });
  }

  async setTitle(manga: Manga) {
    this.mangaTitle = await this.mangaSrv.getTitle(manga);
  }
}
