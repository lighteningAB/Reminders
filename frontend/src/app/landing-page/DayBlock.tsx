import { Card, CardBody, CardHeader, CardFooter, Heading, Text } from "@chakra-ui/react";

interface DayBlockProps {
  day: string;
  width: string;
}

const DayBlock = ({ day, width }: DayBlockProps ) => {
    return(
        <Card width = {width}>
          <CardHeader>
            <Heading size="xs" mt="2">{day}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              
            </Text>
          </CardBody>
          <CardFooter justifyContent="flex-end">
          </CardFooter>
      </Card>
    )
}

export default DayBlock;