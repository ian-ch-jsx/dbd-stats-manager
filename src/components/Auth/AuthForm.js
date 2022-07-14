export default function AuthForm({ email, setEmail, password, setPassword, handleSubmit, error }) {
  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          aria-label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          id="password"
          type="password"
          aria-label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">submit</button>
      </form>
      <p> {error}</p>
    </>
  );
}
