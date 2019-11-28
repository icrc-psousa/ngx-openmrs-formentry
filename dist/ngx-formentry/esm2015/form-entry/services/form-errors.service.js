import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let FormErrorsService = class FormErrorsService {
    constructor() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    announceErrorField(error) {
        this.announceErrorFieldSource.next(error);
    }
};
// Observable string sources
FormErrorsService.control = null;
FormErrorsService.tab = null;
FormErrorsService = tslib_1.__decorate([
    Injectable()
], FormErrorsService);
export { FormErrorsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQU03QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUQ5QjtRQU1TLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDakQsd0JBQW1CLEdBQW9CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUk3RixDQUFDO0lBSFEsa0JBQWtCLENBQUMsS0FBYTtRQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBUkMsNEJBQTRCO0FBQ2QseUJBQU8sR0FBa0QsSUFBSSxDQUFDO0FBQzlELHFCQUFHLEdBQVcsSUFBSSxDQUFDO0FBSnRCLGlCQUFpQjtJQUQ3QixVQUFVLEVBQUU7R0FDQSxpQkFBaUIsQ0FVN0I7U0FWWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0ICwgIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vcHVibGljX2FwaSc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtRXJyb3JzU2VydmljZSB7XG5cbiAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc291cmNlc1xuICBwdWJsaWMgc3RhdGljIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwICA9IG51bGw7XG4gIHB1YmxpYyBzdGF0aWMgdGFiOiBudW1iZXIgPSBudWxsO1xuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5hbm5vdW5jZUVycm9yRmllbGRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGQoZXJyb3I6IHN0cmluZykge1xuICAgIHRoaXMuYW5ub3VuY2VFcnJvckZpZWxkU291cmNlLm5leHQoZXJyb3IpO1xuICB9XG59XG4iXX0=