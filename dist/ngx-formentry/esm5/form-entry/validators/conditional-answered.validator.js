var ConditionalAnsweredValidator = /** @class */ (function () {
    function ConditionalAnsweredValidator() {
    }
    ConditionalAnsweredValidator.prototype.validate = function (model) {
        return function (control) {
            var value = control.value;
            var relationValue = null;
            var referenceQuestionId = model.referenceQuestionId;
            var referenceQuestionAnswers = model.referenceQuestionAnswers;
            var successCondition = true;
            if (value) {
                if (control && control.controlRelations && control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(function (relation) {
                        var relatedAsControl = relation.relatedTo;
                        if (relatedAsControl.uuid === referenceQuestionId) {
                            if (Array.isArray(relatedAsControl.value)) {
                                relationValue = relatedAsControl.value;
                            }
                            else {
                                relationValue = relatedAsControl.value && typeof relatedAsControl.value === 'object' && relatedAsControl.value.value ?
                                    relatedAsControl.value.value : relatedAsControl.value;
                            }
                        }
                        if (!relationValue) {
                            successCondition = false;
                        }
                        else if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) === -1) {
                            successCondition = false;
                        }
                    });
                }
            }
            if (!successCondition) {
                return { 'conditional_answered': { message: model.message } };
            }
            return null;
        };
    };
    return ConditionalAnsweredValidator;
}());
export { ConditionalAnsweredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtJQUVFO0lBQWUsQ0FBQztJQUVoQiwrQ0FBUSxHQUFSLFVBQVMsS0FBaUM7UUFFeEMsT0FBTyxVQUFDLE9BQXVCO1lBRTdCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQU0sbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzlELElBQU0sd0JBQXdCLEdBQVEsS0FBSyxDQUFDLHdCQUF3QixDQUFDO1lBQ3JFLElBQUksZ0JBQWdCLEdBQVEsSUFBSSxDQUFDO1lBRWpDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO29CQUMzRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7d0JBRWpELElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFNBQWdCLENBQUM7d0JBQ25ELElBQUksZ0JBQWdCLENBQUMsSUFBSSxLQUFLLG1CQUFtQixFQUFFOzRCQUNqRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQ3ZDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7NkJBQzFDO2lDQUFNO2dDQUNILGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FDbEgsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzZCQUM3RDt5QkFDRjt3QkFFRCxJQUFJLENBQUMsYUFBYSxFQUFFOzRCQUNsQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7eUJBQzFCOzZCQUFNLElBQUksT0FBTyx3QkFBd0IsS0FBSyxRQUFRLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUNqSCxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7eUJBQzFCO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0Y7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRyxLQUFLLENBQUMsT0FBTyxFQUFHLEVBQUUsQ0FBQzthQUNqRTtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKSB7XG5cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCByZWxhdGlvblZhbHVlID0gbnVsbDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHN0cmluZyA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uSWQ7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IGFueSA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycztcbiAgICAgIGxldCBzdWNjZXNzQ29uZGl0aW9uOiBhbnkgPSB0cnVlO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sLnV1aWQgPT09IHJlZmVyZW5jZVF1ZXN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRlZEFzQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRlZEFzQ29udHJvbC52YWx1ZSAmJiB0eXBlb2YgcmVsYXRlZEFzQ29udHJvbC52YWx1ZSA9PT0gJ29iamVjdCcgJiYgcmVsYXRlZEFzQ29udHJvbC52YWx1ZS52YWx1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkQXNDb250cm9sLnZhbHVlLnZhbHVlIDogcmVsYXRlZEFzQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIXJlbGF0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ29uZGl0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyA9PT0gJ29iamVjdCcgJiYgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLmluZGV4T2YocmVsYXRpb25WYWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXN1Y2Nlc3NDb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJzogeyBtZXNzYWdlOiAgbW9kZWwubWVzc2FnZSAgfSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=