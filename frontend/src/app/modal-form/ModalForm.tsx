import { useState } from "react";
import { Input, Flex, Box, Button} from "@chakra-ui/react"
import { postTasks } from "../api/api-manager.service";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface ModalFormProps {
  onSuccess: () => void;
}

const Form = ({ onSuccess }: ModalFormProps) => {
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState<string[]>(Array(days.length).fill(""));

  const handleTaskChange = (idx: number, value: string) => {
    const updated = [...tasks];
    updated[idx] = value;
    setTasks(updated);
  };

  const handleSubmit = async () => {
  try {
    const filteredTasks = tasks
      .map((task, i) => ({ day: days[i], title: task.trim() }))
      .filter((task) => task.title !== "");

    if (filteredTasks.length === 0) {
      alert("No tasks to submit!");
      return;
    }

    await postTasks(email, filteredTasks);
    alert("Tasks submitted!");
    
    setEmail("");
    setTasks(Array(days.length).fill(""));
    onSuccess();
  } catch (error) {
    console.error(error);
    alert("Failed to submit tasks");
  }
};

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box width={"80%"}>
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