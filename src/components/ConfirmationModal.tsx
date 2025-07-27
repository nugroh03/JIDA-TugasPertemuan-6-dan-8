'use client';

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
}

// const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   confirmText = 'Hapus',
//   cancelText = 'Batal',
//   isConfirming = false,
// }) => {

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Hapus',
  cancelText = 'Batal',
  isConfirming = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/80 z-50 flex justify-center items-center transition-opacity duration-300'
      onClick={onClose}
      aria-modal='true'
      role='dialog'
    >
      <div
        className='bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 scale-95'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-start'>
          <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
            <AlertTriangle
              className='h-6 w-6 text-red-600'
              aria-hidden='true'
            />
          </div>
          <div className='ml-4 text-left flex-1'>
            <h3
              className='text-lg leading-6 font-medium text-gray-900'
              id='modal-title'
            >
              {title}
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{message}</p>
            </div>
          </div>
        </div>
        <div className='mt-6 sm:flex sm:flex-row-reverse'>
          <button
            type='button'
            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50'
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              confirmText
            )}
          </button>
          <button
            type='button'
            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50'
            onClick={onClose}
            disabled={isConfirming}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
