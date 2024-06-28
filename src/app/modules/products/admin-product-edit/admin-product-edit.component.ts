import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { ProductService } from 'src/app/modules/products/resources/product.service';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.scss'],
})
export class AdminProductEditComponent implements OnInit {
  @Input('id') productId = '';
  model: any = {};
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  role = 'admin';

  constructor(
    private service: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.service
      .getAdminProduct(this.productId, this.role)
      .subscribe((product) => (this.model = product));
  }

  onSubmit() {
    this.store.dispatch(
      fromProductActions.updateAdminProduct({
        id: this.productId,
        name: this.model.name,
        brand: this.model.brand,
        category: this.model.category,
        description: this.model.description,
        pricePurchase: this.model.pricePurchase,
        price: this.model.price,
        quantity: this.model.quantity,
        extra: this.model.extra,
        imageUrl: this.model.imageUrl,
        modifiedBy: 'Admin',
      })
    );
  }
}
