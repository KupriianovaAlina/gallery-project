import { FaTelegramPlane } from 'react-icons/fa';

const ShareButton = ({ text }) => {
  const shareInTelegram = () => {
    const pageUrl = encodeURIComponent(window.location.href);
    const telegramUrl = `https://t.me/share/url?url=${pageUrl}&text=${text}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <button
      onClick={shareInTelegram}
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
    >
      <FaTelegramPlane className="w-4 h-4 mr-2" />
    </button>
  );
};

export default ShareButton;
