export interface Pagination {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  size: number;
}

export interface Result<T> {
  ok: boolean;
  code: number;
  data: Required<T>;
  message: string;
}

export type ListResult<T> = Result<{
  current: number;
  total: number;
  size: number;
  pages: number;
  /** 列表数据 */
  records: Required<T>[];
}>;
