import { useState, useRef, useEffect } from 'react';

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-600 hover:text-indigo-600 focus:outline-none"
        aria-label="Notifications"
      >
        <span className="text-xl">🔔</span>
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">4</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2">
            <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer">
              <img className="h-8 w-8 rounded-full object-cover mr-3" src="https://i.pravatar.cc/40?img=3" alt="Avatar" />
              <div className="text-sm text-gray-700">
                <p><span className="font-semibold">Rina Oktavia</span> commented on your lost item <span className="text-indigo-600">Black Wallet</span></p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer">
              <img className="h-8 w-8 rounded-full object-cover mr-3" src="https://i.pravatar.cc/40?img=5" alt="Avatar" />
              <div className="text-sm text-gray-700">
                <p><span className="font-semibold">Admin</span> marked your claim for <span className="text-indigo-600">Green Tumbler</span> as <span className="font-semibold text-green-600">completed</span>.</p>
                <p className="text-xs text-gray-500">30 minutes ago</p>
              </div>
            </div>
            <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer">
              <img className="h-8 w-8 rounded-full object-cover mr-3" src="https://i.pravatar.cc/40?img=6" alt="Avatar" />
              <div className="text-sm text-gray-700">
                <p><span className="font-semibold">Faisal</span> reported a found item: <span className="text-indigo-600">Blue Backpack</span></p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer">
              <img className="h-8 w-8 rounded-full object-cover mr-3" src="https://i.pravatar.cc/40?img=7" alt="Avatar" />
              <div className="text-sm text-gray-700">
                <p><span className="font-semibold">Admin</span> rejected your claim for <span className="text-indigo-600">Red Umbrella</span>.</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="text-center py-2 border-t">
              <a href="/notifications" className="text-indigo-600 text-sm hover:underline">
                View All
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
