import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.schema';
import { Model } from 'mongoose';
import { TasksDTO } from './tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>    
    ) {}

    async createTask(task: TasksDTO) {
        try {
            const createdTaskDetails = await new this.taskModel(task).save();
            return createdTaskDetails;
        } catch(e) {
            throw e;
        }
    }

    async getAllTasks() {
        try {
            return await this.taskModel.find({});
        } catch(e) {
            throw e;
        }
    }

    async getTaskById(id) {
        try {
            return await this.taskModel.findById(id);
        } catch (e) {
            throw e;
        }
    }

    async updateTask(id: string, task: TasksDTO) {
        try {
            return await this.taskModel.findByIdAndUpdate(id, task, {new:true}).exec()
        } catch(e) {
            throw e;
        }
    }

    async deleteTask(id: string) {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
}
