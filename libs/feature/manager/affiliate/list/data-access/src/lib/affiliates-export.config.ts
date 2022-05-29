import { getConfig } from '@scaleo/utils';

const columns =
    'id,company_name,firstname,lastname,status,email,phone,contacts,custom_fields,internal_notes,tags,invoice_frequency,payment_methods,approved_balance,balance_due,created,visited,managers_assigned,country,region,city,address,postal_code,traffic_types,custom_fields';
export const allAffiliatesColumnsForExport = getConfig<string>(columns);
