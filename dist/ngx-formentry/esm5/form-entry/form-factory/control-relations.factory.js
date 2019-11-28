import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var ControlRelationsFactory = /** @class */ (function () {
    function ControlRelationsFactory() {
    }
    ControlRelationsFactory.prototype.buildRelations = function (rootNode) {
        var controlsStore = this.mapControlIds(rootNode, {});
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                var nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    };
    ControlRelationsFactory.prototype.buildArrayNodeRelations = function (node) {
        var form = node.form;
        if (!form) {
            return;
        }
        var rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        var rootControlsStore = this.mapControlIds(rootNode, {});
        var arrayControlStore = this.mapControlIds(node, {});
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (var id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                var child = arrayControlStore[id];
                var control = child.control;
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    };
    ControlRelationsFactory.prototype.createRelationsToArrayControls = function (node) {
        var form = node.form;
        var rootNode = form.rootNode;
        // build relations for control outside the array
        var rootControlsStore = this.mapControlIds(rootNode, {});
        var arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var rChild = rootControlsStore[key];
                var parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    var _loop_1 = function (id) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            var aChild = arrayControlStore[id];
                            var aChildId = aChild.question.key;
                            if (this_1.hasRelation(aChildId, rChild.question)) {
                                var nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    var an = nodes[0];
                                    var rootControl_1 = rChild.control;
                                    if (rootControl_1.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl_1.controlRelations.otherRelations.push(an);
                                    }
                                    aChild.control.addValueChangeListener(function (value) {
                                        if (rootControl_1.updateCalculatedValue) {
                                            rootControl_1.updateCalculatedValue();
                                        }
                                        rootControl_1.updateValueAndValidity();
                                        if (rootControl_1.updateHiddenState) {
                                            rootControl_1.updateHiddenState();
                                        }
                                        if (rootControl_1.updateAlert) {
                                            rootControl_1.updateAlert();
                                        }
                                        if (rootControl_1.updateDisabledState) {
                                            rootControl_1.updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    // loop through controls in the array group
                    for (var id in arrayControlStore) {
                        _loop_1(id);
                    }
                }
            }
        }
    };
    ControlRelationsFactory.prototype.getRelationsForControl = function (id, node) {
        var relations = new Array();
        var nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            var nodeBase = nodeBaseArray[0];
            var controlList = this.mapControlIds(node, {});
            for (var key in controlList) {
                if (controlList.hasOwnProperty(key)) {
                    if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
                        relations.push(controlList[key].control);
                    }
                }
            }
        }
        return relations;
    };
    ControlRelationsFactory.prototype.mapControlIds = function (node, controlsStore) {
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    };
    ControlRelationsFactory.prototype.setRelations = function (controlsStore, nodeBase) {
        var questionBase = nodeBase.question;
        var id = questionBase.key;
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                var node = controlsStore[key];
                var question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(node.control, nodeBase.control);
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    var required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(node.control, nodeBase.control);
                        }
                    }
                }
            }
        }
    };
    ControlRelationsFactory.prototype.hasRelation = function (id, questionBase, nodeBase) {
        var hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(function (element) {
                if (element instanceof JsExpressionValidationModel) {
                    var model = element;
                    var failsWhenExpression = model.failsWhenExpression;
                    if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
                        hasRelation = true;
                    }
                }
                else if (element instanceof ConditionalValidationModel && element.type === 'conditionalAnswered'
                    && element.referenceQuestionId === id) {
                    hasRelation = true;
                }
            });
        }
        // add hiders and disablers relations
        if (!hasRelation) {
            if (typeof questionBase.hide === 'string') {
                var hide = questionBase.hide;
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                var hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                var disable = questionBase.disable;
                if (disable.length > 0 && disable.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
        }
        // add calculate expressions relations
        if (!hasRelation && questionBase.calculateExpression && questionBase.calculateExpression.length > 0
            && questionBase.calculateExpression.indexOf(id) !== -1) {
            hasRelation = true;
        }
        return hasRelation;
    };
    ControlRelationsFactory.prototype.addRelationToControl = function (control, related) {
        //  let relations = control.controlRelations.relations;
        //
        //  let hasRelation = false;
        //
        //   relations.forEach(element => {
        //
        //     let controlRelation: ControlRelation = element as ControlRelation;
        //
        //     let relation: AfeFormControl | AfeFormArray = controlRelation.control as AfeFormControl | AfeFormArray;
        //
        //     if ( control.uuid !== undefined && control.uuid === relation.uuid ) {
        //       hasRelation = true;
        //     }
        //   });
        // if ( !hasRelation ) {
        control.controlRelations.addRelatedControls(related);
        // }
    };
    ControlRelationsFactory = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ControlRelationsFactory);
    return ControlRelationsFactory;
}());
export { ControlRelationsFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTXZFO0lBRUU7SUFBZ0IsQ0FBQztJQUVqQixnREFBYyxHQUFkLFVBQWUsUUFBbUI7UUFFaEMsSUFBTSxhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUQsS0FBSyxJQUFNLEdBQUcsSUFBSSxhQUFhLEVBQUU7WUFDL0IsSUFBSSxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQyxJQUFNLFFBQVEsR0FBYSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTlDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQseURBQXVCLEdBQXZCLFVBQXdCLElBQWU7UUFFckMsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUU3QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBQ0QsSUFBTSxRQUFRLEdBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUUxQyxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztR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QUFzQztRQUVqRyx1REFBdUQ7UUFDdkQsRUFBRTtRQUNGLDRCQUE0QjtRQUM1QixFQUFFO1FBQ0YsbUNBQW1DO1FBQ25DLEVBQUU7UUFDRix5RUFBeUU7UUFDekUsRUFBRTtRQUNGLDhHQUE4RztRQUM5RyxFQUFFO1FBQ0YsNEVBQTRFO1FBQzVFLDRCQUE0QjtRQUM1QixRQUFRO1FBQ1IsUUFBUTtRQUVSLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSTtJQUNOLENBQUM7SUFsVFUsdUJBQXVCO1FBRG5DLFVBQVUsRUFBRTs7T0FDQSx1QkFBdUIsQ0FtVG5DO0lBQUQsOEJBQUM7Q0FBQSxBQW5URCxJQW1UQztTQW5UWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIGltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gICcuLi8uLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQWZlRm9ybUFycmF5IH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWFycmF5JztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uc0ZhY3Rvcnkge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgYnVpbGRSZWxhdGlvbnMocm9vdE5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgY29uc3QgY29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sc1N0b3JlKSB7XG4gICAgICBpZiAoY29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IGNvbnRyb2xzU3RvcmVba2V5XTtcblxuICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhjb250cm9sc1N0b3JlLCBub2RlQmFzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGRBcnJheU5vZGVSZWxhdGlvbnMobm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBmb3JtOiBGb3JtID0gbm9kZS5mb3JtO1xuXG4gICAgaWYgKCFmb3JtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJvb3ROb2RlOiBHcm91cE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xuXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9scyBpbiB0aGUgc2FtZSBhcnJheVxuICAgIHRoaXMuYnVpbGRSZWxhdGlvbnMobm9kZSk7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2wgb3V0c2lkZSB0aGUgYXJyYXlcbiAgICBjb25zdCByb290Q29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XG4gICAgY29uc3QgYXJyYXlDb250cm9sU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiByb290Q29udHJvbHNTdG9yZSkge1xuXG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IHJvb3RDb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoYXJyYXlDb250cm9sU3RvcmUsIGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgcmVsYXRpb25zIGZvciBjb250cm9scyBvdXRzaWRlIHRoZSBncm91cCB0byBjb250cm9scyBpbiB0aGlzIGdyb3VwXG4gICAgdGhpcy5jcmVhdGVSZWxhdGlvbnNUb0FycmF5Q29udHJvbHMobm9kZSk7XG5cbiAgICAvLyBmaXJlIHJlbGF0aW9uc1xuICAgIGZvciAoY29uc3QgaWQgaW4gYXJyYXlDb250cm9sU3RvcmUpIHtcbiAgICAgIGlmIChhcnJheUNvbnRyb2xTdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XG4gICAgICAgIGNvbnN0IGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcbiAgICAgICAgY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgY29uc3QgZm9ybTogRm9ybSA9IG5vZGUuZm9ybTtcblxuICAgIGNvbnN0IHJvb3ROb2RlOiBHcm91cE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xuXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9sIG91dHNpZGUgdGhlIGFycmF5XG4gICAgY29uc3Qgcm9vdENvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuICAgIGNvbnN0IGFycmF5Q29udHJvbFN0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGZvcm0gY29udHJvbHNcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByb290Q29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKHJvb3RDb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCByQ2hpbGQ6IE5vZGVCYXNlID0gcm9vdENvbnRyb2xzU3RvcmVba2V5XTtcblxuICAgICAgICBjb25zdCBwYXJlbnROb2RlUGF0aCA9IG5vZGUucGF0aC5zdWJzdHJpbmcoMCwgbm9kZS5wYXRoLmxhc3RJbmRleE9mKCcuJykpO1xuXG4gICAgICAgIGlmIChyQ2hpbGQucGF0aC5pbmRleE9mKHBhcmVudE5vZGVQYXRoICsgJy4nKSA9PT0gLTEpIHtcblxuICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBjb250cm9scyBpbiB0aGUgYXJyYXkgZ3JvdXBcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgICAgICAgY29uc3QgYUNoaWxkOiBOb2RlQmFzZSA9IGFycmF5Q29udHJvbFN0b3JlW2lkXTtcbiAgICAgICAgICAgICAgY29uc3QgYUNoaWxkSWQgPSBhQ2hpbGQucXVlc3Rpb24ua2V5O1xuICAgICAgICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihhQ2hpbGRJZCwgckNoaWxkLnF1ZXN0aW9uKSkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IEFycmF5PE5vZGVCYXNlPiA9IG5vZGUuZm9ybS5zZWFyY2hOb2RlQnlQYXRoKHJvb3ROb2RlLCBwYXJlbnROb2RlUGF0aCwgW10pO1xuICAgICAgICAgICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhbiA9IG5vZGVzWzBdIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RDb250cm9sID0gKHJDaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHJvb3RDb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuaW5kZXhPZihhbikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMucHVzaChhbik7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIChhQ2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSkuYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcigodmFsdWUpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJlbGF0aW9uc0ZvckNvbnRyb2woaWQsIG5vZGU6IEdyb3VwTm9kZSk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiB7XG5cbiAgICBjb25zdCByZWxhdGlvbnM6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiA9IG5ldyBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4oKTtcblxuICAgIGNvbnN0IG5vZGVCYXNlQXJyYXk6IEFycmF5PE5vZGVCYXNlPiA9IG5vZGUuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKGlkKTtcblxuICAgIGlmIChub2RlQmFzZUFycmF5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgY29uc3Qgbm9kZUJhc2U6IE5vZGVCYXNlID0gbm9kZUJhc2VBcnJheVswXTtcblxuICAgICAgY29uc3QgY29udHJvbExpc3Q6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xMaXN0KSB7XG4gICAgICAgIGlmIChjb250cm9sTGlzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihjb250cm9sTGlzdFtrZXldLnF1ZXN0aW9uLmtleSwgbm9kZUJhc2UucXVlc3Rpb24pKSB7XG4gICAgICAgICAgICByZWxhdGlvbnMucHVzaChjb250cm9sTGlzdFtrZXldLmNvbnRyb2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVsYXRpb25zO1xuICB9XG5cbiAgbWFwQ29udHJvbElkcyhub2RlOiBHcm91cE5vZGUsIGNvbnRyb2xzU3RvcmU6IGFueSkge1xuXG4gICAgY29uc3QgY2hpbGRyZW46IE5vZGVCYXNlID0gbm9kZS5jaGlsZHJlbjtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XG5cbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gY2hpbGRyZW5ba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcblxuICAgICAgICAgIHRoaXMubWFwQ29udHJvbElkcyhjaGlsZCwgY29udHJvbHNTdG9yZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb250cm9sc1N0b3JlW3F1ZXN0aW9uQmFzZS5rZXldID0gY2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBBcnJheU5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb250cm9sc1N0b3JlW3F1ZXN0aW9uQmFzZS5rZXldID0gY2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRyb2xzU3RvcmU7XG4gIH1cblxuICBzZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZTogYW55LCBub2RlQmFzZTogTm9kZUJhc2UpIHtcblxuICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gbm9kZUJhc2UucXVlc3Rpb247XG5cbiAgICBjb25zdCBpZCA9IHF1ZXN0aW9uQmFzZS5rZXk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sc1N0b3JlKSB7XG4gICAgICBpZiAoY29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSAhPT0gaWQpIHtcblxuICAgICAgICBjb25zdCBub2RlOiBOb2RlQmFzZSA9IGNvbnRyb2xzU3RvcmVba2V5XTtcbiAgICAgICAgY29uc3QgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSA9IG5vZGUucXVlc3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oaWQsIHF1ZXN0aW9uLCBub2RlQmFzZSkpIHtcbiAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgbm9kZUJhc2UuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgY29uZGl0aW9uYWwgcmVxdWlyZWQgYW5kIGNvbmRpdGlvbmFsIGFuc3dlcmVkIHJlbGF0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgY29uc3QgcmVxdWlyZWQ6IGFueSA9IHF1ZXN0aW9uLnJlcXVpcmVkO1xuXG4gICAgICAgICAgaWYgKHJlcXVpcmVkLnR5cGUgPT09ICdjb25kaXRpb25hbFJlcXVpcmVkJykge1xuXG4gICAgICAgICAgICBpZiAocmVxdWlyZWQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGlvblRvQ29udHJvbChub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXG4gICAgICAgICAgICAgICAgbm9kZUJhc2UuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzUmVsYXRpb24oaWQ6IHN0cmluZywgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UsIG5vZGVCYXNlPzogTm9kZUJhc2UpIHtcblxuICAgIGxldCBoYXNSZWxhdGlvbiA9IGZhbHNlO1xuXG4gICAgaWYgKHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzICYmIHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcblxuICAgICAgcXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCkge1xuXG4gICAgICAgICAgY29uc3QgbW9kZWw6IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCA9IGVsZW1lbnQgYXMgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsO1xuXG4gICAgICAgICAgY29uc3QgZmFpbHNXaGVuRXhwcmVzc2lvbjogc3RyaW5nID0gbW9kZWwuZmFpbHNXaGVuRXhwcmVzc2lvbjtcbiAgICAgICAgICBpZiAoZmFpbHNXaGVuRXhwcmVzc2lvbiAmJiBmYWlsc1doZW5FeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgJiYgZWxlbWVudC50eXBlID09PSAnY29uZGl0aW9uYWxBbnN3ZXJlZCdcbiAgICAgICAgICAmJiBlbGVtZW50LnJlZmVyZW5jZVF1ZXN0aW9uSWQgPT09IGlkKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgaGlkZXJzIGFuZCBkaXNhYmxlcnMgcmVsYXRpb25zXG4gICAgaWYgKCFoYXNSZWxhdGlvbikge1xuXG4gICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnN0IGhpZGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5oaWRlIGFzIHN0cmluZztcblxuICAgICAgICBpZiAoaGlkZS5sZW5ndGggPiAwICYmIGhpZGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICBjb25zdCBoaWRlT2JqOiBhbnkgPSBxdWVzdGlvbkJhc2UuaGlkZTtcblxuICAgICAgICBpZiAoaGlkZU9iai5maWVsZCA9PT0gaWQpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICBpZiAoIHF1ZXN0aW9uQmFzZS5hbGVydCAmJiB0eXBlb2YgcXVlc3Rpb25CYXNlLmFsZXJ0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmRpc2FibGUgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29uc3QgZGlzYWJsZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmRpc2FibGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIGlmIChkaXNhYmxlLmxlbmd0aCA+IDAgJiYgZGlzYWJsZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgY2FsY3VsYXRlIGV4cHJlc3Npb25zIHJlbGF0aW9uc1xuICAgIGlmICghaGFzUmVsYXRpb24gJiYgcXVlc3Rpb25CYXNlLmNhbGN1bGF0ZUV4cHJlc3Npb24gJiYgcXVlc3Rpb25CYXNlLmNhbGN1bGF0ZUV4cHJlc3Npb24ubGVuZ3RoID4gMFxuICAgICAgJiYgcXVlc3Rpb25CYXNlLmNhbGN1bGF0ZUV4cHJlc3Npb24uaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc1JlbGF0aW9uO1xuICB9XG5cbiAgYWRkUmVsYXRpb25Ub0NvbnRyb2woY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIHJlbGF0ZWQ6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KSB7XG5cbiAgICAvLyAgbGV0IHJlbGF0aW9ucyA9IGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnM7XG4gICAgLy9cbiAgICAvLyAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XG4gICAgLy9cbiAgICAvLyAgIHJlbGF0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIC8vXG4gICAgLy8gICAgIGxldCBjb250cm9sUmVsYXRpb246IENvbnRyb2xSZWxhdGlvbiA9IGVsZW1lbnQgYXMgQ29udHJvbFJlbGF0aW9uO1xuICAgIC8vXG4gICAgLy8gICAgIGxldCByZWxhdGlvbjogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjb250cm9sUmVsYXRpb24uY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcbiAgICAvL1xuICAgIC8vICAgICBpZiAoIGNvbnRyb2wudXVpZCAhPT0gdW5kZWZpbmVkICYmIGNvbnRyb2wudXVpZCA9PT0gcmVsYXRpb24udXVpZCApIHtcbiAgICAvLyAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gaWYgKCAhaGFzUmVsYXRpb24gKSB7XG4gICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkKTtcbiAgICAvLyB9XG4gIH1cbn1cbiJdfQ==