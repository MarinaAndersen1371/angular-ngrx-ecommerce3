import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerProduct } from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.scss'],
})
export class ManagerProductComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  @Input('id') productId = '';
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(
        loadManagerProduct({ id: this.productId, role: 'manager' })
      );
    }
  }
}
