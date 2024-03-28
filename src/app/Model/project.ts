import { User } from './user';
import { Task } from './task';
import { Boardlist } from './boardlist';

export interface Project {
    id: number | null | undefined;
    name: string | null | undefined;
    description: string | null | undefined;
    boardlist: Boardlist[] | null | undefined;
    user: User[] | null | undefined;
}