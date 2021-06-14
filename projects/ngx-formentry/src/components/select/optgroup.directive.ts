/* tslint:disable:component-class-suffix directive-class-suffix*/
import { Directive, HostBinding } from "@angular/core";

@Directive({
    // tslint:disable-next-line
	selector: "optgroup"
})
export class OptGroup {
   @HostBinding("class") inputClass = "bx--select-optgroup";
}
