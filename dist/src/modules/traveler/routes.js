"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelerRoutes = void 0;
const express_1 = require("express");
const traveler_controller_1 = require("./traveler.controller");
const travelerRoutes = (0, express_1.Router)();
exports.travelerRoutes = travelerRoutes;
const travelerController = new traveler_controller_1.TravelerController();
travelerRoutes.post('/', (req, res) => {
    void travelerController.create(req, res);
});
