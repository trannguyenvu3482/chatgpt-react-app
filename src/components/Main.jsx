import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Main = () => {
  const [question, setQuestion] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState('');
  const [tokenCount, setTokenCount] = React.useState(0);

  const handleAsk = async () => {
    try {
      setLoading(true);
      const reqBody = {
        model: 'text-davinci-003',
        prompt: `${question}`,
        temperature: 0.5,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['AI', 'Human'],
      };

      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_TOKEN}`,
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();

      console.log(data.choices[0].text.trim().replace(/\n{2,}\s*/g, '\n'));

      setAnswer(data.choices[0].text.trim().replace(/\n{2,}\s*/g, '\n'));
      setTokenCount(data.usage.total_tokens);

      setLoading(false);
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (question === undefined || question === '') {
      toast.error('Bạn chưa nhập câu hỏi');
      return;
    } else {
      handleAsk();
      toast.success('Đã gửi câu hỏi');
    }
  };

  const handleCopy = () => {
    // Save answer to clipboard
    navigator.clipboard.writeText(answer);
    toast.success('Đã copy đáp án');
  };

  return (
    <Container>
      <h1>Hỏi đáp ChatGPT</h1>
      <h4 style={{ marginTop: '10px' }}>
        Lưu ý: Nếu hỏi bằng tiếng Việt và câu trả lời dài thì sẽ tốn nhiều
        token, max token hiện tại đang là 300
      </h4>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: 4,
          width: '100%',
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          fullWidth
          error={question === undefined || question === ''}
          id="outlined-multiline-flexible"
          label="Câu hỏi của bạn"
          multiline
          maxRows={4}
          placeholder="Nhập vào câu hỏi của bạn"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Câu trả lời của ChatGPT"
          multiline
          rows={7}
          placeholder="Câu trả lời của ChatGPT sẽ hiện ở đây"
          value={loading ? 'Đang xử lý...' : answer}
          disabled={loading}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ height: 50 }}
          disabled={loading}
        >
          Gửi
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleCopy}
          sx={{ height: 50 }}
          disabled={loading}
        >
          Copy đáp án
        </Button>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Số token đã sử dụng"
          placeholder="Số token đã sử dụng"
          value={tokenCount}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: calc(100vh - 85px);
  margin-top: 20px;
`;

export default Main;
