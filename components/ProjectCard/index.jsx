'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Button, Card, CardBody, Heading, HStack, IconButton, Image, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

function ProjectCard() {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      p="5px"
      w="fit-content"
      h="265px"
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '350px' }}
        src='sample.png'
        alt='Sample Pic'
      />
      <HStack py="1.25rem">
        <Stack pl="1.25rem" gap={0}>
          <CardBody >
            <Stack gap="1.25rem">
              <HStack gap="1.25rem">
                <Stack gap="1.25rem" maxW="250px">
                  <Heading size='md'>See-Rex</Heading>
                  <Text>
                  This project was made in fulfillment to the requirements of Software Development 3 Course.
                  </Text>
                </Stack>
                <motion.div
                  {...getDisclosureProps()}
                  hidden={hidden}
                  initial={false}
                  onAnimationStart={() => setHidden(false)}
                  onAnimationComplete={() => setHidden(!isOpen)}
                  animate={{ 
                    width: isOpen ? "fit-content" : 0, 
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
                    <Text> Full-stack Developer </Text>
                    <Text> www.github.com </Text>
                    <Text> www.thiswebsite.com </Text>
                    <HStack>
                      <Image src="/user.png" alt="user icon"/>
                      <Image src="/user.png" alt="user icon"/>
                      <Image src="/user.png" alt="user icon"/>
                      <Image src="/user.png" alt="user icon"/>
                    </HStack>
                  </Stack>
                </motion.div>
              </HStack>
              <Button variant='solid' colorScheme='blue' w="100%">
                View Details
              </Button>
            </Stack>
          </CardBody>
        </Stack>
        <IconButton {...getButtonProps()} aria-label='Expand Card' icon={isOpen ? <ChevronLeftIcon/> : <ChevronRightIcon />} p={0} variant="ghost"/>
      </HStack>
    </Card>
  );
}

export default ProjectCard;