import React from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  Avatar,
  Paper,
  Divider
} from '@mui/material';

interface ReviewItemProps {
  review: {
    id: string;
    studentName: string;
    studentAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    helpfulCount: number;
  };
  onHelpful?: (reviewId: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onHelpful }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Avatar
          src={review.studentAvatar}
          alt={review.studentName}
          sx={{ mr: 2 }}
        >
          {review.studentName.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" component="div">
              {review.studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(review.date).toLocaleDateString()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={review.rating}
              readOnly
              size="small"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {review.rating.toFixed(1)} / 5.0
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            {review.comment}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
              onClick={() => onHelpful?.(review.id)}
            >
              Helpful ({review.helpfulCount})
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Paper>
  );
};

export default ReviewItem; 