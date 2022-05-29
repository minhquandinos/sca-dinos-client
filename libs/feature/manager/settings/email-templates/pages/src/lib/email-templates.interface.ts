export interface EmailTemplatesListInterface {
    category: string;
    title: string;
    id: number;
    sort: number;
    translatePathForTitle?: string;
}

export interface EmailTemplatesInterface extends EmailTemplatesListInterface {
    template_key: string;
    subject: string;
    body: string;
    description: string;
    tokens: string;
    display_send_copy_option: number;
    send_copy_to_managers: number;
    body_wysiwyg_editor: number;
    hidden: number;
    translatePathForDescription?: string;
}
