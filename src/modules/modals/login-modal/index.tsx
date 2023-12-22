"use client"

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import ForgotPassword from "./forgot-password";
import ForgotPasswordSuccess from "./forgot-password-success";
import PhoneNumberVerification from "../change-phone-number-modal/phone-number-verification";
import SignInExistingPassword from "./sign-in-existing-password";
import SignInSignUp from "./sign-in-sign-up";
import SignInSuccess from "./sign-in-success";
import SignUpAccount from "./sign-up-account";
import SignUpPassword from "./sign-up-password";
import SignUpSuccess from "./sign-up-success";
import SignUpUserInfo from "./sign-up-user-info";

import useModalStore from "@/store/Modal";
import { useModalStepStore } from "@/store/modal-store/ModalStep";
import { useUserStore } from "@/store/User";
import useVerification from "@/lib/hooks/useVerification";

import { LoginCredsType } from "@/types/loginCreds";

import { mockUsers } from "@/lib/data";

// TODO: Account for phone number or email login.

const LoginModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();
  const { 
    step,
    resetPreviousSteps,
    updateToNextStep,
    updateToPreviousStep,
    resetAll,
  } = useModalStepStore();
  const {
    updateUser,
  } = useUserStore();

  const { verificationCode, setVerificationCode, isCodeIncorrect, setIsCodeIncorrect, isResent, setIsResent, resendCode, verifyCode } = useVerification();

  const [loginCreds, setLoginCreds] = useState<LoginCredsType>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState<boolean | null>(null);
  const [isAccountFound, setIsAccountFound] = useState<boolean | null>(null);

  const handleCloseModal = useCallback(() => {
    closeModal("login");
    resetAll();
    // TODO: Set global login that times out after successful signin and clear loginCreds after.
    setLoginCreds({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
    setVerificationCode(["", "", "", "", "", ""])
    setIsExistingUser(null);
    setIsPasswordIncorrect(null);
    setIsCodeIncorrect(false);
    setIsResent(false);
    setIsAccountFound(null);
  }, [closeModal, resetAll, setIsCodeIncorrect, setIsResent, setVerificationCode]);
  
  const handleSignIn = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (step === 2) {
      if ((loginCreds.username !== "") && (loginCreds.password !== "")) {
        // TODO: Perform password validation and authentication. 
        // Fetch user data from database once confirmed.
        const fetchedPasswordResult = mockUsers.filter(user => {
          if ((user.username === loginCreds.username) && (loginCreds.password == "test1")) {
            return user;
          }
        });

        if (fetchedPasswordResult.length > 0) {
          updateUser({
            id: 1,
            firstName: fetchedPasswordResult[0].firstName,
            lastName: fetchedPasswordResult[0].lastName,
            username: fetchedPasswordResult[0].username,
            phone: fetchedPasswordResult[0].phone,
            birthDate: 0,
          });
          updateToNextStep(3);

          // Clear login creds and reset isSigningInStore
          setLoginCreds({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
          });
          setIsExistingUser(null);
          setIsCodeIncorrect(false);
          setIsResent(false);
          setIsAccountFound(null);

          setTimeout(() => {
            closeModal("login");
            updateToNextStep(1);
            resetPreviousSteps();
          }, 5000);
        } else {
          setIsExistingUser(null);
          setIsPasswordIncorrect(true);
          console.error("PASSWORD DID NOT MATCH");
        }
      }
    } else if (step === 1) {
      const foundExistingUsername = mockUsers.find(user => user.username === loginCreds.username);
      if (foundExistingUsername) {
        // TODO: Perform username validation.
        // API call checking if username exists.
        // If exists, route to sign in password page.
        // If not, route to sign up page.
        setIsExistingUser(true);
        updateToNextStep(2);
      } else {
        setIsExistingUser(false);
        updateToNextStep(4);
      }
    } else {
      console.error(`NOT ALL FIELDS FILLED: ${loginCreds}`)
    }
  }, [closeModal, loginCreds, step, resetPreviousSteps, updateToNextStep, updateUser, setIsResent, setIsCodeIncorrect]);

  const handleSignUp = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Form validation at each step.

    if (step === 8) {
      setIsResent(false);
      // // Fetch verification code and compare to inputted.
      if (verificationCode.some((digit) => digit === null) === false) {
        if (verifyCode()) {
          updateToNextStep(9);
          setIsResent(false);
          // setIsVerificationIncorrect(false);
          setIsCodeIncorrect(false);
          setVerificationCode(["", "", "", "", "", ""]);

          // Clear login creds and reset isSigningInStore
          setLoginCreds({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
          });
          setTimeout(() => {
            closeModal("login");
            updateToNextStep(1);
            resetPreviousSteps();
        }, 5000);
        } else {
          setVerificationCode(["", "", "", "", "", ""]);
          setIsCodeIncorrect(true);
        }
      } else {
        console.error("DID NOT FILL OUT ALL BOXES");
      }
    } else if (step === 5) {
      if (
        (loginCreds.firstName !== "") 
        && (loginCreds.lastName !== "") 
        && (loginCreds.username !== "") 
        && (loginCreds.phone.split("").length === 10)
        && (/^\d{0,10}$/.test(loginCreds.phone)) 
        && (loginCreds.password !== "")
      ){
        setIsResent(false);
        updateToNextStep(8);
      }
    } else if (step === 7) {
      if ((loginCreds.firstName !== "") 
        && (loginCreds.lastName !== "") 
        && (loginCreds.username !== "") 
        && (loginCreds.phone.split("").length === 10)
        && (/^\d{0,10}$/.test(loginCreds.phone))
      ) {
        // TODO: First add user to database, then set data in user store.
        updateUser({
          id: 1,
          firstName: loginCreds.firstName,
          lastName: loginCreds.lastName,
          username: loginCreds.username,
          phone: loginCreds.phone,
          birthDate: 0,
        });
        updateToNextStep(5);
      }
    } else if (step === 4) {
      if (loginCreds.username !== "") {
        // Check database for existing username or phone.
        if (mockUsers.find((user) => user.username === loginCreds.username)) {
          setIsExistingUser(true);
          updateToNextStep(2);
        } else {
          updateToNextStep(7);
        }
        setIsResent(false);
        setIsCodeIncorrect(false);
      }
    } else {
      console.error(`NOT ALL FIELDS FILLED: ${loginCreds}`)
    }
  }, [closeModal, loginCreds, resetPreviousSteps, step, updateToNextStep, updateUser, setIsResent, setIsCodeIncorrect, setVerificationCode, verificationCode, verifyCode]);

  const handleBackFromVerification = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsCodeIncorrect(false);
    setIsResent(true);
    updateToPreviousStep();
  }, [setIsCodeIncorrect, setIsResent, updateToPreviousStep]);

  const handleForgotPassword = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (step === 11) {
      // TODO: Validate email or phone, then check if it exists in database.
      const foundAccount = mockUsers.find(user => user.username === loginCreds.username);

      if (foundAccount) {
        setIsAccountFound(true);
        updateToNextStep(13);
      } else {
        setIsAccountFound(false);
      }
      setLoginCreds({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      });
    }
  }, [loginCreds, step, updateToNextStep]);

  useEffect(() => {
    if (step === 1) {
      setIsExistingUser(null);
      setIsPasswordIncorrect(false);
      setIsCodeIncorrect(false);
      setIsResent(false);
      setIsAccountFound(null);
      setLoginCreds({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      });
    }
    if (step === 4) {
      setIsPasswordIncorrect(false);
    }
    if (step === 11) {
      setIsAccountFound(null);
    }
  }, [step, setIsResent, setIsCodeIncorrect]);

  return (
    <>
      {isModalOpen("login") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("login"),
          ["hidden"]: !isModalOpen("login"),
        })}>
          {(step === 1) && (
            <SignInSignUp
              handleCloseModal={handleCloseModal}
              handleSignIn={handleSignIn}
              loginCreds={loginCreds}
              setLoginCreds={setLoginCreds}
            /> 
          )}

          {(step === 2) && (
            <SignInExistingPassword
              isPasswordIncorrect={isPasswordIncorrect}
              handleCloseModal={handleCloseModal}
              handleSignIn={handleSignIn}
              loginCreds={loginCreds}
              setLoginCreds={setLoginCreds}
            />
          )}

          {(step === 3) && (
            <SignInSuccess
              handleCloseModal={handleCloseModal}
            />
          )}

          {(step === 4) && (
            <SignUpAccount
              isExistingUser={isExistingUser}
              handleCloseModal={handleCloseModal}
              handleSignUp={handleSignUp}
              loginCreds={loginCreds}
              setLoginCreds={setLoginCreds}
            />
          )}
            
          {(step === 5) && (
            <SignUpPassword
              handleCloseModal={handleCloseModal}
              handleSignUp={handleSignUp}
              loginCreds={loginCreds}
              setLoginCreds={setLoginCreds}
            />
          )}

          {(step === 7) && (
            <SignUpUserInfo
              handleCloseModal={handleCloseModal}
              handleSignUp={handleSignUp}
              loginCreds={loginCreds}
              setLoginCreds={setLoginCreds}
            />
          )}

          {(step === 8) && (
            <PhoneNumberVerification 
              isCodeIncorrect={isCodeIncorrect}
              isResent={isResent}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              resendCode={resendCode}
              handleBack={handleBackFromVerification}
              handleClose={handleCloseModal}
              handleSubmit={handleSignUp}
            />
          )}

          {(step === 9) && (
            <SignUpSuccess
              handleCloseModal={handleCloseModal}
            />
          )}

          {(step === 11) && (
            <ForgotPassword
              isAccountFound={isAccountFound}
              handleCloseModal={handleCloseModal}
              handleForgotPassword={handleForgotPassword}
              loginCreds={loginCreds}
              setLoginCreds={setLoginCreds}
            />
          )}

          {(step === 13) && (
            <ForgotPasswordSuccess
              handleCloseModal={handleCloseModal}
              loginCreds={loginCreds}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LoginModal;