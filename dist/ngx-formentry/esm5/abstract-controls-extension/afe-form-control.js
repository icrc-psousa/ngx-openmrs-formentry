import * as tslib_1 from "tslib";
import { FormControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
var AfeFormControl = /** @class */ (function (_super) {
    tslib_1.__extends(AfeFormControl, _super);
    function AfeFormControl(formState, validator, asyncValidator) {
        var _this = _super.call(this, formState, validator, asyncValidator) || this;
        _this.hidden = false;
        _this.hiderHelper = new HiderHelper();
        _this.disablerHelper = new DisablerHelper();
        _this.AlertHelper = new AlertHelper();
        _this._controlRelations = new ControlRelations(_this);
        _this.hiders = [];
        _this.disablers = [];
        _this.alerts = [];
        _this.valueChanges.subscribe(function (value) {
            if (_this._previousValue !== value) {
                _this.fireValueChangeListener(value);
                _this._previousValue = value;
            }
        });
        return _this;
    }
    Object.defineProperty(AfeFormControl.prototype, "controlRelations", {
        get: function () {
            return this._controlRelations;
        },
        enumerable: true,
        configurable: true
    });
    AfeFormControl.prototype.disable = function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, '');
    };
    AfeFormControl.prototype.hide = function () {
        this.hiderHelper.hideControl(this);
    };
    AfeFormControl.prototype.show = function () {
        this.hiderHelper.showControl(this);
    };
    AfeFormControl.prototype.setHidingFn = function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    AfeFormControl.prototype.setCalculatorFn = function (newCalculator) {
        this.calculator = newCalculator;
    };
    AfeFormControl.prototype.updateCalculatedValue = function () {
        if (this.calculator) {
            var _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
    };
    AfeFormControl.prototype.clearHidingFns = function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    AfeFormControl.prototype.updateHiddenState = function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    AfeFormControl.prototype.setDisablingFn = function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    AfeFormControl.prototype.clearDisablingFns = function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    AfeFormControl.prototype.updateDisabledState = function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    AfeFormControl.prototype.setAlertFn = function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    AfeFormControl.prototype.clearMessageFns = function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    AfeFormControl.prototype.updateAlert = function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    AfeFormControl.prototype.addValueChangeListener = function (func) {
        this._valueChangeListener = func;
    };
    AfeFormControl.prototype.fireValueChangeListener = function (value) {
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    };
    AfeFormControl.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
    };
    return AfeFormControl;
}(FormControl));
export { AfeFormControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLWZvcm0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUF5RCxNQUFNLGdCQUFnQixDQUFDO0FBRXBHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXhGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGO0lBQTZCLDBDQUFXO0lBaUJwQyx3QkFBWSxTQUFlLEVBQUUsU0FBdUUsRUFDaEcsY0FBNkQ7UUFEakUsWUFFSSxrQkFBTSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQVk5QztRQXhCRCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBT1AsaUJBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3RELGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFJakQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDcEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lB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Q2YsaUJBQU0sUUFBUSxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUE5R0QsQ0FBNkIsV0FBVyxHQThHdkM7QUFDRCxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnMgfSBmcm9tICcuLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMnO1xuaW1wb3J0IHsgVmFsdWVDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vdmFsdWUtY2hhbmdlLmxpc3RlbmVyJztcbmltcG9ydCB7IENhbkhpZGUsIEhpZGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgRGlzYWJsZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBDYW5HZW5lcmF0ZUFsZXJ0LCBBbGVydCB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcbmltcG9ydCB7IEhpZGVySGVscGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvaGlkZXItaGVscGVycyc7XG5pbXBvcnQgeyBBbGVydEhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycyc7XG5pbXBvcnQgeyBEaXNhYmxlckhlbHBlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Rpc2FibGVyLWhlbHBlcic7XG5pbXBvcnQgeyBDYW5DYWxjdWxhdGUgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2NvbnRyb2wtY2FsY3VsYXRvcnMvY2FuLWNhbGN1bGF0ZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5cbmNsYXNzIEFmZUZvcm1Db250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2wgaW1wbGVtZW50cyBDYW5IaWRlLCBDYW5EaXNhYmxlLCBDYW5DYWxjdWxhdGUsIENhbkdlbmVyYXRlQWxlcnQsIFZhbHVlQ2hhbmdlTGlzdGVuZXIge1xuICAgIHByaXZhdGUgX2NvbnRyb2xSZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbnM7XG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VMaXN0ZW5lcjogYW55O1xuICAgIHByaXZhdGUgX3ByZXZpb3VzVmFsdWU7XG4gICAgcHVibGljIHV1aWQ6IHN0cmluZztcbiAgICBwdWJsaWMgcGF0aEZyb21Sb290OiBzdHJpbmc7XG5cbiAgICBoaWRkZW4gPSBmYWxzZTtcbiAgICBoaWRlcnM6IEhpZGVyW107XG4gICAgYWxlcnQ6IHN0cmluZztcbiAgICBhbGVydHM6IEFsZXJ0W107XG4gICAgY2FsY3VsYXRvcjogRnVuY3Rpb247XG4gICAgZGlzYWJsZXJzOiBEaXNhYmxlcltdO1xuXG4gICAgcHJpdmF0ZSBoaWRlckhlbHBlcjogSGlkZXJIZWxwZXIgPSBuZXcgSGlkZXJIZWxwZXIoKTtcbiAgICBwcml2YXRlIGRpc2FibGVySGVscGVyOiBEaXNhYmxlckhlbHBlciA9IG5ldyBEaXNhYmxlckhlbHBlcigpO1xuICAgIHByaXZhdGUgQWxlcnRIZWxwZXI6IEFsZXJ0SGVscGVyID0gbmV3IEFsZXJ0SGVscGVyKCk7XG4gICAgY29uc3RydWN0b3IoZm9ybVN0YXRlPzogYW55LCB2YWxpZGF0b3I/OiBWYWxpZGF0b3JGbiB8IFZhbGlkYXRvckZuW10gfCBBYnN0cmFjdENvbnRyb2xPcHRpb25zIHwgbnVsbCxcbiAgICAgICAgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuIHwgQXN5bmNWYWxpZGF0b3JGbltdIHwgbnVsbCkge1xuICAgICAgICBzdXBlcihmb3JtU3RhdGUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgICB0aGlzLl9jb250cm9sUmVsYXRpb25zID0gbmV3IENvbnRyb2xSZWxhdGlvbnModGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZXJzID0gW107XG4gICAgICAgIHRoaXMuZGlzYWJsZXJzID0gW107XG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG5cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbFJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xSZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgZGlzYWJsZShwYXJhbT86IHsgb25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFuIH0pIHtcbiAgICAgICAgc3VwZXIuZGlzYWJsZShwYXJhbSk7XG4gICAgICAgIHN1cGVyLnNldFZhbHVlKCcnKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmhpZGVDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2hvd0NvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0SGlkaW5nRm4obmV3SGlkZXI6IEhpZGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuc2V0SGlkZXJGb3JDb250cm9sKHRoaXMsIG5ld0hpZGVyKTtcbiAgICB9XG5cbiAgICBzZXRDYWxjdWxhdG9yRm4obmV3Q2FsY3VsYXRvcjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9yID0gbmV3Q2FsY3VsYXRvcjtcbiAgICB9XG5cbiAgICB1cGRhdGVDYWxjdWxhdGVkVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbGN1bGF0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IF92YWwgPSB0aGlzLmNhbGN1bGF0b3IuY2FsbChFeHByZXNzaW9uUnVubmVyLCB7fSk7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKF92YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJIaWRpbmdGbnMoKSB7XG4gICAgICAgIHRoaXMuaGlkZXJIZWxwZXIuY2xlYXJIaWRlcnNGb3JDb250cm9sKHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpZGRlblN0YXRlKCkge1xuICAgICAgICB0aGlzLmhpZGVySGVscGVyLmV2YWx1YXRlQ29udHJvbEhpZGVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxpbmdGbihuZXdEaXNhYmxlcjogRGlzYWJsZXIpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlckhlbHBlci5zZXREaXNhYmxlckZvckNvbnRyb2wodGhpcywgbmV3RGlzYWJsZXIpO1xuICAgIH1cblxuICAgIGNsZWFyRGlzYWJsaW5nRm5zKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmNsZWFyRGlzYWJsZXJzRm9yQ29udHJvbCh0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVySGVscGVyLmV2YWx1YXRlQ29udHJvbERpc2FibGVycyh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRBbGVydEZuKG5ld0hpZGVyOiBBbGVydCkge1xuICAgICAgICB0aGlzLkFsZXJ0SGVscGVyLnNldEFsZXJ0c0ZvckNvbnRyb2wodGhpcywgbmV3SGlkZXIpO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZUZucygpIHtcbiAgICAgICAgdGhpcy5BbGVydEhlbHBlci5jbGVhckFsZXJ0c0ZvckNvbnRyb2wodGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWxlcnQoKSB7XG4gICAgICAgIHRoaXMuQWxlcnRIZWxwZXIuZXZhbHVhdGVDb250cm9sQWxlcnRzKHRoaXMpO1xuICAgIH1cblxuICAgIGFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jO1xuICAgIH1cblxuICAgIGZpcmVWYWx1ZUNoYW5nZUxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgJiYgdHlwZW9mIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlTGlzdGVuZXIodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0IHsgQWZlRm9ybUNvbnRyb2wgfTtcbiJdfQ==