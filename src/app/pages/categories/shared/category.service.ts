import { element } from 'protractor';
import { Category } from './category.model';
import { Injectable,Injector } from '@angular/core';
import { HttpHeaders, HttpClient} from "@angular/common/http";

import {Observable, throwError} from "rxjs";
import {map, catchError, flatMap} from "rxjs/operators";
import { BaseResourceService } from 'src/app/shared/sevices/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{
  

  constructor(protected injector: Injector) { 
    super('api/categories', injector, Category.fromJson)
  }

  
}
