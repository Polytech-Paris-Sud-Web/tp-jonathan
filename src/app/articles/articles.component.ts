import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { Observable, Subject } from 'rxjs';
import { take, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  search$ = new Subject();
  selectedValue = 0;
  textToFilter = '';
  listOptions = [
    { id: 0, value: 'Choisir mon filtre' },
    { id: 1, value: 'Titre' },
    { id: 2, value: 'Contenu' },
    { id: 3, value: 'Auteur' }
  ];
  articlesFiltered: Article[] = [];
  constructor(private articleService: ArticleService) {
    this.articleService.position = '';
    this.search$.pipe(
      debounceTime(500),
      tap(searchValue => this.filterByOption())
    ).subscribe();
  }

  filterByOption() {
    this.textToFilter = this.textToFilter.trim().toLowerCase();
    if (this.textToFilter.length === 0) {
      this.articlesFiltered = this.articles;
      return;
    }
    if (+this.selectedValue === 1) { // spread syntax for immutaibility
      this.articlesFiltered = [...this.articles.filter(article => article.title.toLowerCase().includes(this.textToFilter))];
    } else if (+this.selectedValue === 2) {
      this.articlesFiltered = [...this.articles.filter(article => article.content.toLowerCase().includes(this.textToFilter))];
    } else if (+this.selectedValue === 3) {
      this.articlesFiltered = [...this.articles.filter(article => article.authors.toLowerCase().includes(this.textToFilter))];
    }
  }

  filterByCollection() {
    this.textToFilter = '';
  }

  ngOnInit() {
    this.initArticles();
  }

  initArticles() {
    this.articleService.get().subscribe(
      articles => {
        this.articlesFiltered = articles;
        this.articles = articles;
      });
  }
  delete(article: Article) {
    this.articleService.delete(article.id).subscribe(() => {
      this.initArticles();
    });
  }

  trackById(index, item: Article) {
    console.log(item, 'trackby');
    if (!item) {
      return null;
    } else {
      return item.id;
    }

  }
}
