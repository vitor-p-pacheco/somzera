import { useState } from 'react';
import  ReviewModal  from './components/ReviewModal.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="metro-button w-full py-2 text-sm rounded flex items-center justify-center gap-2 transform active:scale-95 font-extrabold tracking-widest shadow-lg mb-1">
        <i className="fas fa-plus-circle text-lg"></i> ESCREVER REVIEW </button>                                  
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> 
    </div>
  );
}