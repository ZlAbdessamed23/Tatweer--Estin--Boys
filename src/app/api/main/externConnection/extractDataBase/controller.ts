import { Pool } from 'pg';
import { 
  DatabaseRequestData, 
  DatabaseQueryResult,
  DatabaseConnectionError,
  TableNotFoundError 
} from './types';
import { throwAppropriateError } from '@/lib/error-handler/throwError';

export async function queryDatabase(
  data: DatabaseRequestData
): Promise<DatabaseQueryResult> {
  let pool: Pool | null = null;

  try {
    // Create a new connection pool
    pool = new Pool({
      connectionString: data.databaseUrl,
      ssl: {
        rejectUnauthorized: false // Needed for some cloud database providers
      }
    });

    // Test the connection
    await pool.connect();

    // Query to check if table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      );
    `, [data.tableName]);

    if (!tableCheck.rows[0].exists) {
      throw new TableNotFoundError(`Table ${data.tableName} not found`);
    }

    // Query the table
    const result = await pool.query(`SELECT * FROM ${data.tableName}`);

    const queryResult: DatabaseQueryResult = {
      data: result.rows,
      metadata: {
        tableName: data.tableName,
        rowCount: result.rowCount || 0,
        timestamp: new Date().toISOString()
      }
    };

    return queryResult;

  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        throw new DatabaseConnectionError(error.message);
      }
    }
    throw throwAppropriateError(error);
  } finally {
    // Clean up the connection pool
    if (pool) {
      await pool.end();
    }
  }
}

// Validate database URL format
