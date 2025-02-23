import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from '../lib/cookie';
import { createSession, deleteSession } from '@/app/lib/session'
import { redirect } from 'next/dist/server/api-utils';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const { dispatch } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const response = await fetch("/api/agents/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();

  if (response.ok) {
    document.cookie = `token=${data.token}; Path=/;`;
    dispatch({ type: "LOGIN", payload: { name: data.name, email: data.email } });
    await createSession(data.id)
    router.push("/");

    // Auto-logout after 24 hours
    setTimeout(() => {
      deleteSession();
      deleteCookie("token");
      alert("Session expired. Please log in again.");
      window.location.reload(); // Redirect to login
    }, 24 * 60 * 60 * 1000); // 24 hours in ms
  } else {
    alert(data.message);
  }
}
export async function logout() {
  const router = useRouter();
  deleteSession()
  router.push('/login')
}