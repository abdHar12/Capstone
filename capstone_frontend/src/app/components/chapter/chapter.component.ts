import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { count } from 'rxjs';
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
      if (localStorage.getItem('user')) {
        this.cartSrv
          .verifyExistence(this.mangaTitle, this.chapter.attributes.chapter)
          .subscribe((elements) => {
            console.log(elements);
            if (elements.length !== 0) {
              this.price = Number.parseFloat(elements[0].price);
              this.alreadyBought = true;
            } else {
              this.setPrice();
            }
          });
      } else {
        this.setPrice();
      }
    });
    this.setTitle(this.manga);
  }
  setPrice() {
    let prevPrice = parseFloat(
      ((Math.random() * (2000.0 - 700.0) + 700.0) / 100).toFixed(2)
    );
    console.log(this.lastChapter);
    if (this.lastChapter) {
      if (this.mangaSrv.countOfChapter === 0) {
        this.price = prevPrice;
        this.mangaSrv.priceLastChapter = this.price;
        this.mangaSrv.lastChapterNumber = this.chapter.attributes.chapter;
        console.log(this.mangaSrv.priceLastChapter);
      } else {
        this.price = this.mangaSrv.priceLastChapter;
      }
      this.mangaSrv.countOfChapter++;
    } else {
      if (this.chapter.attributes.chapter === this.mangaSrv.lastChapterNumber) {
        this.price = this.mangaSrv.priceLastChapter;
        console.log(
          this.mangaSrv.lastChapterNumber +
            ' ' +
            this.chapter.attributes.chapter
        );
      } else {
        console.log(
          this.mangaSrv.lastChapterNumber +
            ' ' +
            this.chapter.attributes.chapter
        );
        this.price = prevPrice;
      }
    }
  }
  addToCart() {
    if (localStorage.getItem('user')) {
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
    } else {
      alert('You have to login');
    }
  }

  async setTitle(manga: Manga) {
    this.mangaTitle = await this.mangaSrv.getTitle(manga);
  }
}
