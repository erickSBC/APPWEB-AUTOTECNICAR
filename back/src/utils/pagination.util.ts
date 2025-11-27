// src/common/utils/pagination.util.ts
export interface PaginationQuery {
  skip?: number;
  take?: number;
}

export function normalizePagination(query: PaginationQuery) {
  let skip = Number(query.skip);
  let take = Number(query.take);

  if (isNaN(skip) || skip < 0) skip = 0;
  if (isNaN(take) || take <= 0) take = 10; // valor por defecto

  return { skip, take };
}
