"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
var roles_enum_1 = require("../enum/roles.enum");
var class_validator_1 = require("class-validator");
var CreateUserDto = function () {
    var _a;
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _roles_decorators;
    var _roles_initializers = [];
    var _roles_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateUserDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.roles = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _roles_initializers, void 0));
                __runInitializers(this, _roles_extraInitializers);
            }
            return CreateUserDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, class_validator_1.IsString)()];
            _lastName_decorators = [(0, class_validator_1.IsString)()];
            _email_decorators = [(0, class_validator_1.IsString)()];
            _password_decorators = [(0, class_validator_1.IsString)()];
            _roles_decorators = [(0, class_validator_1.IsEnum)(roles_enum_1.Role)];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: function (obj) { return "roles" in obj; }, get: function (obj) { return obj.roles; }, set: function (obj, value) { obj.roles = value; } }, metadata: _metadata }, _roles_initializers, _roles_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateUserDto = CreateUserDto;
