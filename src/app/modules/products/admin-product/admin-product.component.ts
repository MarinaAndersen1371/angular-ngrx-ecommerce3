import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowLeft,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  @Input('id') productId = '';
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(
        fromProductActions.loadAdminProduct({
          id: this.productId,
          role: 'admin',
        })
      );
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(
        fromProductActions.deleteAdminProduct({ productId: id, role: 'admin' })
      );
    }
  }
}
