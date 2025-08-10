import { useState } from "react";
import { Input, Flex, Box, Button} from "@chakra-ui/react"
import { postTasks } from "../api/api-manager.service";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Form = () => {
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState<string[]>(Array(days.length).fill(""));

  const handleTaskChange = (idx: number, value: string) => {
    const updated = [...tasks];
    updated[idx] = value;
    setTasks(updated);
  };

  const handleSubmit = async () => {
    try {
      const filteredTasks = tasks.filter((task) => task.trim());
      if (filteredTasks.length === 0) {
        alert("No tasks to submit!");
        return;
      }

      await postTasks(filteredTasks);
      alert("Tasks submitted!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit tasks");
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box width={"50%"}>
        <Input 
          placeholder="Enter your email" 
          mb={4} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {days.map((text, idx) => (
          <Input
            key={idx} 
            placeholder={`Enter your tasks for ${text}` }
            mb={2} value={tasks[idx]}
            onChange={(e) => handleTaskChange(idx, e.target.value)}
          />
        ))}
        <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Flex>
  )
}

export default Form;