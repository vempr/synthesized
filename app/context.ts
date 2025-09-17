import { createContext } from 'react-router';

interface UserIdentity {
  id: string;
  user_id: string;
  identity_data?: {
    [key: string]: any;
  };
  identity_id: string;
  provider: string;
  created_at?: string;
  last_sign_in_at?: string;
  updated_at?: string;
}

interface Factor {
  /** ID of the factor. */
  id: string;

  /** Friendly name of the factor, useful to disambiguate between multiple factors. */
  friendly_name?: string;

  /**
   * Type of factor. `totp` and `phone` supported with this version
   */
  factor_type: 'totp' | 'phone' | (string & {});

  /** Factor's status. */
  status: 'verified' | 'unverified';

  created_at: string;
  updated_at: string;
}

interface UserAppMetadata {
  provider?: string;
  [key: string]: any;
}

interface UserMetadata {
  [key: string]: any;
}

type User = {
  id: string;
  app_metadata: UserAppMetadata;
  user_metadata: UserMetadata;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentity[];
  is_anonymous?: boolean;
  is_sso_user?: boolean;
  factors?: Factor[];
  deleted_at?: string;
};

export const userContext = createContext<User | null>(null);
