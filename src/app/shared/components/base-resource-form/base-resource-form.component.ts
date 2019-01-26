import { OnInit, AfterContentChecked, Injector } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../sevices/base-resource.service';



export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;


    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor
        (protected injector: Injector,
            public resource: T,
         protected resourceService: BaseResourceService<T>,
         protected jsonDataToResourceFn: (jsonData) => T

    ) { 
        this.route = injector.get(ActivatedRoute),
        this.router = injector.get(Router),
        this.formBuilder = injector.get(FormBuilder)
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitform() {
        this.submittingForm = true;

        if (this.currentAction == 'new') {
            this.createResource();

        } else {
            this.updateResource();
        }
    }

    // protected methods
    private setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new") {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    
    protected loadResource() {
        if (this.currentAction == 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")))
            )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource)
                    },
                    (error) => alert('Ocorreu um erro')
                )
        }
    }

    setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string{
        return "Novo";
    }

    protected editionPageTitle(): string{
        return "Edição";
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )

    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected actionsForSuccess(resource: T) {
        toastr.success("Solicitação processada com sucesso");

        const baseComponentForm: string = this.route.snapshot.parent.url[0].path;

        this.router.navigateByUrl(baseComponentForm, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentForm, resource.id, 'edit'])
        )
    }

    protected actionsForError(error) {
        toastr.error('Ocorreu um erro ao processar a sua solitação!')

        this.submittingForm = false;

        if (error.status == 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;

        } else {
            this.serverErrorMessages = ['Falara na comunicação com o servidor. Por favor, tente mais tarde']
        }

    }


    protected abstract buildResourceForm(): void



}
