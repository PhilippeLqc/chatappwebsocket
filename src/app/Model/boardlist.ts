import { Task } from './task';
import { Project } from './project';

export interface Boardlist {
    id: number | null | undefined;
    name: string | null | undefined;
    tasks: Task[] | null | undefined;
    project : Project | null | undefined;
}