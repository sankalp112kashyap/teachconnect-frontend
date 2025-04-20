import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Avatar,
  Chip
} from '@mui/material';

interface ClassRequestCardProps {
  request: {
    id: string;
    studentName: string;
    studentEmail: string;
    className: string;
    requestDate: string;
    status: 'pending' | 'approved' | 'rejected';
  };
  onApprove?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
}

const ClassRequestCard: React.FC<ClassRequestCardProps> = ({
  request,
  onApprove,
  onReject
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>
            {request.studentName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {request.studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {request.studentEmail}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" gutterBottom>
          <strong>Class:</strong> {request.className}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Requested on:</strong> {new Date(request.requestDate).toLocaleDateString()}
        </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Chip
            label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            color={getStatusColor(request.status)}
            size="small"
          />
        </Box>

        {request.status === 'pending' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => onApprove?.(request.id)}
              fullWidth
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onReject?.(request.id)}
              fullWidth
            >
              Reject
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassRequestCard; 