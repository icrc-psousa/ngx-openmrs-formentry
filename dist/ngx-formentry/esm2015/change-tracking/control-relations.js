import { AbstractControl } from '@angular/forms';
import { ControlRelation } from './control-relation';
export class ControlRelations {
    constructor(relationFor, relatedTo) {
        this._otherRelations = [];
        this._relationFor = relationFor;
        this._relations = [];
        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }
    get relationsFor() {
        return this._relationFor;
    }
    get relations() {
        return this._relations;
    }
    get otherRelations() {
        return this._otherRelations;
    }
    addRelatedControls(relatedTo) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }
        if (relatedTo instanceof Array) {
            for (let i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxNQUFNLE9BQU8sZ0JBQWdCO0lBTXpCLFlBQVksV0FBNEIsRUFBRSxTQUErQztRQUZqRixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUc5QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLFNBQVMsRUFBRTtZQUNYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsU0FBOEM7UUFDN0QsSUFBSSxTQUFTLFlBQVksZUFBZSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUVELElBQUksU0FBUyxZQUFZLEtBQUssRUFBRTtZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zIHtcblxuICAgIHByaXZhdGUgX3JlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSBfcmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25bXTtcbiAgICBwcml2YXRlIF9vdGhlclJlbGF0aW9uczogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG8/OiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xuICAgICAgICB0aGlzLl9yZWxhdGlvbkZvciA9IHJlbGF0aW9uRm9yO1xuICAgICAgICB0aGlzLl9yZWxhdGlvbnMgPSBbXTtcblxuICAgICAgICBpZiAocmVsYXRlZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0aW9uc0ZvcigpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25Gb3I7XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IG90aGVyUmVsYXRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX290aGVyUmVsYXRpb25zO1xuICAgIH1cblxuICAgIGFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XG4gICAgICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsYXRlZFRvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG9baV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==