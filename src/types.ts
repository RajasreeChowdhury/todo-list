export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: 'High' | 'Medium' | 'Low';
    isEditing: boolean;
  }