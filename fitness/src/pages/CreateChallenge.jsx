import React from 'react';

const CreateChallenge = () => {
  return (
    <div>
      <h1>Create a Challenge</h1>
      <form>
        <input type="text" placeholder="Challenge Name" required />
        <textarea placeholder="Description" required></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateChallenge;
