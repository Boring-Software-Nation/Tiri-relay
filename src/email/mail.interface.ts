export interface MailService {

    /**
     * @description Send email
     */
    sendMail(content: Object): Promise<void>;

}
