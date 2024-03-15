import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadFranchiseProduct } from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-franchise-product',
  templateUrl: './franchise-product.component.html',
  styleUrls: ['./franchise-product.component.scss'],
})
export class FranchiseProductComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  @Input('id') productId = '';
  faArrowLeft = faArrowLeft;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(loadFranchiseProduct({ id: this.productId }));
    }
  }
}
