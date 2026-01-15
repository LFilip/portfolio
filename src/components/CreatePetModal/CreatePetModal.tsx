import { useState } from 'react'

interface CreatePetModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { name: string; emoji: string }) => void
}

const EMOJI_OPTIONS = ['🐱', '🐶', '🐦', '🐰', '🐼', '🦊', '🐸', '🐢']

export const CreatePetModal = ({ isOpen, onClose, onConfirm }: CreatePetModalProps) => {
  const [name, setName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  if (!isOpen) return null

  const handleConfirm = () => {
    if (!name.trim() || !selectedEmoji) return

    onConfirm({
      name: name.trim(),
      emoji: selectedEmoji
    })

    // Reset for next time
    setName('')
    setSelectedEmoji(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full border-4 border-green-300 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Create Your Pet 🌿
        </h2>

        {/* Name Input */}
        <div className="mb-6">
          <label
            htmlFor="pet-name-modal"
            className="block text-lg font-semibold text-green-800 mb-2"
          >
            Pet Name
          </label>
          <input
            id="pet-name-modal"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a name..."
            maxLength={20}
            autoFocus
            className="w-full px-4 py-3 text-lg rounded-xl border-3 border-green-300 focus:border-green-500 focus:outline-none focus:ring-3 focus:ring-green-200 transition-all bg-green-50/50"
          />
          {name && (
            <p className="mt-1 text-sm text-green-600">
              {name.length}/20 characters
            </p>
          )}
        </div>

        {/* Emoji Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-green-800 mb-3">
            Choose Appearance
          </label>
          <div className="grid grid-cols-4 gap-3">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`
                  text-4xl p-3 rounded-xl border-3 transition-all duration-200
                  hover:scale-110 active:scale-95
                  ${
                    selectedEmoji === emoji
                      ? 'border-green-600 bg-green-100 ring-3 ring-green-300'
                      : 'border-green-200 bg-white hover:border-green-400'
                  }
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {name && selectedEmoji && (
          <div className="mb-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
            <p className="text-center text-green-700 text-sm mb-2">Preview:</p>
            <div className="text-center">
              <span className="text-5xl">{selectedEmoji}</span>
              <p className="text-xl font-bold text-green-800 mt-2">{name}</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 text-lg font-semibold rounded-xl border-3 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!name.trim() || !selectedEmoji}
            className={`
              flex-1 py-3 px-6 text-lg font-bold rounded-xl transition-all
              ${
                name.trim() && selectedEmoji
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Create Pet
          </button>
        </div>
      </div>
    </div>
  )
}
