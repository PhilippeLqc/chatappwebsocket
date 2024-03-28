import { Boardlist } from './boardlist';

export interface Task {
    id: number | null | undefined;
    name: string | null | undefined;
    description: string | null | undefined;
    date: string | null | undefined;
    status: string | null | undefined;
    boardlist: Boardlist | null | undefined;
}