import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  newArticle: Article = {
    id: null,
    title: '',
    content: '',
    authors: ''
  };
  error = '';
  success = false;
  constructor(private articleService: ArticleService, private router: Router) {
    this.articleService.position = 'creation';
  }

  onSubmitNewArticle(creationForm: NgForm) {
    if (creationForm.valid) {
      this.articleService.post(this.newArticle).subscribe(
        (result) => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/articles']);
          }, 1000);
        }, (err) => {
          console.log(err);
          this.error = 'Il semble y avoir eu un problème, regarde ta console';
        }
      );
    } else {
      this.error = 'Tous les champs sont obligatoires';
    }
  }

  ngOnInit() {
  }

}
