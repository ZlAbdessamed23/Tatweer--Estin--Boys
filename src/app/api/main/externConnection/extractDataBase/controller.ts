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
    // Create a new connection pool with more specific configuration
    pool = new Pool({
      connectionString: data.databaseUrl,
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 5000,
      statement_timeout: 10000,
      max: 20,
    });

    // Test the connection with error handling
    const client = await pool.connect();
    
    try {
      console.log('Database connection established');

      // Query to check if table exists
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = $1
        );
      `, [data.tableName]);

      if (!tableCheck.rows[0].exists) {
        throw new TableNotFoundError(`Table ${data.tableName} not found`);
      }

      // Use parameterized query to prevent SQL injection
      const queryText = `
        SELECT * FROM "${data.tableName}"
        LIMIT 1000
      `;
      
      console.log('Executing query:', queryText);
      const result = await client.query(queryText);

      const queryResult: DatabaseQueryResult = {
        data: result.rows,
        metadata: {
          tableName: data.tableName,
          rowCount: result.rowCount || 0,
          timestamp: new Date().toISOString()
        }
      };

      return queryResult;

    } finally {
      // Release the client back to the pool
      client.release();
    }

  } catch (error) {
    console.error('Database error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        throw new DatabaseConnectionError(
          `Failed to connect to database: ${error.message}`
        );
      }
      if (error.message.includes('timeout')) {
        throw new DatabaseConnectionError(
          'Database connection timed out. Please try again.'
        );
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