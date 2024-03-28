import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "./tasks.schema";

export class TasksDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: string;
}