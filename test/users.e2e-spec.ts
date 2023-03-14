import { INestApplication } from "@nestjs/common"
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as request from "supertest";

describe("UserController (e2e)", () => {
    let app: INestApplication;
    let token: string;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'jogn@gnail.com',
                password: 'John123!123'
            });
        token = response.body.token;
    });
    it('/users (GET) --> 200 OK', () => {
        return request(app.getHttpServer())
            .get('/users/all')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
    })
})