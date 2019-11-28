import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var FormErrorsService = /** @class */ (function () {
    function FormErrorsService() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    FormErrorsService.prototype.announceErrorField = function (error) {
        this.announceErrorFieldSource.next(error);
    };
    // Observable string sources
    FormErrorsService.control = null;
    FormErrorsService.tab = null;
    FormErrorsService = tslib_1.__decorate([
        Injectable()
    ], FormErrorsService);
    return FormErrorsService;
}());
export { FormErrorsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQU03QztJQURBO1FBTVMsNkJBQXdCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNqRCx3QkFBbUIsR0FBb0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBSTdGLENBQUM7SUFIUSw4Q0FBa0IsR0FBekIsVUFBMEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFQRCw0QkFBNEI7SUFDZCx5QkFBTyxHQUFrRCxJQUFJLENBQUM7SUFDOUQscUJBQUcsR0FBVyxJQUFJLENBQUM7SUFKdEIsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtPQUNBLGlCQUFpQixDQVU3QjtJQUFELHdCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCAsICBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL3B1YmxpY19hcGknO1xuaW1wb3J0IHsgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yc1NlcnZpY2Uge1xuXG4gIC8vIE9ic2VydmFibGUgc3RyaW5nIHNvdXJjZXNcbiAgcHVibGljIHN0YXRpYyBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCAgPSBudWxsO1xuICBwdWJsaWMgc3RhdGljIHRhYjogbnVtYmVyID0gbnVsbDtcbiAgcHVibGljIGFubm91bmNlRXJyb3JGaWVsZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHVibGljIGFubm91bmNlRXJyb3JGaWVsZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYW5ub3VuY2VFcnJvckZpZWxkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFubm91bmNlRXJyb3JGaWVsZFNvdXJjZS5uZXh0KGVycm9yKTtcbiAgfVxufVxuIl19