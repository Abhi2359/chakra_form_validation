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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    validateForm();
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateForm();
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
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

  // Form Validation Function
  const validateForm = () => {
    const isFullNameValid = /^[A-Za-z\s]+$/.test(fullName);
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 8;
    setIsFormValid(isFullNameValid && isEmailValid && isPasswordValid);
  };

  return (
    <Box maxW="400px" m="auto" p="4" my="40px">
      <FormControl isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
          placeholder="Enter Your FullName"
        />
      </FormControl>
      <FormControl isRequired my="4">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="user@example.com"
        />
      </FormControl>
      <FormControl isRequired my="4">
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
      <Button
        colorScheme="blue"
        disabled={!isFormValid}
        my="4"
        _disabled={{ opacity: 0.7, cursor: "not-allowed" }}
        _hover={{ transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
      >
        Register
      </Button>
    </Box>
  );
}

export default RegisterationForm;
