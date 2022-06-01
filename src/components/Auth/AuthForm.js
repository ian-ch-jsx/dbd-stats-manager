export default function AuthForm({ email, setEmail, password, setPassword, handleSubmit }) {
  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          aria-label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          aria-label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
