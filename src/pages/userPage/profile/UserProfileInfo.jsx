import { UserAvatar } from './UserAvatar';
import { InfoField } from './InfoField';
import { SkillsList } from './SkillsList';

export const UserProfileInfo = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <UserAvatar imgURL={user.imgURL} userName={user.userName} />
        <div>
          <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-600 dark:text-gray-300">{user.profession}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Username" value={user.userName} />
        <InfoField label="Email" value={user.email} />
        <InfoField label="Gender" value={user.gender} />
        <InfoField label="Date of Birth" value={user.dateOfBirth} />
        <InfoField label="Address" value={user.address} />
        <InfoField label="Mobile" value={user.mobile} />
        <InfoField label="Company" value={user.company} />
      </div>

      <div>
        <h4 className="text-md font-medium mb-2">Skills</h4>
        <SkillsList skills={user.skills} />
      </div>

      {user.autobiography && (
        <div>
          <h4 className="text-md font-medium mb-2">About</h4>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{user.autobiography}</p>
        </div>
      )}
    </div>
  );
};
