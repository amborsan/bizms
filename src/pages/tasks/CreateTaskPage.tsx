import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreateTaskForm from "../../components/atoms/forms/CreateTaskForm";
function CreateTaskPage() {
  const { data } = useMutation({
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/tasks");
      return data;
    },
  });
  return (
    <>
      <h2>Add a new Task</h2>
      <CreateTaskForm />
    </>
  );
}

export default CreateTaskPage;
