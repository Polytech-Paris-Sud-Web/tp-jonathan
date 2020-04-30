import {Injectable} from '@angular/core';
import {Article} from '../models/article';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ArticleService {

  private _article: Observable<Article[]>;
  position = '';
  constructor(private http: HttpClient) {
  }

  public get(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:3000/articles');
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/articles/${id}`);
  }

  public post(article: Article): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/articles`, article);
  }
}
