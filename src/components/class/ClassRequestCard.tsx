import React from 'react';

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
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-2 max-w-sm">
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
          {request.studentName.charAt(0)}
        </div>
        <div>
          <h3 className="font-medium text-lg">{request.studentName}</h3>
          <p className="text-gray-600 text-sm">{request.studentEmail}</p>
        </div>
      </div>

      <p className="text-sm mb-2">
        <strong>Class:</strong> {request.className}
      </p>
      
      <p className="text-sm text-gray-600 mb-4">
        <strong>Requested on:</strong> {new Date(request.requestDate).toLocaleDateString()}
      </p>

      <div className="mb-4">
        <span className={`${getStatusColor(request.status)} text-xs font-medium px-2.5 py-0.5 rounded`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      {request.status === 'pending' && (
        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-sm flex-1"
            onClick={() => onApprove?.(request.id)}
          >
            Approve
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 text-sm flex-1"
            onClick={() => onReject?.(request.id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassRequestCard; 