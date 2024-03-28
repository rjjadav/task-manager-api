import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TaskStatus {
    pending = "pending",
    in_progress = "in_progress",
    done="done"
}

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true, enum: TaskStatus })
    status: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}


export const TaskSchema = SchemaFactory.createForClass(Task);

