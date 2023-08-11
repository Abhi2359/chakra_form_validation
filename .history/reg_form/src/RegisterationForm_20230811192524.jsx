import {
  FormControl,
  FormLabel,
  Input,
  Box,
  InputRightElement,
  InputGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import zxcvbn from "zxcvbn";

function RegisterationForm() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFullNameChange = (e) => {
    const value = e.target.value;

    setFullName(value);
    setFullNameError("");
    validateForm();
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
    validateForm();
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(" ");
    // Calculate password strength using zxcvbn
    const passwordStrengthResult = zxcvbn(value);
    const score = passwordStrengthResult.score;

    // Map the score to labels for display
    let strengthLabel = "Weak";
    if (score >= 3) {
      strengthLabel = "Stronger";
    } else if (score >= 2) {
      strengthLabel = "Strong";
    } else {
      strengthLabel = "Weak";
    }

    setPasswordStrength(strengthLabel);

    validateForm();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Input Field Validation Function
  // const validateName = () => {
  //   const isFullNameValid = /^[A-Za-z\s]+$/.test(fullName);

  //   setFullNameError(isFullNameValid ? "" : "Invalid Full Name");
  // };
  // const validateEmail = () => {
  //   const isEmailValid = /\S+@\S+\.\S+/.test(email);

  //   setEmailError(isEmailValid ? "" : "Invalid Email");
  // };
  // const validatePassword = () => {
  //   const isPasswordValid = password.length >= 8;

  //   setPasswordError(
  //     isPasswordValid ? "" : "Password must be at least 8 characters"
  //   );
  // };


  //Form Validation 
  const validateForm =()=>{
    const isFullNameValid = /^[A-Za-z\s]+$/.test(fullName);
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 8;
     setIsFormValid( isFullNameValid && isPasswordValid && isEmailValid)
  }
   
 
  return (
    <Box maxW="400px" m="auto" p="4" my="40px">
      <FormControl isRequired isInvalid={fullNameError !== ""}>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
          placeholder="Enter Your FullName"
        />
        <Text color="red.500" fontSize="sm" mt="1">
          {fullNameError}
        </Text>
      </FormControl>
      <FormControl isRequired my="4" isInvalid={emailError !== ""}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="user@example.com"
        />
        <Text color="red.500" fontSize="sm" mt="1">
          {emailError}
        </Text>
      </FormControl>
      <FormControl isRequired my="4" isInvalid={passwordError !== ""}>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={handlePasswordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text color="red.500" fontSize="sm" mt="1">
          {passwordError}
        </Text>
        {passwordStrength && (
          <Text
            mt={2}
            fontSize="sm"
            color={
              passwordStrength === "Stronger"
                ? "green"
                : passwordStrength === "Strong"
                ? "blue"
                : "red"
            }
          >
            Password Strength: {passwordStrength}
          </Text>
        )}
      </FormControl>
      <button
        type="submit"
       
        disabled={!isFormValid}
        style={{
          backgroundColor: isFormValid ? "green" : "gray",
          color: "white",
          padding: "10px",
          cursor: isFormValid ? "pointer" : "not-allowed",
        }}
      >
        Register
      </button>
    </Box>
  );
}

export default RegisterationForm;
