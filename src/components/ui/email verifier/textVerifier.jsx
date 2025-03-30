const handleVerification = () => {
  const verifier = EmailVerifier({
    number: 6,
    userEmail: "user@example.com",
    userName: "John Doe"
  });

  const code = verifier.sendEmail();

  const isVerified = verifier.verifyCode("123456");

  if (isVerified) {

  }
};