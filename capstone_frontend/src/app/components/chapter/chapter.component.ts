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
  alreadyBought: boolean = false;
  price!: number;
  constructor(private mangaSrv: MangaService, private cartSrv: CartService) {}

  ngOnInit(): void {
    this.mangaSrv.getChapterById(this.chapterId).subscribe((chapterData) => {
      this.chapter = chapterData.data;
      console.log(this.chapter);
      this.mangaSrv.getAvgColor(this.urlImg);
      this.cartSrv
        .verifyExistence(this.mangaTitle, this.chapter.attributes.chapter)
        .subscribe((elements) => {
          console.log(elements);
          if (elements.length !== 0) {
            this.price = Number.parseFloat(elements[0].price);
            this.alreadyBought = true;
          } else {
            let prevPrice = parseFloat(
              ((Math.random() * (2000.0 - 700.0) + 700.0) / 100).toFixed(2)
            );
            if (this.lastChapter) {
              this.mangaSrv.priceLastChapter = prevPrice;
              this.price = prevPrice;
              this.mangaSrv.lastChapterId = this.chapterId;
            } else {
              if (this.chapterId === this.mangaSrv.lastChapterId) {
                this.price = this.mangaSrv.priceLastChapter;
              } else {
                console.log(this.chapterId + ' ' + this.mangaSrv.lastChapterId);
                this.price = prevPrice;
              }
            }
          }
        });
    });
    this.setTitle(this.manga);
  }

  addToCart() {
    let data = null;
    this.cartSrv
      .verifyExistence(this.mangaTitle, this.chapter.attributes.chapter)
      .subscribe((elements) => {
        if (elements.length === 0) {
          data = {
            titleManga: this.mangaTitle,
            chapterTitle: this.chapter.attributes.title,
            chapterNumber:
              this.chapter.attributes.chapter === undefined
                ? 'Unique Chapter'
                : this.chapter.attributes.chapter,
            price: this.price.toString(),
            imgManga: this.urlImg,
          };
          this.cartSrv.addArticleToCart(data).subscribe((el) => {
            console.log(el);
            window.location.reload();
          });
        }
      });
  }

  async setTitle(manga: Manga) {
    this.mangaTitle = await this.mangaSrv.getTitle(manga);
  }
}
