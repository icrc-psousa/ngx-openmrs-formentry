import * as tslib_1 from "tslib";
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';
let HistoricalValueDirective = class HistoricalValueDirective {
    constructor(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    setValue(e) {
        if (e.target.name === 'historyValue') {
            if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
                || !this.compareString(this._node.question.renderingType, 'section'))) {
                this._node.control.setValue(this._node.question.historicalDataValue.value);
                this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                e.stopPropagation();
                this._nodeChange.emit(this._node);
            }
        }
    }
    compareString(a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    }
    set node(node) {
        if (node) {
            this._node = node;
            if (this._node.question.enableHistoricalValue && !_.isUndefined(this._node.question.historicalDataValue)) {
                const display = { text: '', _date: '' };
                if ((this._node.question.renderingType === 'select'
                    || this._node.question.renderingType === 'multi-select'
                    || this._node.question.renderingType === 'single-select')) {
                    display.text = this.historicalFieldHelper.getDisplayTextFromOptions(this._node.question, 'value', 'label');
                    display._date = this._node.question.historicalDataValue.valueDate;
                    this._node.question['historicalDisplay'] = display;
                }
                else if (!_.isUndefined(this._node.question.historicalDataValue)) {
                    display.text = this._node.question.historicalDataValue.value;
                    display._date = this._node.question.historicalDataValue.valueDate;
                    this._node.question['historicalDisplay'] = display;
                }
            }
        }
    }
};
HistoricalValueDirective.ctorParameters = () => [
    { type: HistoricalFieldHelperService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", NodeBase)
], HistoricalValueDirective.prototype, "_node", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], HistoricalValueDirective.prototype, "_nodeChange", void 0);
tslib_1.__decorate([
    HostListener('click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], HistoricalValueDirective.prototype, "setValue", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", NodeBase),
    tslib_1.__metadata("design:paramtypes", [NodeBase])
], HistoricalValueDirective.prototype, "node", null);
HistoricalValueDirective = tslib_1.__decorate([
    Directive({
        selector: `[node]`
    }),
    tslib_1.__metadata("design:paramtypes", [HistoricalFieldHelperService])
], HistoricalValueDirective);
export { HistoricalValueDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU1yRCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQU9uQyxZQUFvQixxQkFBbUQ7UUFBbkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUE4QjtRQUo3RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFLbkQsQ0FBQztJQUdELFFBQVEsQ0FBQyxDQUFDO1FBRVIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7bUJBQzVFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRTtnQkFFdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUzRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO2dCQUNqRixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUVuQztTQUVGO0lBQ0gsQ0FBQztJQUNPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLElBQWM7UUFFckIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUN4RyxNQUFNLE9BQU8sR0FBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLFFBQVE7dUJBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxjQUFjO3VCQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLEVBQUU7b0JBRTNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDbkIsT0FBTyxFQUNQLE9BQU8sQ0FDUixDQUFDO29CQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO29CQUVsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFFcEQ7cUJBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFFbEUsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7b0JBQzdELE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO29CQUVsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFDcEQ7YUFDRjtTQUNGO0lBQ0gsQ0FBQztDQUVGLENBQUE7O1lBM0Q0Qyw0QkFBNEI7O0FBTDlEO0lBQVIsS0FBSyxFQUFFO3NDQUFRLFFBQVE7dURBQUM7QUFDZjtJQUFULE1BQU0sRUFBRTs7NkRBQTBDO0FBUW5EO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3dEQWlCakM7QUFTRDtJQURDLEtBQUssRUFBRTtzQ0FDTyxRQUFROzZDQUFSLFFBQVE7b0RBNEJ0QjtBQWhFVSx3QkFBd0I7SUFKcEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7S0FDbkIsQ0FBQzs2Q0FTMkMsNEJBQTRCO0dBUDVELHdCQUF3QixDQWtFcEM7U0FsRVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYFtub2RlXWBcbn0pXG5cbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIF9ub2RlOiBOb2RlQmFzZTtcbiAgQE91dHB1dCgpIF9ub2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgaGlzdG9yaWNhbERpc3BsYXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhpc3RvcmljYWxGaWVsZEhlbHBlcjogSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSkge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBzZXRWYWx1ZShlKSB7XG5cbiAgICBpZiAoZS50YXJnZXQubmFtZSA9PT0gJ2hpc3RvcnlWYWx1ZScpIHtcblxuICAgICAgaWYgKHRoaXMuX25vZGUgJiYgKCF0aGlzLmNvbXBhcmVTdHJpbmcodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlLCAncGFnZScpXG4gICAgICAgIHx8ICF0aGlzLmNvbXBhcmVTdHJpbmcodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlLCAnc2VjdGlvbicpKSkge1xuXG4gICAgICAgIHRoaXMuX25vZGUuY29udHJvbC5zZXRWYWx1ZSh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxWYWx1ZSddID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLl9ub2RlQ2hhbmdlLmVtaXQodGhpcy5fbm9kZSk7XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNvbXBhcmVTdHJpbmcoYSwgYikge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm9kZShub2RlOiBOb2RlQmFzZSkge1xuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgICAgaWYgKHRoaXMuX25vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmICFfLmlzVW5kZWZpbmVkKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheTogYW55ID0geyB0ZXh0OiAnJywgX2RhdGU6ICcnIH07XG4gICAgICAgIGlmICgodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VsZWN0J1xuICAgICAgICAgIHx8IHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ211bHRpLXNlbGVjdCdcbiAgICAgICAgICB8fCB0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzaW5nbGUtc2VsZWN0JykpIHtcblxuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuaGlzdG9yaWNhbEZpZWxkSGVscGVyLmdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMoXG4gICAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdsYWJlbCdcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xuXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbERpc3BsYXknXSA9IGRpc3BsYXk7XG5cbiAgICAgICAgfSBlbHNlIGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUpKSB7XG5cbiAgICAgICAgICBkaXNwbGF5LnRleHQgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWU7XG4gICAgICAgICAgZGlzcGxheS5fZGF0ZSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZURhdGU7XG5cbiAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsRGlzcGxheSddID0gZGlzcGxheTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=