import nodemailer from 'nodemailer'

export class EmailServices {
    private transporter : nodemailer.Transporter;

    constructor() {

        // console.log('Email configured for:', process.env.EMAIL_USER);

        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS,
            }
        })
    }

    private async sendEmail(
        to : string,
        subject : string,
        html : string
    ){
        try {
            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to : to,
                subject : subject,
                html : html
            });
            
            // console.log('Email Sent: ', info.messageId);
            return {
                success : true,
                message : info.messageId
            }
        } catch (error:any) {
            console.log("Email send error: ",error);
            return { success: false, error };
        }
    }

    async sendWelcomeEmail(
        name : string,
        email : string,
        username : string
    ) {
        const html = `
        <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to SplitCircle!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}! 👋</h2>
            <p>Thank you for joining SplitCircle. Your account has been created successfully.</p>
            <p><strong>Username:</strong> ${username}</p>
            <p>You can now start tracking expenses with your friends and groups.</p>
            <p>Get started by:</p>
            <ul>
              <li>Adding friends by searching their username</li>
              <li>Creating groups for shared expenses</li>
              <li>Adding your first expense</li>
            </ul>
          </div>
          <div class="footer">
            <p>SplitCircle - Track expenses with friends</p>
          </div>
        </div>
      </body>
      </html>
        `;

        return this.sendEmail(
            email,
            'Welcome To SplitCircle! 🎉',
            html
        )
    }

    async sendEmailChangeNotification(
        name : string,
        email : string,
        newEmail : string
    ) {
        const html = `
    <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .alert { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Address Changed</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Your email address has been successfully changed.</p>
            <p><strong>Old Email:</strong> ${email}</p>
            <p><strong>New Email:</strong> ${newEmail}</p>
            <div class="alert">
              <strong>⚠️ Security Notice:</strong> If you didn't make this change, please contact support immediately, which is not setuped yet 😂.
            </div>
          </div>
          <div class="footer">
            <p>SplitCircle</p>
          </div>
        </div>
      </body>
    </html> 
        `

        await this.sendEmail(
            email,
            'Email Address Changed - Security Alert',
            html
        )
        return this.sendEmail(
            newEmail,
            'Email Address Changed - Confirmation',
            html
        )
    }

    async sendPasswordChangeConfirmation(
        name : string,
        email : string,
    ) {
        const html = `
    <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f44336; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .alert { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Changed</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Your password has been successfully changed.</p>
            <div class="alert">
              <strong>⚠️ Security Notice:</strong> If you didn't make this change, please reset your password immediately and contact support.
            </div>
            <p>Change date: ${new Date().toLocaleString()}</p>
          </div>
          <div class="footer">
            <p>SplitCircle</p>
          </div>
        </div>
      </body>
      </html>
        `

        return this.sendEmail(
            email,
            'Password Changed - Security Alert',
            html
        )
    }

    async sendFriendAddedEmail(
      frienAddedName:string,
      friendAddedEmail : string,
      addedByName : string,
      addedByUsername : string
    ) {
      const html = 
      `
       <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #9C27B0; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Friend Added! 👥</h1>
          </div>
          <div class="content">
            <h2>Hi ${frienAddedName},</h2>
            <p><strong>${addedByName}</strong> (@${addedByUsername}) added you as a friend on SplitCircle!</p>
            <p>You can now share expenses and split bills together.</p>
          </div>
          <div class="footer">
            <p>SplitCircle</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail(
      friendAddedEmail,
      `${addedByName} added you as a friend`,
      html
    )
    }

    async sendGroupInviteEmail(
        invitedUsername : string,
        invitedEmail : string,
        groupName : string,
        invitedByName : string,
        invitedByUsername : string,
      ) {
    
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #673AB7; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Added to Group! 👥</h1>
          </div>
          <div class="content">
            <h2>Hi ${invitedUsername},</h2>
            <p><strong>${invitedByName}</strong> (@${invitedByUsername}) added you to the group:</p>
            <h3>"${groupName}"</h3>
            <p>You can now share expenses with other group members.</p>
          </div>
          <div class="footer">
            <p>SplitCircle</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    return this.sendEmail(
      invitedEmail,
       `You've been added to "${groupName}"`,
       html
    );
    }

    async sendSettlementEmail(
    recipient: { name: string; email: string },
    settlement: {
      amount: number;
      isGroupSettlement: boolean;
      groupName?: string;
      friendName?: string;
    },
    paidBy: { name: string; username: string }
  ) {
    const context = settlement.isGroupSettlement 
      ? `in group "${settlement.groupName}"` 
      : `with ${settlement.friendName}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .settlement-box { background: white; padding: 15px; border-left: 4px solid #4CAF50; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Recorded 💵</h1>
          </div>
          <div class="content">
            <h2>Hi ${recipient.name},</h2>
            <p><strong>${paidBy.name}</strong> (@${paidBy.username}) recorded a payment ${context}.</p>
            <div class="settlement-box">
              <h3>Settlement Amount</h3>
              <p style="font-size: 24px; color: #4CAF50; margin: 10px 0;"><strong>₹${settlement.amount.toFixed(2)}</strong></p>
            </div>
            <p>Your balances have been updated accordingly.</p>
          </div>
          <div class="footer">
            <p>SplitCircle</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    return this.sendEmail(
      recipient.email,
      `${paidBy.name} recorded a payment of ₹${settlement.amount}`,
      html
    );
    }

}