const Login: React.FC<{ requestLogin: (username: string) => {} }> = ({
  requestLogin,
}) => {
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestLogin(e.currentTarget.message.value);
  };

  return (
    <div>
      <h2 className="text-bold">Add username</h2>
      <form onSubmit={onFormSubmit}>
        <input
          name="message"
          type="text"
          className="border p-2"
          placeholder="Your username"
        />
        <button className="border p-2">Set</button>
      </form>
    </div>
  );
};

export default Login;
