"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerController = void 0;
const TravelerPrismaRepository_1 = require("./repositories/TravelerPrismaRepository");
const traveler_create_service_1 = require("./traveler.create.service");
class TravelerController {
    async create(request, response) {
        const { body } = request;
        const travelerPrismaReposistory = new TravelerPrismaRepository_1.TravelerPrismaReposistory();
        const createTravelerService = new traveler_create_service_1.CreateTravelerService(travelerPrismaReposistory);
        const result = await createTravelerService.execute({ body });
        if (result.body instanceof Error) {
            return response.status(result.statusCode).json({ error: result.body.message });
        }
        return response.status(result.statusCode).json(result.body);
    }
}
exports.TravelerController = TravelerController;
