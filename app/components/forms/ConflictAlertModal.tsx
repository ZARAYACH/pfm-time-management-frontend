type ConflictAlertModalProps = {
    message: string;
    onClose: () => void;
  };
  
  const ConflictAlertModal = ({ message, onClose }: ConflictAlertModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold text-red-600 mb-4">Conflit détecté !</h3>
          <p className="mb-4">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  };
  
  export default ConflictAlertModal;