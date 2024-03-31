export interface MessageDto{
    id: string;
    message: string;
    projectId: string;
    userId: number | null | undefined;
}