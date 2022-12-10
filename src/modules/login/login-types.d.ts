import type {BuiltInProviderType} from 'next-auth/providers';
import type {ClientSafeProvider, LiteralUnion} from 'next-auth/react';

export type LoginProviders = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;
