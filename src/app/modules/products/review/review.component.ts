import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input() productReviews!: any[];
  @Input() productId!: string;
  @Input() userId!: any;
  @Input() userName!: any;

  ngSelectRating = 'Select';
  comment: string = '';

  constructor(private router: Router, private store: Store<AppState>) {}

  createReview(fReview: NgForm): void {
    if (this.userId) {
      this.store.dispatch(
        fromProductActions.reviewProduct({
          id: this.productId,
          userId: this.userId,
          userName: this.userName,
          rating: fReview.value.rating,
          comment: fReview.value.comment,
        })
      );
    } else {
      this.router.navigate(['/users/login']);
    }
  }
}
