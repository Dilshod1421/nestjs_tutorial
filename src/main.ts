import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core"
// import {ValidationPipe} from '@nestjs/common'
import {ValidationPipe} from './pipe/validation.pipe'
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT || 3000;
    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .setTitle('NestJS TEST')
        .setDescription('REST API')
        .setVersion('1.0.0')
        .addTag('NodeJS, NestJS, Postgres, sequalize')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
    
    app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);
        
    });
    } catch (error) {
        console.log(error);        
    }    
}

start();