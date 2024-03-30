// Generate OTP


function generateOTP(length) {
    var otp = '';
    for (var i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

export default generateOTP;