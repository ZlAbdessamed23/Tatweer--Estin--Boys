/* eslint-disable */

export interface BaseRecord {
    id?: string | number;
    [key: string]: any;
  }
  
  export interface DynamicTableProps<T extends BaseRecord> {
    data: T[];
    config?: (keyof T)[];
    title?: string;
    statusColors?: {
      positive: string[];
      negative: string[];
    };
    customFormatters?: {
      [K in keyof T]?: (value: T[K]) => React.ReactNode;
    };
  }