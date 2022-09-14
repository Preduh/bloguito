"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const missing_param_error_1 = require("../errors/missing-param-error");
const TravelerInMemoryRepository_1 = require("./repositories/TravelerInMemoryRepository");
const traveler_create_service_1 = require("./traveler.create.service");
let travelerInMemoryRepository;
let createTravelerService;
const makeSut = () => {
    travelerInMemoryRepository = new TravelerInMemoryRepository_1.TravelerInMemoryRepository();
    createTravelerService = new traveler_create_service_1.CreateTravelerService(travelerInMemoryRepository);
    return createTravelerService;
};
(0, vitest_1.describe)('Create traveler', () => {
    (0, vitest_1.beforeAll)(() => {
        travelerInMemoryRepository = new TravelerInMemoryRepository_1.TravelerInMemoryRepository();
        createTravelerService = new traveler_create_service_1.CreateTravelerService(travelerInMemoryRepository);
    });
    (0, vitest_1.it)('Should be able to create a new traveler', async () => {
        const traveler = {
            body: {
                username: 'any_username',
                email: 'any_email',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(201);
        (0, vitest_1.expect)(result.body).toHaveProperty('id');
    });
    (0, vitest_1.it)('Should not be able to create a new traveler if username already exists', async () => {
        const traveler = {
            body: {
                username: 'any_username',
                email: 'any_email',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new Error('This username already exists'));
    });
    (0, vitest_1.it)('Should not be able to create a new traveler if email already exists', async () => {
        const traveler = {
            body: {
                username: 'another_username',
                email: 'any_email',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new Error('This email already exists'));
    });
    (0, vitest_1.it)('Should not able to create a new traveler if the confirmation password is different from the password', async () => {
        travelerInMemoryRepository = new TravelerInMemoryRepository_1.TravelerInMemoryRepository();
        createTravelerService = new traveler_create_service_1.CreateTravelerService(travelerInMemoryRepository);
        const traveler = {
            body: {
                username: 'any_username',
                email: 'any_email',
                password: 'any_password',
                confirmPassword: 'another_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new Error('The password and confirmation password must be the same'));
    });
    (0, vitest_1.it)('Should return 400 if no username is provided', async () => {
        const createTravelerService = makeSut();
        const traveler = {
            body: {
                email: 'any_email',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new missing_param_error_1.MissingParamError('username'));
    });
    (0, vitest_1.it)('Should return 400 if no email is provided', async () => {
        const createTravelerService = makeSut();
        const traveler = {
            body: {
                username: 'any_username',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new missing_param_error_1.MissingParamError('email'));
    });
    (0, vitest_1.it)('Should return 400 if no password is provided', async () => {
        const createTravelerService = makeSut();
        const traveler = {
            body: {
                username: 'any_username',
                email: 'any_email',
                confirmPassword: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new missing_param_error_1.MissingParamError('password'));
    });
    (0, vitest_1.it)('Should return 400 if no confirm password is provided', async () => {
        const createTravelerService = makeSut();
        const traveler = {
            body: {
                username: 'any_username',
                email: 'any_email',
                password: 'any_password'
            }
        };
        const result = await createTravelerService.execute(traveler);
        (0, vitest_1.expect)(result.statusCode).toBe(400);
        (0, vitest_1.expect)(result.body).toEqual(new missing_param_error_1.MissingParamError('confirmPassword'));
    });
});
