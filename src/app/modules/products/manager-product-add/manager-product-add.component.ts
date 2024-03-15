import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faHome, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { addManagerProduct } from 'src/app/modules/products/state/product.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-manager-product-add',
  templateUrl: './manager-product-add.component.html',
  styleUrls: ['./manager-product-add.component.scss'],
})
export class ManagerProductAddComponent implements OnInit {
  faHome = faHome;
  faCartPlus = faCartPlus;
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pricePurchase: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      extra: [false],
      imageUrl: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.store.dispatch(
        addManagerProduct({
          name: this.productForm.value.name,
          brand: this.productForm.value.brand,
          category: this.productForm.value.category,
          description: this.productForm.value.description,
          pricePurchase: this.productForm.value.pricePurchase,
          price: this.productForm.value.price,
          quantity: this.productForm.value.quantity,
          extra: this.productForm.value.extra,
          imageUrl: this.productForm.value.imageUrl,
          modifiedBy: 'Manager',
        })
      );
    }
  }
}
