"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerPrismaReposistory = void 0;
const client_1 = require("../../../database/client");
class TravelerPrismaReposistory {
    async save({ body }) {
        const traveler = await client_1.prismaClient.traveler.create({
            data: {
                username: body.username,
                email: body.email,
                password: body.password
            }
        });
        return traveler;
    }
    async findByUsername(username) {
        const traveler = await client_1.prismaClient.traveler.findFirst({
            where: { username }
        });
        return traveler;
    }
    async findByEmail(email) {
        const traveler = await client_1.prismaClient.traveler.findFirst({
            where: { email }
        });
        return traveler;
    }
}
exports.TravelerPrismaReposistory = TravelerPrismaReposistory;
