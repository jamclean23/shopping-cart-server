// Generates confirmation email html

function generateEmail (name, message, senderEmail, mode = 'confirmation') {
    const mountainImg = `https://drive.google.com/uc?export=view&id=1Eo4xnd7JZuxTmGZdPn0t2j_8UzdZLvVX`;
    
    if (mode === 'confirmation') {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            </head>
            <body style="background: url(${mountainImg}) right / contain no-repeat;background-color: #1F1F2D; padding: 1rem 4rem;">

            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <a href="https://jamclean23.github.io/jm-portfolio/" style="text-decoration: none; display: inline-block; color: rgb(255, 255, 255); background-color: #333f4c; font-size: 1rem; border-radius: 30px; padding: .3rem .7rem; border: none;">jm_dev</a>
                    </td>
                </tr>
            </table>
            <p style="color: rgb(255, 255, 255)">Hello ${name},</p>
            <p style="color: rgb(255, 255, 255)">Your message was received.<br/>I appreciate your communication and will respond as soon as possible.</p>
            <p style="color: rgb(255, 255, 255)">Best regards,</p>
            <p style="color: rgb(255, 255, 255); font-weight: bold;">Jesse McLean</p>
            <p style="color: rgb(255, 255, 255);">Your message:</p>
            <p style="color: rgb(255, 255, 255);">"${message}"</p>
            
            
            </body>
            </html>`;
    } else if (mode === 'toHost') {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="background: url(${mountainImg}) right / 25% auto no-repeat;background-color: #1F1F2D; padding: 1rem 4rem;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <a href="https://jamclean23.github.io/jm-portfolio/" style="text-decoration: none; display: inline-block; color: rgb(255, 255, 255); background-color: #333f4c; font-size: 1rem; border-radius: 30px; padding: .3rem .7rem; border: none;">jm_dev</a>
                        </td>
                    </tr>
                </table>
                <p style="color: rgb(255, 255, 255)">You received a new message from ${name} at ${senderEmail},</p>
                <p style="color: rgb(255, 255, 255);">Message:</p>
                <p style="color: rgb(255, 255, 255);">"${message}"</p>
            </body>
            </html>`;
    }
}

module.exports = generateEmail;