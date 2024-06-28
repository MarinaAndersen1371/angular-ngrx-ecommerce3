import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  @Input('id') productId = '';
  userId!: any;
  userName!: any;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(
        fromProductActions.loadProduct({ id: this.productId })
      );
    }

    const user = this.authService.getUser();
    if (user) {
      this.userId = user._id;
      this.userName = user.firstName;
    }
  }
}
