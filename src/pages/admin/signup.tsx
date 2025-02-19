// import prisma from '../../lib/prisma';
// import bcrypt from 'bcrypt';

// export default async function handler(req, res) {
//   const { email, password, role } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: { email, password: hashedPassword, role },
//   });

//   res.json(user);
// }
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamically import bcrypt with ssr: false
const bcrypt = dynamic(() => import('bcrypt'), { ssr: false });

const Signup = () => {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');

  const handleSignup = async () => {
    if (bcrypt) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      setHashedPassword(hash);
    }
  };

  return (
    <div>
      <h1>Admin Signup</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={handleSignup}>Sign Up</button>
      {hashedPassword && <p>Hashed Password: {hashedPassword}</p>}
    </div>
  );
};

export default Signup;