import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksDTO } from './tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {}
    @Get()
    getAllTasks(@Res({ passthrough: true }) res: Response) {
        try {
            return this.tasksService.getAllTasks();
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Error while fetching task"});
        }
        
    }

    @Get(":id")
    getTaskById(@Param("id") id, @Res({ passthrough: true }) res: Response) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() task: TasksDTO, @Res({ passthrough: true }) res: Response) {
        try {
            return await this.tasksService.createTask(task);
        } catch(error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Error while creating new task"});
        }
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async updateTask(@Param("id") id: string, @Body() task: TasksDTO, @Res({ passthrough: true }) res: Response) {
        try {
            return await this.tasksService.updateTask(id, task);
        } catch(error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Error while creating new task"});
        }
    }

    @Delete(":id")
    async deleteTask(@Param("id") id, @Res({ passthrough: true }) res: Response) {
        try {
            return await this.tasksService.deleteTask(id);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Error while creating new task"});
        }
    }
}
