"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerInMemoryRepository = void 0;
const crypto_1 = require("crypto");
class TravelerInMemoryRepository {
    travelers = [];
    async save(data) {
        const traveler = {
            id: (0, crypto_1.randomUUID)(),
            ...data.body
        };
        this.travelers.push(traveler);
        return traveler;
    }
    async findByUsername(username) {
        const traveler = this.travelers.find(traveler => traveler.username === username);
        if (traveler === undefined)
            return null;
        return traveler;
    }
    async findByEmail(email) {
        const traveler = this.travelers.find(traveler => traveler.email === email);
        if (traveler === undefined)
            return null;
        return traveler;
    }
}
exports.TravelerInMemoryRepository = TravelerInMemoryRepository;
