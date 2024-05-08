export class CreateEmailDto {
    readonly wallet: string;
    readonly sender: string;
    readonly subject: string;
    readonly message: string;
}
