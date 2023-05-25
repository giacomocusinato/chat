const Login: React.FC<{ requestLogin: (username: string) => {} }> = ({
  requestLogin,
}) => {
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestLogin(e.currentTarget.message.value);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="font-bold uppercase">Log-in</h2>
      <form
        className="flex w-full flex-col items-center gap-10"
        onSubmit={onFormSubmit}
      >
        <input
          name="message"
          type="text"
          className="w-full max-w-[350px] border-[3px] border-black p-2 font-mono"
          placeholder="Your username"
        />
        <button className="rounded-md bg-blue-600 px-6 py-2 font-semibold uppercase text-white">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
