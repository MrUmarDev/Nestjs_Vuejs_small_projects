import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { Customer } from '../customer/models/customer.model';
import { Seller } from '../seller/models/seller.model';
import { MailerService } from '@nestjs-modules/mailer';

const { env } = process;

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  sendAdminConfirmation = async (admin: Admin): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    await this.mailService.sendMail({
      to: admin.email,
      subject: "This is from Installment Payment. Welcome! Please confirm your email",
      template: './confirmation',
      context: {
        name: admin.username,
        url: activation_url,
      },
    });
  };

  sendCustomerConfirmation = async (customer: Customer): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/customer/activate/${customer.activation_link}`;
    await this.mailService.sendMail({
      to: customer.email,
      subject: "This is from Installment Payment. Welcome! Please confirm your email",
      template: './confirmation',
      context: {
        name: customer.username,
        url: activation_url,
      },
    });
  };

  sendSellerConfirmation = async (seller: Seller): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/seller/activate/${seller.activation_link}`;
    await this.mailService.sendMail({
      to: seller.email,
      subject: "This is from Installment Payment. Welcome! Please confirm your email",
      template: './confirmation',
      context: {
        name: seller.username,
        url: activation_url,
      },
    });
  };
}
