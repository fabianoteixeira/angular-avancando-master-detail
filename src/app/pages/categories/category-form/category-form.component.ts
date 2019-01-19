import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';



@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  
  currentAction: string;
  categoryFrom: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    throw new Error("Method not implemented.");
  }

  // private methods

}
