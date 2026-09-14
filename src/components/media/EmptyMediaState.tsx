interface EmptyMediaStateProps {
  title: string;
  message: string;
}

const EmptyMediaState = ({ title, message }: EmptyMediaStateProps) => {
  return (
    <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-sm border">
      <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
        <img
          src="/uploads/etmlogo.svg"
          alt="Eagle's Nest Logo"
          className="w-16 h-16 object-contain opacity-80"
        />
      </div>
      <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyMediaState;
