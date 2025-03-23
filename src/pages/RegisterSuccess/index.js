import * as React from 'react'; 
import { Link } from 'react-router-dom';
import { LayoutOne, Card, Text, Button } from 'upkit';

export default function RegisterSuccess() {
  return (
    <LayoutOne size="small">
      <Card color="white">
        <Text as="h3">
          Pendaftaran Berhasil
        </Text>
        <Text> 
          Silahkan masuk ke aplikasi
        </Text>

        <br /> 

        <Button 
          fitContainer 
          as={Link} // Menjadikan Button sebagai Link
          to="/login"
        >
          Masuk 
        </Button>

      </Card>
    </LayoutOne>
  );
}
