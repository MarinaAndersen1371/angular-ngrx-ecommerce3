import { Component, OnInit, Input } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() value!: number;
  @Input() text!: string;

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  stars = [1, 2, 3, 4, 5];

  getStarIcon(index: number): any {
    if (this.value >= index) {
      return this.faStar;
    } else if (this.value >= index - 0.5) {
      return this.faStarHalfAlt;
    } else {
      return this.faStar;
    }
  }
}
