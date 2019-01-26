import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../sevices/base-resource.service';


export class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  
  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('Erro ao carregar a lista')
    )
  }

  deleteResource(resource: T){
    const mustDelete = confirm("Deseja deletar?");

    if(mustDelete){
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources   .filter(element => element !=resource),
        () => alert("Erro ao tentar deletar a categoria")
      )
    }

    
  }
}
