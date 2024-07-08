'use client'
import styles from "./index.module.scss";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Button, Card, CardBody, Heading, HStack, IconButton, Image, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

function ProjectCard() {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);

  return (
    <Card variant="outline" className={styles.card}>
      <Image
        objectFit='cover'
        src='sample.png'
        alt='Sample Pic'
        className={styles.image}
      />
      <Stack className={styles.wrapper}>
        <Stack className={styles.innerWrap}>
          <CardBody >
            <Stack gap="1.25rem" alignItems="center">
              <Stack className={styles.details}>
                <Stack gap="1.25rem" maxW="250px">
                  <Heading size='md' className={styles.texts}>See-Rex</Heading>
                  <Text className={styles.texts}>
                    This project was made in fulfillment to the requirements of Software Development 3 Course.
                  </Text>
                </Stack>
                <motion.div
                  {...getDisclosureProps()}
                  hidden={hidden}
                  initial={false}
                  onAnimationStart={() => setHidden(false)}
                  onAnimationComplete={() => setHidden(!isOpen)}
                  animate={ {
                    width: isOpen ? "fit-content" : 0,
                    height: isOpen ? "fit-content" : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{
                    ease: "linear",
                    duration: 0.3,
                  }}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Stack gap="0.5rem">
                    <Text className={styles.texts}> Full-stack Developer </Text>
                    <Text className={styles.texts}> www.github.com </Text>
                    <Text className={styles.texts}> www.thiswebsite.com </Text>
                    <HStack>
                      <Image src="/user.png" alt="user icon"/>
                      <Image src="/user.png" alt="user icon"/>
                      <Image src="/user.png" alt="user icon"/>
                      <Image src="/user.png" alt="user icon"/>
                    </HStack>
                  </Stack>
                </motion.div>
              </Stack>
              <Button variant='solid' colorScheme='blue' w="100%">
                View Details
              </Button>
              <IconButton
                {...getButtonProps()}
                aria-label='Expand Card'
                icon={isOpen ? <ChevronUpIcon/> : <ChevronDownIcon />}
                className={styles.iconY}
                variant="ghost"
              />
            </Stack>
          </CardBody>
        </Stack>
        <IconButton
          {...getButtonProps()}
          aria-label='Expand Card'
          icon={isOpen ? <ChevronLeftIcon/> : <ChevronRightIcon />}
          className={styles.iconX}
          variant="ghost"
        />
      </Stack>
    </Card>
  );
}

export default ProjectCard;