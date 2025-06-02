import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, House, MagnifyingGlass, Users, User } from 'lucide-react';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  
  const user = {
    name: 'Angie Pena',
    email: 'angie.p@example.com',
    avatar: '/IMG_2423_Facetune_11-11-2021-18-44-36.jpeg'
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f9fbfa] justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center bg-[#f9fbfa] p-4 pb-2 justify-between">
          <div className="text-[#101913] flex size-12 shrink-0 items-center">
            <ArrowLeft size={24} onClick={() => navigate(-1)} />
          </div>
          <h2 className="text-[#101913] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Profile
          </h2>
        </div>

        {/* Profile Section */}
        <div className="flex p-4 @container">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                style={{ backgroundImage: `url(${user.avatar})` }}
              />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[#101913] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                  {user.name}
                </p>
                <p className="text-[#5b8b6c] text-base font-normal leading-normal text-center">
                  Premium Member
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Information Section */}
        <h3 className="text-[#101913] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          My Information
        </h3>
        
        <div className="flex items-center gap-4 bg-[#f9fbfa] px-4 min-h-14 justify-between"
             onClick={() => navigate('/account/settings')}>
          <p className="text-[#101913] text-base font-normal leading-normal flex-1 truncate">
            Edit Profile
          </p>
          <div className="shrink-0">
            <ArrowLeft size={24} className="rotate-180" />
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#f9fbfa] px-4 min-h-14 justify-between"
             onClick={() => navigate('/account/nutrition')}>
          <p className="text-[#101913] text-base font-normal leading-normal flex-1 truncate">
            Dietary Goals
          </p>
          <div className="shrink-0">
            <ArrowLeft size={24} className="rotate-180" />
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#f9fbfa] px-4 min-h-14 justify-between">
          <p className="text-[#101913] text-base font-normal leading-normal flex-1 truncate">
            Track Progress
          </p>
          <div className="shrink-0">
            <ArrowLeft size={24} className="rotate-180" />
          </div>
        </div>

        {/* Favorites Section */}
        <h3 className="text-[#101913] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Favorites
        </h3>

        <div className="flex items-center gap-4 bg-[#f9fbfa] px-4 min-h-14 justify-between">
          <p className="text-[#101913] text-base font-normal leading-normal flex-1 truncate">
            Saved Meals
          </p>
          <div className="shrink-0">
            <ArrowLeft size={24} className="rotate-180" />
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#f9fbfa] px-4 min-h-14 justify-between">
          <p className="text-[#101913] text-base font-normal leading-normal flex-1 truncate">
            Saved Restaurants
          </p>
          <div className="shrink-0">
            <ArrowLeft size={24} className="rotate-180" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="flex gap-2 border-t border-[#e9f1ec] bg-[#f9fbfa] px-4 pb-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#5b8b6c]"
          >
            <House className="h-8" />
            <p className="text-[#5b8b6c] text-xs font-medium leading-normal tracking-[0.015em]">
              Home
            </p>
          </button>
          <button
            onClick={() => navigate('/browse')}
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#5b8b6c]"
          >
            <MagnifyingGlass className="h-8" />
            <p className="text-[#5b8b6c] text-xs font-medium leading-normal tracking-[0.015em]">
              Explore
            </p>
          </button>
          <button
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#5b8b6c]"
          >
            <Users className="h-8" />
            <p className="text-[#5b8b6c] text-xs font-medium leading-normal tracking-[0.015em]">
              Community
            </p>
          </button>
          <button
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#101913]"
          >
            <User className="h-8 fill-current" />
            <p className="text-[#101913] text-xs font-medium leading-normal tracking-[0.015em]">
              Profile
            </p>
          </button>
        </div>
        <div className="h-5 bg-[#f9fbfa]"></div>
      </div>
    </div>
  );
};

export default AccountPage;