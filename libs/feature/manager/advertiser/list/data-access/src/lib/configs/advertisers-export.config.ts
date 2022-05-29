import { getConfig } from '@scaleo/utils';

const columns =
    'id,company_name,firstname,lastname,status,email,phone,contacts,custom_fields,notes,tags,created,visited,managers_assigned,country,region,city,address,postal_code';
export const allAdvertisersColumnsForExport = getConfig<string>(columns);
