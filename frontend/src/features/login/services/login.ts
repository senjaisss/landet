const API_URL = import.meta.env.VITE_API_URL;

type LoginResponse = {
  token: string;
  user: {
    userId: string;
    name: string;
    familyId: string;
  };
};

export async function login(
  userId: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      password,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Login failed: ${error}`);
  }

  const data: LoginResponse = await res.json();

  return data;
}
