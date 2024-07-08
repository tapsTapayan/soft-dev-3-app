import { Text } from '@chakra-ui/react';
import styles from "./index.module.scss";

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <Text>Software Development Labs © 2024</Text>
      <Text>Created by Engr. Nash Uriel A. Tapayan with ♥</Text>
    </div>
  );
}
