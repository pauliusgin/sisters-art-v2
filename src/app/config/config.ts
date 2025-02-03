export const jwt = {
    secret: process.env.JWT_SECRET,
    config: {
        expiresIn: process.env.JWT_DURATION,
    },
    trustedKeyConfig: {
        expiresIn: process.env.JWT_TRUSTED_KEY_DURATION,
    },
};

export const dingConfiguration = {
    secretToken: process.env.DING_API_KEY,
    url: process.env.DING_URL,
    customerUUID: process.env.DING_CUSTOMER_UUID,
    bypass: process.env.SMS_OTP_BYPASS === "true",
    otpCodeBypass: process.env.SMS_CODE_OTP_BYPASS,
};
