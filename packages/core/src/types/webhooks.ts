export type WebhookEntity = 'ACCOUNT' | 'WORKSPACE' | 'ACTIVITY';

export type WebhookAction = 'CREATE' | 'UPDATE' | 'DELETE';

export interface WebhookMetadata {
  timestamp: string;
  source: 'core-api';
  eventId: string;
  version: '1.0';
}

export interface AccountData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  platformData: string;
  language: string;
}

export interface WorkspaceData {
  id: string;
  name: string;
  description: string;
  expiresAt: string;
  platformData: string;
}

export interface ActivityData {
  id: string;
  name: string;
  description: string;
  platformData: string;
}

interface WebhookEventBase<TData> {
  action: WebhookAction;
  data: TData;
  previousData?: TData;
  metadata: WebhookMetadata;
}

export interface AccountWebhookEvent extends WebhookEventBase<AccountData> {
  entity: 'ACCOUNT';
}

export interface WorkspaceWebhookEvent extends WebhookEventBase<WorkspaceData> {
  entity: 'WORKSPACE';
}

export interface ActivityWebhookEvent extends WebhookEventBase<ActivityData> {
  entity: 'ACTIVITY';
}

export type WebhookEvent = AccountWebhookEvent | WorkspaceWebhookEvent | ActivityWebhookEvent;
