export interface ContactConfiguration {
  readonly email: string | null;
  readonly whatsapp: string | null;
  readonly phone: string | null;
  readonly address: string | null;
  readonly status: 'pending' | 'available';
}

export const SITE_CONFIG = {
  name: 'Nexo',
  year: 2026,
  contact: {
    email: null,
    whatsapp: null,
    phone: null,
    address: null,
    status: 'pending',
  } satisfies ContactConfiguration,
  contactNotice: 'Os canais oficiais de contato estão em definição. Prepare seu briefing e guarde o arquivo para compartilhá-lo com a Nexo quando um canal oficial estiver disponível.',
} as const;
