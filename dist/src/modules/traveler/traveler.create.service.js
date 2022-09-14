"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTravelerService = void 0;
const missing_param_error_1 = require("../errors/missing-param-error");
class CreateTravelerService {
    travelerRepository;
    constructor(travelerRepository) {
        this.travelerRepository = travelerRepository;
    }
    async execute(data) {
        const requiredFields = ['username', 'email', 'password', 'confirmPassword'];
        for (const field of requiredFields) {
            if (data.body[field] === undefined) {
                return {
                    statusCode: 400,
                    body: new missing_param_error_1.MissingParamError(field)
                };
            }
        }
        let traveler;
        traveler = await this.travelerRepository.findByUsername(data.body.username);
        if (traveler !== null) {
            return {
                statusCode: 400,
                body: new Error('This username already exists')
            };
        }
        traveler = await this.travelerRepository.findByEmail(data.body.email);
        if (traveler !== null) {
            return {
                statusCode: 400,
                body: new Error('This email already exists')
            };
        }
        if (data.body.password !== data.body.confirmPassword) {
            return {
                statusCode: 400,
                body: new Error('The password and confirmation password must be the same')
            };
        }
        const travelerCreated = await this.travelerRepository.save(data);
        return {
            statusCode: 201,
            body: travelerCreated
        };
    }
}
exports.CreateTravelerService = CreateTravelerService;
