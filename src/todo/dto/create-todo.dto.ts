import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    user_id: number;
    // Add any other properties from your DTO as needed
  }
  