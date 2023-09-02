import TextField from "@mui/material/TextField";

export default function TextInput({ question, handleQuestionChange }) {
  return (
    <TextField
      id="outlined-basic"
      label="Enter your question"
      variant="outlined"
      onChange={(event) => handleQuestionChange(event, index)}
      value={question.question}
      className="text-input"
    />
  );
}
