'use client';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ArrowUpIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
  WrapItem,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { GenderEnum, UserDataEnum } from '@/enums/userData.enum';
import { createNewUser, uploadImageToStorage } from '@/firebase/functions';
import { useAccountsContext } from '@/providers/AccountsProvider';
import { userCollection } from '@/constants/Firebase.constants';
import { db } from '@/firebase/config';
import styles from './index.module.scss';

function RegisterCard() {
  const toast = useToast();

  const { accountsData } = useAccountsContext();

  const [status1, setStatus1] = useState(true);
  const [status2, setStatus2] = useState(true);
  const [status3, setStatus3] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const [show, setShow] = React.useState(false);
  const [image, setImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState();

  const handleClose = () => {
    setStatus1(true);
    setStatus2(true);
    setStatus3(true);
    setUsernameTaken(false);
    setEmailTaken(false);
    setShow(false);
    setImage(undefined);
    setImageToUpload(undefined);
    onClose();
  };

  async function saveUserToDB(uid, userData) {
    // backend save account details to firestore
    setDoc(doc(db, userCollection, uid), userData);
  }

  const handleClick = () => setShow(!show);

  const renderPasswordIcon = show ? (
    <ViewOffIcon color={'#E6E6E6'} cursor={'pointer'} onClick={handleClick} />
  ) : (
    <ViewIcon color={'#E6E6E6'} cursor={'pointer'} onClick={handleClick} />
  );

  const validateEmail = (e, setResult) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const email = e.target.value;
    setResult(email ? regex.test(email) : true);
  };

  const validatePassword = (e, setResult) => {
    const regex = /^.{8,}$/;
    const password = e.target.value;
    setResult(password ? regex.test(password) : true);
  };

  const checkUsername = async (e) => {
    const username = e.target.value;
    const result = accountsData
      ?.filter((doc) => doc.data().username === username)
      .at(0)
      ?.data().username;

    setUsernameTaken(result !== undefined ? true : false);
  };

  const checkEmail = async (e) => {
    const email = e.target.value;
    const result = accountsData
      ?.filter((doc) => doc.data().email === email)
      .at(0)
      ?.data().email;

    setEmailTaken(result !== undefined ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const emailInput = target.elements.namedItem(UserDataEnum.EMAIL);
    const firstNameInput = target.elements.namedItem(UserDataEnum.FIRST_NAME);
    const middleNameInput = target.elements.namedItem(UserDataEnum.MIDDLE_NAME);
    const lastNameInput = target.elements.namedItem(UserDataEnum.LAST_NAME);
    const nickNameInput = target.elements.namedItem(UserDataEnum.NICKNAME);
    const genderInput = target.elements.namedItem(UserDataEnum.GENDER);
    const birthDateInput = target.elements.namedItem(UserDataEnum.BIRTH_DATE);
    const githubEmailInput = target.elements.namedItem(
      UserDataEnum.GITHUB_EMAIL
    );
    const usernameInput = target.elements.namedItem(UserDataEnum.USERNAME);
    const passwordInput = target.elements.namedItem(UserDataEnum.PASSWORD);

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!usernameTaken && !emailTaken && status1 && status2 && status3) {
      try {
        const createUserWithEmailResponse = await createNewUser(
          email,
          password
        );

        if (createUserWithEmailResponse.user) {
          const userData = {
            email: emailInput.value,
            first_name: firstNameInput.value,
            middle_name: middleNameInput.value,
            last_name: lastNameInput.value,
            nickname: nickNameInput.value,
            gender: genderInput.value,
            birth_date: birthDateInput.value,
            github_email: githubEmailInput.value,
            username: usernameInput.value,
          };

          handleClose();

          await saveUserToDB(createUserWithEmailResponse.user.uid, userData);

          await uploadImageToStorage(
            createUserWithEmailResponse.user.uid,
            imageToUpload
          );

          toast({
            title: 'Successfully Created Account',
            description: 'Your Account can now be used',
            status: 'success',
            position: 'top',
            duration: 3000,
          });

          return createUserWithEmailResponse;
        }
      } catch (e) {
        toast({
          title: 'Failed to Create Account',
          description: 'Error',
          status: 'error',
          position: 'top',
          duration: 3000,
        });
      }
    } else {
      toast({
        title: 'Please review the fields before you submit.',
        description: 'Error',
        status: 'error',
        position: 'top',
        duration: 3000,
      });
    }
  };

  const loadFile = (even) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setImageToUpload(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(undefined);
    setImageToUpload(undefined);
  };

  return (
    <Card py="1.25rem" px="0.5rem">
      <CardHeader>
        <Heading color="#003554" textAlign="center" size="md">
          Create an Account
        </Heading>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <CardBody className={styles.content}>
            <Stack spacing={2}>
              <Stack alignItems="center" spacing={2}>
                <Avatar
                  size="xl"
                  src={image}
                  bg="white"
                  icon={<FaUserCircle fontSize="5rem" color="#00649490" />}
                />
                <Stack>
                  <WrapItem marginTop={3}>
                    <label
                      htmlFor={UserDataEnum.PROFILE_PICTURE}
                      className={styles.uploadLabel}
                    >
                      <ArrowUpIcon /> Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name={UserDataEnum.PROFILE_PICTURE}
                      id={UserDataEnum.PROFILE_PICTURE}
                      onChange={loadFile}
                      style={{ display: 'none' }}
                    />
                  </WrapItem>
                  <ScaleFade initialScale={0.9} in={imageToUpload != undefined}>
                    <Tag
                      size={'md'}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="gray"
                    >
                      <TagLabel>{imageToUpload?.name}</TagLabel>
                      <TagCloseButton onClick={handleRemoveImage} />
                    </Tag>
                  </ScaleFade>
                </Stack>
              </Stack>
              <label htmlFor={UserDataEnum.EMAIL} className={styles.formLabel}>
                Email Address
              </label>
              <FormControl isInvalid={!status1 || emailTaken}>
                <Input
                  placeholder="Email Address"
                  id={UserDataEnum.EMAIL}
                  name={UserDataEnum.EMAIL}
                  onKeyUp={(e) => validateEmail(e, setStatus1)}
                  onChange={checkEmail}
                  required
                />
                <Collapse in={!status1 || emailTaken} unmountOnExit>
                  {!status1 ? (
                    <FormErrorMessage>
                      Enter Valid Email Address
                    </FormErrorMessage>
                  ) : (
                    <FormErrorMessage>Email is already used.</FormErrorMessage>
                  )}
                </Collapse>
              </FormControl>
              <HStack>
                <Stack>
                  <label
                    htmlFor={UserDataEnum.FIRST_NAME}
                    className={styles.formLabel}
                  >
                    First Name
                  </label>
                  <Input
                    placeholder="First Name"
                    id={UserDataEnum.FIRST_NAME}
                    name={UserDataEnum.FIRST_NAME}
                    required
                  />
                </Stack>
                <Stack>
                  <label
                    htmlFor={UserDataEnum.LAST_NAME}
                    className={styles.formLabel}
                  >
                    Last Name
                  </label>
                  <Input
                    placeholder="Last Name"
                    id={UserDataEnum.LAST_NAME}
                    name={UserDataEnum.LAST_NAME}
                    required
                  />
                </Stack>
              </HStack>
              <HStack>
                <Stack>
                  <label
                    htmlFor={UserDataEnum.MIDDLE_NAME}
                    className={styles.formLabel}
                  >
                    Middle Name
                  </label>
                  <Input
                    placeholder="Middle Name"
                    id={UserDataEnum.MIDDLE_NAME}
                    name={UserDataEnum.MIDDLE_NAME}
                    required
                  />
                </Stack>
                <Stack>
                  <label
                    htmlFor={UserDataEnum.NICKNAME}
                    className={styles.formLabel}
                  >
                    Nickname
                  </label>
                  <Input
                    placeholder="Nickname"
                    id={UserDataEnum.NICKNAME}
                    name={UserDataEnum.NICKNAME}
                    required
                  />
                </Stack>
              </HStack>
              <label htmlFor={UserDataEnum.GENDER} className={styles.formLabel}>
                Gender
              </label>
              <Select
                id={UserDataEnum.GENDER}
                name={UserDataEnum.GENDER}
                placeholder="Select option"
              >
                <option value={GenderEnum.MALE}>{GenderEnum.MALE}</option>
                <option value={GenderEnum.FEMALE}>{GenderEnum.FEMALE}</option>
                <option value={GenderEnum.NON_BINARY}>
                  {GenderEnum.NON_BINARY}
                </option>
                <option value={GenderEnum.PREFER_NOT_TO_SAY}>
                  {GenderEnum.PREFER_NOT_TO_SAY}
                </option>
              </Select>
              <label
                htmlFor={UserDataEnum.BIRTH_DATE}
                className={styles.formLabel}
              >
                Birth Date
              </label>
              <Input
                placeholder="Birth Date"
                id={UserDataEnum.BIRTH_DATE}
                name={UserDataEnum.BIRTH_DATE}
                required
                type="date"
              />
              <label
                htmlFor={UserDataEnum.GITHUB_EMAIL}
                className={styles.formLabel}
              >
                Github Email Address
              </label>
              <FormControl isInvalid={!status2}>
                <Input
                  placeholder="Github Email Address"
                  id={UserDataEnum.GITHUB_EMAIL}
                  name={UserDataEnum.GITHUB_EMAIL}
                  onKeyUp={(e) => validateEmail(e, setStatus2)}
                  required
                />
                <Collapse in={!status2} unmountOnExit>
                  <FormErrorMessage>Enter Valid Email Address</FormErrorMessage>
                </Collapse>
              </FormControl>
              <label
                htmlFor={UserDataEnum.USERNAME}
                className={styles.formLabel}
              >
                Github Username
              </label>
              <FormControl isInvalid={usernameTaken}>
                <Input
                  placeholder="Github Username"
                  id={UserDataEnum.USERNAME}
                  name={UserDataEnum.USERNAME}
                  onChange={checkUsername}
                  required
                />
                <Collapse in={usernameTaken} unmountOnExit>
                  <FormErrorMessage>
                    Username is already taken.
                  </FormErrorMessage>
                </Collapse>
              </FormControl>
              <label
                htmlFor={UserDataEnum.PASSWORD}
                className={styles.formLabel}
              >
                Password
              </label>
              <FormControl isInvalid={!status3}>
                <InputGroup size="md">
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    id={UserDataEnum.PASSWORD}
                    name={UserDataEnum.PASSWORD}
                    onKeyUp={(e) => validatePassword(e, setStatus3)}
                    required
                  />
                  <InputRightElement>{renderPasswordIcon}</InputRightElement>
                </InputGroup>
                <Collapse in={!status3} unmountOnExit>
                  <FormErrorMessage>
                    Password should contain at least 8 characters.
                  </FormErrorMessage>
                </Collapse>
              </FormControl>
            </Stack>
          </CardBody>
          <CardFooter pt="2rem">
            <Stack w="100%" alignItems="center">
              <Button
                background="#006494"
                color="#F6F6F6"
                colorScheme="blue"
                mr={3}
                type="submit"
              >
                Add Account
              </Button>
              <Button
                background="transparent"
                size="sm"
                textDecor="underline"
                color="#0582CA"
                onClick={handleClose}
              >
                Already have an account?
              </Button>
            </Stack>
          </CardFooter>
        </FormControl>
      </form>
    </Card>
  );
}

export default RegisterCard;
