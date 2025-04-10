import { RecordModel } from "pocketbase";

export interface Todo extends RecordModel {
    id: string;
    title: string;
    description: string;
    priority: number;
    deadline: string;
}