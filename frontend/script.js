"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var root = 'http://127.0.0.1:5000';
var sessionID;
$('#action_post').on('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        if (!sessionID)
            return [2];
        post((_a = $('#input_post').val()) === null || _a === void 0 ? void 0 : _a.toString()).then(function () {
            get(updateOutput);
        });
        return [2];
    });
}); });
$('#action_get').on('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!sessionID)
            return [2];
        get(updateOutput);
        return [2];
    });
}); });
$('#action_login').on('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var username, password;
    var _a, _b;
    return __generator(this, function (_c) {
        username = (_a = prompt("Enter username")) !== null && _a !== void 0 ? _a : "";
        password = (_b = prompt("Enter password")) !== null && _b !== void 0 ? _b : "";
        login(username, password, function (res) {
            sessionID = res.sid;
            $('#session_id').replaceWith($('<div>', {
                text: "".concat(res.username, ":   ").concat(res.sid),
                id: "session_id"
            }));
            get(updateOutput);
        });
        return [2];
    });
}); });
$('#action_logout').on('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logout(sessionID);
        $('#session_id').replaceWith($('<div>', {
            text: "Logged out: {sid}",
            id: "session_id"
        }));
        return [2];
    });
}); });
$('#action_register').on('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        register((_a = prompt("Enter new username")) !== null && _a !== void 0 ? _a : "", (_b = prompt("Enter new password")) !== null && _b !== void 0 ? _b : "", alert);
        return [2];
    });
}); });
function updateOutput(data) {
    $('#output').replaceWith(generateListElementFromArray(data));
}
function get(onSuccess) {
    fetch("".concat(root, "/get?sid=").concat(sessionID))
        .then(function (res) { return res.json(); })
        .then(function (res) { return res.response; })
        .then(onSuccess);
}
function post(body, onSuccess) {
    if (!body)
        return emptyPromise();
    return fetch("".concat(root, "/post?body=").concat(encodeURIComponent(body)))
        .then(function (res) { return res.status; })
        .then(onSuccess);
}
function login(username, password, onSuccess) {
    if (onSuccess === void 0) { onSuccess = function () { }; }
    fetch("".concat(root, "/login"), {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(function (res) { return res.json(); })
        .then(function (res) { return res.response; })
        .then(onSuccess);
}
function logout(sessionID) {
    fetch("".concat(root, "/logout"), {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ sid: sessionID })
    });
}
function register(username, password, onSuccess) {
    if (onSuccess === void 0) { onSuccess = function () { }; }
    fetch("".concat(root, "/register"), {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(function (res) { return res.json(); }, alert)
        .then(function (res) { return res.response; })
        .then(onSuccess);
}
function generateListElementFromArray(array) {
    var list = $('<ul>');
    list.attr("id", "output");
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var elt = array_1[_i];
        $('<li>', {
            text: elt
        }).appendTo(list).fadeIn();
    }
    return list;
}
function emptyPromise() {
    return Promise.resolve();
}
