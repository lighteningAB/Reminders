import { Card, CardBody, CardHeader, CardFooter, Heading, Text } from "@chakra-ui/react";

interface Task {
  id: number;
  title: string;
  day: string;
}

interface DayBlockProps {
  day: string;
  width: string;
  tasks: Task[];
}

const DayBlock = ({ day, width, tasks }: DayBlockProps) => {
  return (
    <Card width={width}>
      <CardHeader>
        <Heading size="xs" mt="2">{day}</Heading>
      </CardHeader>
      <CardBody>
        {tasks.length === 0 ? (
          <Text>No tasks</Text>
        ) : (
          tasks.map(task => {
            const parts = task.title.split(": ");
            const displayTitle = parts.length > 1 ? parts.slice(1).join(": ") : task.title;
            return <Text key={task.id}>• {displayTitle}</Text>;
          })
        )}
      </CardBody>
      <CardFooter justifyContent="flex-end" />
    </Card>
  );
};

export default DayBlock;