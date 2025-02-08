/* eslint-disable */


// Type for the incoming request data
export type DatabaseRequestData = {
    databaseUrl: string;
    tableName: string;
  };
  
  // Required fields for validation
  export const requiredDatabaseFields: (keyof DatabaseRequestData)[] = [
    "databaseUrl",
    "tableName"
  ];
  
  // Type for the successful response
  export type DatabaseQueryResult = {
    data: any[]; // Type can be made more specific based on your needs
    metadata: {
      tableName: string;
      rowCount: number;
      timestamp: string;
    };
  };
  
  // Error types
  export type DatabaseError = {
    code: string;
    message: string;
    details?: string;
  };
  
  // Custom error classes
  export class DatabaseConnectionError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DatabaseConnectionError';
    }
  }
  
  export class TableNotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'TableNotFoundError';
    }
  }