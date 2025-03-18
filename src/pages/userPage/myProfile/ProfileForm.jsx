import { FormField } from './FormField';
import { ImagePreview } from './ImagePreview';

const ProfileForm = ({ editValues, setEditValues, handleSubmit, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        id="userName"
        label="Username"
        type="text"
        value={editValues.userName}
        onChange={e => setEditValues({ ...editValues, userName: e.target.value })}
        autoComplete="username"
        disabled
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        value={editValues.email}
        onChange={e => setEditValues({ ...editValues, email: e.target.value })}
        autoComplete="email"
      />

      <FormField
        id="password"
        label="Password (leave blank to keep current)"
        type="password"
        value={editValues.password}
        onChange={e => setEditValues({ ...editValues, password: e.target.value })}
        placeholder="New password"
        autoComplete="new-password"
      />

      <FormField
        id="firstName"
        label="First Name"
        type="text"
        value={editValues.firstName}
        onChange={e => setEditValues({ ...editValues, firstName: e.target.value })}
        autoComplete="given-name"
      />

      <FormField
        id="lastName"
        label="Last Name"
        type="text"
        value={editValues.lastName || ''}
        onChange={e => setEditValues({ ...editValues, lastName: e.target.value })}
        autoComplete="family-name"
      />

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
        <select
          id="gender"
          className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
          value={editValues.gender || ''}
          onChange={e => setEditValues({ ...editValues, gender: e.target.value })}
          autoComplete="sex"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <FormField
        id="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={editValues.dateOfBirth || ''}
        onChange={e => setEditValues({ ...editValues, dateOfBirth: e.target.value })}
        autoComplete="bday"
      />

      <FormField
        id="address"
        label="Address"
        type="text"
        value={editValues.address || ''}
        onChange={e => setEditValues({ ...editValues, address: e.target.value })}
        autoComplete="street-address"
      />

      <FormField
        id="mobile"
        label="Mobile"
        type="tel"
        value={editValues.mobile || ''}
        onChange={e => setEditValues({ ...editValues, mobile: e.target.value })}
        autoComplete="tel"
      />

      <FormField
        id="company"
        label="Company"
        type="text"
        value={editValues.company || ''}
        onChange={e => setEditValues({ ...editValues, company: e.target.value })}
        autoComplete="organization"
      />

      <FormField
        id="profession"
        label="Profession"
        type="text"
        value={editValues.profession || ''}
        onChange={e => setEditValues({ ...editValues, profession: e.target.value })}
        autoComplete="organization-title"
      />

      <FormField
        id="skills"
        label="Skills (comma-separated)"
        type="text"
        value={editValues.skills.join(', ')}
        onChange={e => setEditValues({
          ...editValues,
          skills: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
        })}
        autoComplete="off"
      />

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1" htmlFor="autobiography">About Me</label>
        <textarea
          id="autobiography"
          className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
          value={editValues.autobiography || ''}
          onChange={e => setEditValues({ ...editValues, autobiography: e.target.value })}
          rows={4}
          autoComplete="off"
        />
      </div>

      <FormField
        id="imgURL"
        label="Profile Image URL"
        type="text"
        value={editValues.imgURL || ''}
        onChange={e => setEditValues({ ...editValues, imgURL: e.target.value })}
        autoComplete="photo"
      />

      <ImagePreview imgURL={editValues.imgURL} />

      <div className="flex mt-4">
        <button
          type="submit"
          className='px-4 py-2 bg-green-500 text-white rounded mr-2'
        >
          Save Changes
        </button>
        <button
          type="button"
          className='px-4 py-2 bg-gray-500 text-white rounded'
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;