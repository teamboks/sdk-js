export interface PaginatedRequest {
  search?: string;
  page?: string;
  perPage?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  lte?: string;
  gte?: string;
}
