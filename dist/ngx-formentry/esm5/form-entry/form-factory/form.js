/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import { DataSources } from '../data-sources/data-sources';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var Form = /** @class */ (function () {
    function Form(schema, formFactory, questionFactory) {
        this.schema = schema;
        this.formFactory = formFactory;
        this.questionFactory = questionFactory;
        this.valueProcessingInfo = {};
        this.existingOrders = {};
        this._showErrors = false;
        this._dataSourcesContainer = new DataSources();
    }
    Object.defineProperty(Form.prototype, "dataSourcesContainer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSourcesContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @param {?} path
     * @param {?} found
     * @return {?}
     */
    Form.prototype.searchNodeByPath = /**
     * @param {?} node
     * @param {?} path
     * @param {?} found
     * @return {?}
     */
    function (node, path, found) {
        var _this = this;
        /** @type {?} */
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                var child = children[key];
                if (child instanceof GroupNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    this.searchNodeByPath(child, path, found);
                }
                else if (child instanceof LeafNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                }
                else if (child instanceof ArrayNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    /** @type {?} */
                    var aChild = (/** @type {?} */ (child));
                    aChild.children.forEach(function (aChildNode) {
                        _this.searchNodeByPath(aChildNode, path, found);
                    });
                }
            }
        }
        return found;
    };
    /**
     * @param {?} questionId
     * @param {?=} questionType
     * @return {?}
     */
    Form.prototype.searchNodeByQuestionId = /**
     * @param {?} questionId
     * @param {?=} questionType
     * @return {?}
     */
    function (questionId, questionType) {
        /** @type {?} */
        var found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    };
    /**
     * @param {?} rootNode
     * @param {?} questionType
     * @param {?} found
     * @return {?}
     */
    Form.prototype.searchNodeByQuestionType = /**
     * @param {?} rootNode
     * @param {?} questionType
     * @param {?} found
     * @return {?}
     */
    function (rootNode, questionType, found) {
        var _this = this;
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach(function (node) {
                _this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            /** @type {?} */
            var questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    };
    /**
     * @private
     * @param {?} rootNode
     * @param {?} questionId
     * @param {?} results
     * @return {?}
     */
    Form.prototype.findNodesByQuestionId = /**
     * @private
     * @param {?} rootNode
     * @param {?} questionId
     * @param {?} results
     * @return {?}
     */
    function (rootNode, questionId, results) {
        var _this = this;
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach(function (node) {
                _this.findNodesByQuestionId(node, questionId, results);
            });
        }
    };
    Object.defineProperty(Form.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rootNode.control.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "showErrors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showErrors;
        },
        set: /**
         * @param {?} show
         * @return {?}
         */
        function (show) {
            this._showErrors = show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @param {?=} invalidControlNodes
     * @return {?}
     */
    Form.prototype.markInvalidControls = /**
     * @param {?} node
     * @param {?=} invalidControlNodes
     * @return {?}
     */
    function (node, invalidControlNodes) {
        var _this = this;
        /** @type {?} */
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    /** @type {?} */
                    var questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        /** @type {?} */
                        var c = (/** @type {?} */ (child.control));
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    /** @type {?} */
                    var arrayNode = (/** @type {?} */ (child));
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        _.forEach(arrayNode.children, function (groupNode) {
                            _this.markInvalidControls(groupNode, invalidControlNodes);
                        });
                    }
                }
            }
        }
        return invalidControlNodes;
    };
    /**
     * @return {?}
     */
    Form.prototype.updateHiddenDisabledStateForAllControls = /**
     * @return {?}
     */
    function () {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    };
    /**
     * @return {?}
     */
    Form.prototype.updateAlertsForAllControls = /**
     * @return {?}
     */
    function () {
        this._updateAlertsForAllControls(this.rootNode);
    };
    /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    Form.prototype._updateAlertsForAllControls = /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if (((/** @type {?} */ (rootNode.control))).updateAlert) {
                ((/** @type {?} */ (rootNode.control))).updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach(function (node) {
                _this._updateAlertsForAllControls(node);
            });
        }
    };
    /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    Form.prototype._updateHiddenDisabledStateForAllControls = /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if (((/** @type {?} */ (rootNode.control))).updateDisabledState) {
                ((/** @type {?} */ (rootNode.control))).updateDisabledState();
            }
            if (((/** @type {?} */ (rootNode.control))).updateHiddenState) {
                ((/** @type {?} */ (rootNode.control))).updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach(function (node) {
                _this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    };
    return Form;
}());
export { Form };
if (false) {
    /** @type {?} */
    Form.prototype.rootNode;
    /** @type {?} */
    Form.prototype.valueProcessingInfo;
    /** @type {?} */
    Form.prototype.existingOrders;
    /**
     * @type {?}
     * @private
     */
    Form.prototype._dataSourcesContainer;
    /**
     * @type {?}
     * @private
     */
    Form.prototype._showErrors;
    /** @type {?} */
    Form.prototype.schema;
    /** @type {?} */
    Form.prototype.formFactory;
    /** @type {?} */
    Form.prototype.questionFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdkU7SUFNRSxjQUFtQixNQUFXLEVBQVMsV0FBd0IsRUFBUyxlQUFnQztRQUFyRixXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKakcsd0JBQW1CLEdBQVEsRUFBRSxDQUFDO1FBQzVCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRTFCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQkFBSSxzQ0FBb0I7Ozs7UUFBeEI7WUFDRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTs7Ozs7OztJQUVELCtCQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLElBQWUsRUFBRSxJQUFJLEVBQUUsS0FBc0I7UUFBOUQsaUJBeUNDOztZQXZDTyxRQUFRLEdBQWEsSUFBSSxDQUFDLFFBQVE7UUFFeEMsS0FBSyxJQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFFMUIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztvQkFFMUIsS0FBSyxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBRXJDLElBQUksS0FBSyxZQUFZLFNBQVMsRUFBRTtvQkFFOUIsSUFBSSxJQUFJ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Q0FBQyxtQkFBQSxRQUFRLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ2pEO1lBRUQsSUFBSSxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFO2dCQUMvQyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDL0M7U0FDRjtRQUVELElBQUksUUFBUSxZQUFZLFNBQVMsRUFBRTs7Z0JBQzNCLFdBQVcsR0FBRyxtQkFBQSxRQUFRLEVBQWE7WUFDekMsaUNBQWlDO1lBQ2pDLEtBQUssSUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RTtTQUNGO1FBRUQsSUFBSSxRQUFRLFlBQVksU0FBUyxFQUFFOztnQkFDM0IsV0FBVyxHQUFHLG1CQUFBLFFBQVEsRUFBYTtZQUV6QyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQy9CLEtBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBOU9ELElBOE9DOzs7O0lBN09DLHdCQUEyQjs7SUFDM0IsbUNBQXFDOztJQUNuQyw4QkFBZ0M7Ozs7O0lBQ2xDLHFDQUEyQzs7Ozs7SUFDM0MsMkJBQTRCOztJQUNoQixzQkFBa0I7O0lBQUUsMkJBQStCOztJQUFFLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEFmZUZvcm1BcnJheSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheSc7XG5cbmV4cG9ydCBjbGFzcyBGb3JtIHtcbiAgcHVibGljIHJvb3ROb2RlOiBHcm91cE5vZGU7XG4gIHB1YmxpYyB2YWx1ZVByb2Nlc3NpbmdJbmZvOiBhbnkgPSB7fTtcbiAgICBwdWJsaWMgZXhpc3RpbmdPcmRlcnM6IGFueSA9IHt9O1xuICBwcml2YXRlIF9kYXRhU291cmNlc0NvbnRhaW5lcjogRGF0YVNvdXJjZXM7XG4gIHByaXZhdGUgX3Nob3dFcnJvcnMgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHVibGljIHNjaGVtYTogYW55LCBwdWJsaWMgZm9ybUZhY3Rvcnk6IEZvcm1GYWN0b3J5LCBwdWJsaWMgcXVlc3Rpb25GYWN0b3J5OiBRdWVzdGlvbkZhY3RvcnkpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlc0NvbnRhaW5lciA9IG5ldyBEYXRhU291cmNlcygpO1xuICB9XG5cbiAgZ2V0IGRhdGFTb3VyY2VzQ29udGFpbmVyKCk6IERhdGFTb3VyY2VzIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXI7XG4gIH1cblxuICBzZWFyY2hOb2RlQnlQYXRoKG5vZGU6IEdyb3VwTm9kZSwgcGF0aCwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xuXG4gICAgY29uc3QgY2hpbGRyZW46IE5vZGVCYXNlID0gbm9kZS5jaGlsZHJlbjtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XG5cbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gY2hpbGRyZW5ba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcblxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XG4gICAgICAgICAgICBmb3VuZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVBhdGgoY2hpbGQsIHBhdGgsIGZvdW5kKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG5cbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYUNoaWxkOiBBcnJheU5vZGUgPSBjaGlsZCBhcyBBcnJheU5vZGU7XG5cbiAgICAgICAgICBhQ2hpbGQuY2hpbGRyZW4uZm9yRWFjaChhQ2hpbGROb2RlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UGF0aChhQ2hpbGROb2RlLCBwYXRoLCBmb3VuZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBzZWFyY2hOb2RlQnlRdWVzdGlvbklkKHF1ZXN0aW9uSWQ6IHN0cmluZywgcXVlc3Rpb25UeXBlPzogc3RyaW5nKTogQXJyYXk8Tm9kZUJhc2U+IHtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuICAgIGlmIChxdWVzdGlvblR5cGUpIHtcbiAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKHRoaXMucm9vdE5vZGUsIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZCh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvbklkLCBmb3VuZCk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShyb290Tm9kZTogYW55LCBxdWVzdGlvblR5cGU6IHN0cmluZyAsIGZvdW5kOiBBcnJheTxOb2RlQmFzZT4pIHtcblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShub2RlQXNHcm91cC5jaGlsZHJlbltvXSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSByb290Tm9kZS5xdWVzdGlvbjtcblxuICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5leHRyYXMgJiYgcXVlc3Rpb25CYXNlLmV4dHJhcy50eXBlICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSA9PT0gcXVlc3Rpb25UeXBlKSB7XG4gICAgICAgIGZvdW5kLnB1c2gocm9vdE5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZE5vZGVzQnlRdWVzdGlvbklkKHJvb3ROb2RlOiBOb2RlQmFzZSwgcXVlc3Rpb25JZDogc3RyaW5nLFxuICAgIHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPikge1xuICAgIGlmIChyb290Tm9kZS5xdWVzdGlvbi5rZXkgPT09IHF1ZXN0aW9uSWQpIHtcbiAgICAgIHJlc3VsdHMucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZChub2RlLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cblxuICBnZXQgdmFsaWQoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5yb290Tm9kZS5jb250cm9sLnZhbGlkO1xuICB9XG5cbiAgc2V0IHNob3dFcnJvcnMoc2hvdzogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dFcnJvcnMgPSBzaG93O1xuICB9XG5cbiAgZ2V0IHNob3dFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dFcnJvcnM7XG4gIH1cblxuICBtYXJrSW52YWxpZENvbnRyb2xzKG5vZGU6IEdyb3VwTm9kZSwgaW52YWxpZENvbnRyb2xOb2Rlcz86IGFueSkge1xuXG5cbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuXG4gICAgICAgICAgdGhpcy5tYXJrSW52YWxpZENvbnRyb2xzKGNoaWxkLCBpbnZhbGlkQ29udHJvbE5vZGVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgY29uc3QgYzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuXG4gICAgICAgICAgICBpZiAoIWMudmFsaWQgJiYgIWMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGludmFsaWRDb250cm9sTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkQ29udHJvbE5vZGVzLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYy5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlOb2RlOiBBcnJheU5vZGUgPSBjaGlsZCBhcyBBcnJheU5vZGU7XG5cbiAgICAgICAgICBpZiAoYXJyYXlOb2RlICYmIGFycmF5Tm9kZS5jaGlsZHJlbiAmJiBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBfLmZvckVhY2goYXJyYXlOb2RlLmNoaWxkcmVuLCAoZ3JvdXBOb2RlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5tYXJrSW52YWxpZENvbnRyb2xzKGdyb3VwTm9kZSwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xOb2RlcztcbiAgfVxuXG4gIHVwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scygpIHtcbiAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XG4gIH1cblxuXG4gIHVwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKCkge1xuICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHRoaXMucm9vdE5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKHJvb3ROb2RlLmNvbnRyb2wpIHtcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgIChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cbiAgcHJpdmF0ZSBfdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgIChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhub2RlQXNHcm91cC5jaGlsZHJlbltvXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKG5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=