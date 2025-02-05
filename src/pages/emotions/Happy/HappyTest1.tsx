import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import useRecording from '@/components/hooks/useRecording'; // Import the custom hook

const HomeTest1 = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // State for timer and video control
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Use the custom hook
  const { webcamRef, startRecording, stopRecording } = useRecording();

  // Timer logic
  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Automatically stop after 2 minutes (120 seconds)
    if (timeElapsed >= 120) {
      handleStop();
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeElapsed]);

  // Start button handler
  const handleStart = () => {
    setIsPlaying(true);
    startRecording();
  };

  // Stop button handler
  const handleStop = () => {
    setIsPlaying(false);
    setTimeElapsed(0);
    stopRecording();
  };

  // Format time to display as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        backgroundColor: '#FFF8E7', // Light warm background
        gap: 4,
      }}
    >
      {/* YouTube Video Embed */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          height: '450px',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[10],
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ZwJfXgTO7J4" // Use the video ID here
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>

      {/* Hidden Webcam Component */}
      <div style={{ display: 'none' }}>
        <Webcam
          audio={true}
          ref={webcamRef}
          width="100%"
          height="100%"
          videoConstraints={{
            facingMode: 'user',
          }}
        />
      </div>

      {/* Timer Display */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
        {formatTime(timeElapsed)}
      </Typography>

      {/* Start/Stop Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={isPlaying ? handleStop : handleStart}
          sx={{
            backgroundColor: isPlaying ? '#FF6347' : '#32CD32', // Red for stop, green for start
            color: '#fff',
            height: '50px',
            width: '150px',
            fontWeight: 'bold',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: isPlaying ? '#FF4500' : '#228B22',
            },
          }}
        >
          {isPlaying ? 'Stop' : 'Start'}
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/tasks/happy/test1/evaluation')} // Navigate to evaluation page
          sx={{
            height: '50px',
            width: '150px',
            padding: '10px 20px',
            backgroundColor: '#32CD32',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#228B22',
            },
          }}
        >
          Evaluate
        </Button>
      </Box>
    </Box>
  );
};

export default HomeTest1;