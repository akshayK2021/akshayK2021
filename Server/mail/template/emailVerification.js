exports.otpTemplate=(otp)=>{
return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF_8">
        <title>Password Update Confirmation</title> 
         <style> 
            body{
                background-color: #ffffff;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin:0;
                padding:0;
                display:flex; 
                flex-direction:column;
                 justify-content:center;
                min-height:100vh;
            }

            .container{
                max-width: 600px;
                margin:0 auto;
                padding:20px;
                text-align: center;
            }

            .logo{
                max-width: 200px;
                margin-bottom: 20px;
            }
            .message{
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .body{
                font-size: 16px;
                margin-bottom: 20px;
            }

            .support{
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            .highlight{
                font-weight: bold;
            }
         </style> 
     </head>
      <body class="container">
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">OTP verification Email</div>
            <div class="body">
                <p>Dear User,</p>
                <p>Thank you for registering with StudyNotion. To complete your registration, please use the following {One-Time-Password} to verify Your account:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.Once your account is verified, you will have access to our platform and its feature</p>
                
            </div>
            <div class="support">
                If you have any questions or need further assistance, please feel free to reach at <a href="mailto:akshaykawadse14@gmail.com">akshaykawadse14@gmail.com</a>.We are here to help
            </div>
         
        </div>
    
    </body>
</html>`
};

