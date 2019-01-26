import { CategoryService } from './../../categories/shared/category.service';
import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { Category } from '../../categories/shared/category.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';



@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
            dayNames: ["Dogmingo", "Segunda", "Terça", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: 'Hoje',
            clear: 'Limpar'
  };


  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) { 
    super(injector, new Entry(), entryService, Entry.fromJson)
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
    
    })
  }

  // private methods

  private loadCategories(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true,[Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

 
  protected creationPageTitle(): string{
    return "Cadastro de novo Lançamento"
  }

  protected editionPageTitle(): string{
    const resourceName = this.resource.name || "";

    return "Editando Lançamento" + resourceName;
  }



}
